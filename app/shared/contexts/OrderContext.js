import React, {createContext, useContext, useState, useEffect} from 'react';
import {FirebaseContext} from './FirebaseContext';
import {AuthContext} from './AuthContext';
import {StoreMenuContext} from './StoreMenuContext';

import _ from 'lodash';
import moment from 'moment-timezone';
import {collectIdsAndDocs} from '../../utils/utils/utils';

export const OrderContext = createContext();
var isLate = false;
export const getOrderedAtDifference = order => {
  let {branch_log} = order,
    dateNow = moment(),
    duration;

  let ordered_at = branch_log[branch_log.length - 1].dt_created;

  duration = moment.duration(dateNow.diff(ordered_at));
  var minutes = duration.asMinutes();
  minutes = Math.floor(minutes);
  if (!isLate && minutes == 5) {
    isLate = true;
    fireLateOrderNotification(order);
  }
  return minutes;
};

const orderContainStore = (store_id, order) => {
  let result = false;
  order.keyStoreId.map(item => {
    if (String(item) == store_id) {
      result = true;
    }
  });
  return result;
};

const fireLateOrderNotification = order => {
  database()
    .ref('user')
    .orderByChild('store_id')
    .once('value', snapshot => {
      const userObject = (snapshot && snapshot.val()) || {};

      let userArray =
        (userObject &&
          Object.entries(userObject) &&
          Object.entries(userObject).length &&
          Object.entries(userObject).map(item => {
            item[1].key = item[0];
            return item[1];
          })) ||
        [];

      userArray.map(item => {
        if (orderContainStore(item.store_id, order)) {
          const expoToken = item.expoToken;
          if (expoToken) {
            const message = {
              to: expoToken,
              sound: 'default',
              title: 'An Order is 5 minutes late!',
              body: 'Tap here to see order details',
            };

            fetch('https://exp.host/--/api/v2/push/send', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(message),
            });
          }
        }
      });
    });
};

const OrderProvider = ({children}) => {
  const {
    userInfoStore,
    userInfoRole,
    userBranch,
    store_id,
    fetchBranchDetails,
    loggedUser,
  } = useContext(AuthContext);
  const {store} = useContext(StoreMenuContext);
  const {database} = useContext(FirebaseContext);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [riderGroups, setRiderGroups] = useState([]);

  const confirmPayment = order => {
    return new Promise((resolve, reject) => {
      database()
        .ref(`orders/${order.key}`)
        .update({payment_status: 'Payment Confirmed'})
        .then(() => {
          resolve('Success!');
        })
        .catch(error => {
          reject(error);
          console.log(error);
        });
    });
  };

  const editBranchKey = (keys, branchKey) => {
    const storeID =
      userInfoRole == 'branch_admin' ? String(store_id) : String(userInfoStore);
    let isPresent = false;
    const editLogs = keys.map(item => {
      if (item.store_id === storeID) {
        item.branch_key = String(branchKey);
        isPresent = true;
      }
      return item;
    });

    if (!isPresent) {
      editLogs.push({branch_key: String(branchKey), store_id: storeID});
    }

    return editLogs;
  };

  const linkOrder = (order, branchKey) => {
    const storeID =
      userInfoRole == 'branch_admin' ? String(store_id) : String(userInfoStore);
    return new Promise((resolve, reject) => {
      if (branchKey) {
        order.branch_key = editBranchKey(order.branch_key, branchKey);

        if (order.branch_log == null) {
          order.branch_log = [];
        }

        order.branch_log.push({
          action: 1,
          branch_key: String(branchKey),
          dt_created: moment().tz('Asia/Manila').format('MMM DD, YYYY h:mm a'),
          store_id: storeID,
        });

        let updates = {};
        updates['orders/' + order.key] = order;

        database()
          .ref()
          .update(updates)
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  };

  const unlinkOrder = (order, branchKey) => {
    const storeID =
      userInfoRole == 'branch_admin' ? String(store_id) : String(userInfoStore);
    return new Promise((resolve, reject) => {
      order.branch_log.push({
        action: 2,
        branch_key: String(branchKey),
        dt_created: moment().tz('Asia/Manila').format('MMM DD, YYYY h:mm a'),
        store_id: storeID,
      });

      order.branch_key = order.branch_key.filter(
        item => item.branch_key != branchKey,
      );

      let updates = {};
      updates['orders/' + order.key] = order;
      database()
        .ref()
        .update(updates)
        .then(res => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const fetchRiderGroups = () => {
    database()
      .ref('loan')
      .on('value', snapshot => {
        if (snapshot && snapshot.val()) {
          setRiderGroups(collectIdsAndDocs(snapshot.val()));
        }
      });
  };

  const getPercentage = data => {
    let max = data.total_riders * 2;
    let filled = data.total_orders / max;
    let filledInPercent = filled * 100;
    return 100 - filledInPercent.toFixed(2);
  };

  const getRiderAffiliation = () => {
    let omni = riderGroups.filter(rider => rider.id === 'Omni')[0];
    let others = riderGroups.filter(rider => rider.id !== 'Omni');

    if (omni.total_riders * 2 > omni.total_orders) {
      return {affiliation: 'Omni', data: omni};
    } else {
      const percentage = others
        .map(other => {
          return {...other, percentage: getPercentage(other)};
        })
        .filter(item => item.percentage !== 0)
        .sort((a, b) => b.percentage - a.percentage);
      return {affiliation: percentage[0]?.id, data: percentage[0]};
    }
  };

  const markReadyForDeliveryFreelance = product => {
    const stats = product.status.map(item => item.set_rider);
    let {affiliation, data} = getRiderAffiliation();
    const storeID =
      userInfoRole == 'branch_admin' ? String(store_id) : String(userInfoStore);

    let status = JSON.parse(JSON.stringify(product));

    status = status.status.map(item => {
      if (item.store_id == storeID) {
        if (item.riderId) {
          item.status = 'reserved';
        } else {
          item.status = 'ready';
        }
      }

      item.set_rider = 'bayani';
      item.ready_date = moment().format('MMM DD, YYYY h:mm a');
      item.rider_affiliation = affiliation;
      return item;
    });

    database()
      .ref(`orders/${product.key}`)
      .update({status})
      .then(() => {
        console.log('stats is: ', stats);
        if (stats.includes('bayani')) {
        } else {
          database()
            .ref(`loan/${affiliation}`)
            .update({total_orders: data.total_orders + 1});
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const moveBackToRiderQueue = product => {
    const storeID =
      userInfoRole == 'branch_admin' ? String(store_id) : String(userInfoStore);

    let status;

    status = product.status.map(item => {
      if (item.store_id == storeID) {
        delete item.qrString;
        delete item.riderId;
        delete item.riderLate;
        delete item.riderName;
        item.status = 'ready';
      }
      return item;
    });

    database()
      .ref(`orders/${product.key}`)
      .update({status})
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
  };

  const moveToOnTransit = (product, decryptedData) => {
    return new Promise((resolve, reject) => {
      let qrMatch = false;
      const storeID =
        userInfoRole == 'branch_admin'
          ? String(store_id)
          : String(userInfoStore);

      let status;

      status = product.status.map(item => {
        if (item.store_id == storeID) {
          if (item?.qrString === String(decryptedData)) {
            item.status = 'on_transit';
            item.onTransit_date = moment().format('MMM DD, YYYY h:mm a');
            qrMatch = true;
          }
        }
        return item;
      });

      if (qrMatch) {
        database()
          .ref(`orders/${product.key}`)
          .update({status})
          .then(() => {
            resolve(qrMatch);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      } else {
        resolve(qrMatch);
      }
    });
  };

  const markReadyForDeliveryStore = (product, rider) => {
    const storeID =
      userInfoRole == 'branch_admin' ? String(store_id) : String(userInfoStore);

    let status;

    status = product.status.map(item => {
      if (item.store_id == storeID) {
        item.status = 'on_transit';
        item.set_rider = 'store';
        item.riderId = rider.key;
        item.riderName = rider.name;
        item.transit_date = moment().format('MMM DD, YYYY h:mm a');
      }
      return item;
    });

    database()
      .ref(`orders/${product.key}`)
      .update({status})
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
  };

  const moveToPreparing = product => {
    const storeID =
      userInfoRole == 'branch_admin' ? String(store_id) : String(userInfoStore);
    return new Promise((resolve, reject) => {
      product.is_preparing = product.is_preparing.map(item => {
        if (item.store_id == storeID) {
          item.status = false;
        }
        return item;
      });
      let updates = {};
      updates['orders/' + product.key] = product;
      database()
        .ref()
        .update(updates)
        .then(res => {
          resolve();
        })
        .catch(error => {
          message.error(error);
          reject(error);
        });
    });
  };

  const moveToCancel = (product, reportReason) => {
    const storeID =
      userInfoRole == 'branch_admin' ? String(store_id) : String(userInfoStore);
    let updates = {};
    const key = product.key;

    let reasonToCancel = [];

    if (product.reason_tocancel) {
      reasonToCancel = product.reason_tocancel;
      reasonToCancel.push({store_id: storeID, data: reportReason});
    } else {
      reasonToCancel.push({store_id: storeID, data: reportReason});
      product.reason_tocancel = reasonToCancel;
    }
    product.status = product.status.map(item => {
      if (item.store_id == storeID) {
        item.status = 'tocancel';
      }
      return item;
    });
    product.is_preparing = product.is_preparing.map(item => {
      if (item.store_id == storeID) {
        item.status = false;
      }
      return item;
    });
    updates['orders/' + key] = product;
    database().ref().update(updates);
  };

  const handleLoanRequest = (data, storeId, request) => {
    console.log(data.id);
    console.log(storeId);

    console.log(request);
    let riderId = null;
    let loanAmount = 0;
    const newStatus = data.status.map(item => {
      if (item.store_id == storeId) {
        item.loanRequest = false;
        item.loanStatus = request;
        riderId = item.riderId;
        loanAmount = item.loanAmount;
      }
      return item;
    });

    const order = {
      ...data,
      status: newStatus,
    };

    return new Promise((resolve, reject) => {
      database()
        .ref('orders')
        .child(data.id)
        .update(order)
        .then(result => {
          if (request == 'accept') {
            handleRiderLoanUpdate(riderId, loanAmount, data)
              .then(() => resolve('success'))
              .catch(err => reject(err));
          } else {
            resolve('success');
          }
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
    });
  };

  const handleRiderLoanUpdate = (riderId, loanAmount, order) => {
    return new Promise((resolve, reject) => {
      database()
        .ref('riders')
        .orderByKey()
        .equalTo(String(riderId))
        .once('value')
        .then(async snapshot => {
          let riderObject = await snapshot.val();
          const riderInfo =
            (riderObject &&
              Object.entries(riderObject) &&
              Object.entries(riderObject).length &&
              Object.entries(riderObject).map(item => {
                item[1].key = item[0];
                return item[1];
              })) ||
            [];

          const newLoanPoints =
            parseInt(riderInfo[0]?.loan_points) - parseInt(loanAmount);
          riderInfo[0].loan_points = newLoanPoints;
          console.log('rider info: ', riderInfo[0]);
          updateRiderLoanPoints(riderInfo[0])
            .then(() =>
              recordPointsTransaction(riderInfo[0], order, loanAmount)
                .then(() => resolve())
                .catch(err => reject(err)),
            )
            .catch(err => reject(err));
        })
        .catch(error => reject(error));
    });
  };

  const updateRiderLoanPoints = data => {
    let riderInfo = {};
    riderInfo[`riders/${data.key}`] = data;
    return new Promise((resolve, reject) => {
      database()
        .ref()
        .update(riderInfo)
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const recordPointsTransaction = (riderData, orderData, loanAmount) => {
    console.log('store is: ', store.name);
    const storeID =
      userInfoRole == 'branch_admin' ? String(store_id) : String(userInfoStore);
    let transactionInfo = {};
    let transactionData = {
      affiliation: riderData.affiliation,
      branchId:
        userInfoRole == 'branch_admin'
          ? String(userBranch)
          : String(userInfoStore),
      branchName: loggedUser?.displayName,
      loan_amount: loanAmount,
      order_trackingCode: orderData.tracking_code,
      riderId: riderData.id,
      riderName: riderData.name,
      shopId: storeID,
      shopName: store?.name,
      timestamp: new Date(),
    };

    return new Promise((resolve, reject) => {
      var recordKey = database().ref().child('loan_records').push().key;
      transactionInfo[`loan_records/${recordKey}`] = transactionData;
      database()
        .ref()
        .update(transactionInfo)
        .then(() => {
          resolve('success');
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const fetchFilteredOrders = filter => {
    // filter == "cancelled";
    const filtered =
      (pastOrders &&
        pastOrders.length &&
        pastOrders.filter(order => {
          if (filter == 'cancelled') {
            return (
              getStatus('status', order) == 'cancelled' ||
              getStatus('status', order) == 'tocancel'
            );
          } else if (filter == 'ready') {
            return (
              getStatus('status', order) == 'reserved' ||
              getStatus('status', order) == 'ready'
            );
          }

          return getStatus('status', order) == filter;
        })) ||
      [];

    return filtered;
  };

  const fetchPastOrders = orders => {
    const filtered =
      (orders &&
        orders.length &&
        orders.filter(order => {
          return (
            getStatus('is_preparing', order) === false &&
            getStatus('status', order) !== 'processing'
          );
        })) ||
      [];

    setPastOrders(filtered);
  };

  const fetchNewOrders = (orders, storeID) => {
    console.log('function called! ', storeID);

    const filtered =
      (orders &&
        orders.length &&
        orders.filter(order => getStatus('is_preparing', order))) ||
      [];
    setNewOrders(filtered);
  };

  const fetchPendingOrders = orders => {
    const filtered =
      (orders &&
        orders.length &&
        orders.filter(order => {
          return (
            getStatus('is_preparing', order) === false &&
            getStatus('status', order) == 'processing'
          );
        })) ||
      [];

    setPendingOrders(filtered);
  };

  const getStatus = (type, order) => {
    const storeID =
      userInfoRole == 'branch_admin' ? String(store_id) : String(userInfoStore);

    if (type == 'is_preparing') {
      const status = order.is_preparing.filter(
        item => item.store_id == storeID,
      );
      return status[0].status;
    } else {
      const status = order.status.filter(item => item.store_id == storeID);

      return status[0].status;
    }
  };

  const fetchOrders = async () => {
    const storeID =
      userInfoRole == 'branch_admin' ? String(store_id) : String(userInfoStore);

    database()
      .ref('orders')
      .orderByChild('keyStoreId')
      .on('value', snapshot => {
        const ordersObject = (snapshot && snapshot.val()) || {};

        let ordersArray =
          (ordersObject &&
            Object.entries(ordersObject) &&
            Object.entries(ordersObject).length &&
            Object.entries(ordersObject).map(item => {
              item[1].key = item[0];
              return item[1];
            })) ||
          [];

        ordersArray = ordersArray.filter(item =>
          item.keyStoreId.includes(String(storeID)),
        );

        if (userInfoRole == 'branch_admin') {
          ordersArray = ordersArray.filter(item => {
            const branch_logs = item.branch_log.filter(
              order => order.store_id == storeID,
            );
            const branchKey = String(
              branch_logs[branch_logs.length - 1].branch_key,
            );

            const userKey = String(userBranch);
            const action = String(branch_logs[branch_logs.length - 1].action);

            return (
              (branchKey != userKey && action == '2') ||
              (branchKey == userKey && action == '1')
            );
          });
        }

        // ordersArray = _.sortBy(ordersArray, ["ordered_at"], ["asc"]);
        fetchNewOrders(ordersArray, storeID);
        fetchPendingOrders(ordersArray);
        fetchPastOrders(ordersArray);
      });
  };

  useEffect(() => {
    fetchRiderGroups();
  }, []);

  useEffect(() => {
    if (String(userInfoRole) == 'branch_admin') fetchBranchDetails();
  }, [store_id]);

  useEffect(() => {
    if (store_id != null || userInfoStore != null) fetchOrders();
  }, [store_id, userInfoStore]);

  const payload = {
    newOrders,
    pendingOrders,
    pastOrders,

    setNewOrders,
    setPastOrders,

    confirmPayment,

    moveToPreparing,
    markReadyForDeliveryFreelance,
    markReadyForDeliveryStore,
    moveBackToRiderQueue,
    moveToCancel,
    moveToOnTransit,

    linkOrder,
    unlinkOrder,

    fetchFilteredOrders,
    handleLoanRequest,
  };

  return (
    <OrderContext.Provider value={payload}>{children}</OrderContext.Provider>
  );
};

export default React.memo(OrderProvider);
