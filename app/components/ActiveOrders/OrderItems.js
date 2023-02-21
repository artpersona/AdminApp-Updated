import React, {useState, useContext, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Picker,
  Modal,
} from 'react-native';
import {Colors} from '../../config';
import Entypo from 'react-native-vector-icons/Entypo';

import Icon2 from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  OrderContext,
  getOrderedAtDifference,
} from '../../shared/contexts/OrderContext';
import {AuthContext} from '../../shared/contexts/AuthContext';
import {BranchContext} from '../../shared/contexts/BranchContext';
import LogItem from './LogItem';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {
  getStoreOrderItems,
  fetchOrderTotal,
  fetchTotalShipping,
  fetchTotalShippingStore,
  checkBranch,
  convertMinutesToHours,
} from '../../utils/order.utility';

function OrderItems({order}) {
  const {moveToPreparing, moveToCancel, linkOrder, unlinkOrder} =
    useContext(OrderContext);
  const {userInfoRole, userBranch, userInfoStore, store_id} =
    useContext(AuthContext);
  const {storeBranches, fetchBranches} = useContext(BranchContext);
  const navigation = useNavigation();
  const showDetails = () => {
    navigation.navigate('OrderDetails', {
      order: order.item,
      confirmation: true,
    });
  };

  const storeID =
    userInfoRole == 'branch_admin' ? String(store_id) : String(userInfoStore);

  const [isVisible, setVisible] = useState(false);
  const [isVisible2, setVisible2] = useState(false);
  const [logsVisible, setLogsVisible] = useState(false);
  const [storeLogs, setStoreLogs] = useState([]);

  const [confirmAlert, setConfirmAlert] = useState(false);
  const [linkAlert, setLinkAlert] = useState(false);
  const [unlinkAlert, setUnLinkAlert] = useState(false);

  const [reportReason, setReportReason] = useState('Spam Order');
  const [assignToBranch, setAssignToBranch] = useState(order.item.branch_key);

  const [timedBorderColor, setTimedBorderColor] = useState('#dddddd');
  const [timeDifference, setTimeDifference] = useState(0);

  // {fetchOrderTotal(
  //   getStoreOrderItems(order.item.items, storeID)
  // ) + fetchTotalShipping(order.item.total_shipping.data, storeID)}
  console.log(fetchOrderTotal(getStoreOrderItems(order.item.items, storeID)));
  useEffect(() => {
    setStoreLogs(
      order.item.branch_log.filter(item => item.store_id == storeID),
    );
    var timedInterval = setInterval(() => {
      let timeDiff = getOrderedAtDifference(order.item);
      setTimeDifference(timeDiff);
      if (timeDiff >= 5 && timeDiff <= 10) {
        setTimedBorderColor('orange');
      } else if (timeDiff > 10) {
        clearInterval(timedInterval);
        setTimedBorderColor('red');
      } else {
        setTimedBorderColor('#dddddd');
      }
    }, 1000);
  }, [order]);

  const handleVisibility = () => {
    setVisible(!isVisible);
  };
  const handleVisibility2 = () => {
    setVisible2(!isVisible2);
  };

  const handleAssignBranch = () => {
    linkOrder(order.item, assignToBranch)
      .then(() => {
        setVisible2(false);
        setTimeDifference(0);
        ToastAndroid.show(`Order assigned`, 3000);
      })
      .catch(err => console.log(err));
  };

  const handleLinkOrder = () => {
    linkOrder(order.item, userBranch)
      .then(() => {
        setLinkAlert(false);
      })
      .catch(error => console.log(error));
  };

  const handleUnlinkOrder = () => {
    unlinkOrder(order.item, userBranch)
      .then(() => {
        setUnLinkAlert(false);
        ToastAndroid.show(`Order Transfered`, 3000);
      })
      .catch(error => console.log(error));
  };

  const handleAcceptOrder = () => {
    moveToPreparing(order.item)
      .then(() => {
        setConfirmAlert(false);
        ToastAndroid.show(`Order Moved to Pending`, 3000);
      })
      .catch(err => console.log(err));
  };

  const handleLinkToggle = () => {
    checkBranch(order.item.branch_key, String(userBranch))
      ? setUnLinkAlert(true)
      : setLinkAlert(true);
  };

  const handleCancelOrder = () => {
    moveToCancel(order.item, reportReason);
    handleVisibility();
    ToastAndroid.show('Order Reported', 2000);
  };

  return useMemo(() => {
    return (
      <View
        style={
          fetchTotalShipping(order.item.total_shipping.data, storeID) > 0
            ? [styles.container]
            : [styles.container, {borderColor: '#dff7ef', borderWidth: 3}]
        }>
        <View style={styles.rowHeader}>
          <View>
            <Text style={styles.trackingText}>
              Tracking #: {order.item.tracking_code}
            </Text>
            <View style={styles.paymentDetails}>
              <Text style={styles.totalValueLatest}>
                ₱{' '}
                {fetchOrderTotal(
                  getStoreOrderItems(order.item.items, storeID),
                ) + fetchTotalShipping(order.item.total_shipping.data, storeID)}
              </Text>
            </View>
          </View>

          <View
            style={[styles.timeIndicator, {backgroundColor: timedBorderColor}]}
          />
        </View>

        <View style={styles.border} />
        <View style={styles.container__body}>
          <View style={styles.info__container}>
            <View>
              <Text style={[styles.deliveredValue, styles.date]}>
                {order.item.ordered_at}
              </Text>
              <Text style={[styles.address]}>
                {order.item.info.storeInfo[0].store_barangay}
              </Text>
            </View>
            <View style={styles.timer__container}>
              <Text style={styles.timer__text}>
                {convertMinutesToHours(parseInt(timeDifference))}
              </Text>
            </View>
          </View>

          <Text style={styles.deliveredValue}>
            Payment Method : {order.item.payment_method}
          </Text>
          {/* <Text style={styles.deliveredValue}>
            Payment Status :{" "}
            <Text
              style={
                order.item.payment_status
                  ? { color: Colors.success }
                  : { color: Colors.error }
              }
            >
              {order.item.payment_status ? "Paid" : "Pending"}
            </Text>
          </Text> */}

          <Text style={styles.deliveredValue}>
            Delivery Fee :{' '}
            <Text
              style={
                fetchTotalShipping(order.item.total_shipping.data, storeID) > 0
                  ? {color: Colors.success}
                  : {color: Colors.error}
              }>
              {fetchTotalShipping(order.item.total_shipping.data, storeID) > 0
                ? 'Paid by customer'
                : `₱ ${fetchTotalShippingStore(
                    order.item.total_shipping.data,
                    storeID,
                  ).toFixed(2)}`}
            </Text>
          </Text>

          {userInfoRole == 'reseller' ? (
            <View style={styles.button__group}>
              {storeBranches.length == 0 ? (
                <TouchableOpacity
                  style={[
                    styles.accept__button,
                    {backgroundColor: Colors.secondary},
                  ]}
                  onPress={() => setConfirmAlert(true)}>
                  <Text style={styles.accept__button_text}>Receive Order</Text>
                </TouchableOpacity>
              ) : (
                // <TouchableOpacity
                //   style={[styles.button, { backgroundColor: Colors.secondary }]}
                //   onPress={() => setConfirmAlert(true)}
                // >
                //   <Icon name="text-document" size={20} color="white" />
                // </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.accept__button,
                    {backgroundColor: Colors.green},
                  ]}
                  onPress={() => setLogsVisible(true)}>
                  <Text style={styles.accept__button_text}>
                    Order Logs ({storeLogs.length})
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={
                  timeDifference < 5
                    ? [
                        styles.button,
                        {
                          backgroundColor: Colors.lightGray,
                        },
                      ]
                    : [
                        styles.button,

                        {
                          backgroundColor: '#60B7FF',
                        },
                      ]
                }
                disabled={timeDifference < 5}
                onPress={handleVisibility2}>
                <Icon2 name="chain" size={20} color={'white'} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, {backgroundColor: Colors.lightGray}]}
                onPress={handleVisibility}
                disabled={userInfoRole == 'reseller'}>
                <Icon2 name="close" size={20} color={'white'}></Icon2>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.button__group}>
              <TouchableOpacity
                style={[
                  styles.accept__button,
                  {
                    backgroundColor: !checkBranch(
                      order.item.branch_key,
                      String(userBranch),
                    )
                      ? Colors.darkGray
                      : Colors.secondary,
                  },
                ]}
                onPress={() => setConfirmAlert(true)}
                disabled={
                  !checkBranch(order.item.branch_key, String(userBranch))
                }>
                <Text style={styles.accept__button_text}>Accept Order</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,

                  {
                    backgroundColor: !checkBranch(
                      order.item.branch_key,
                      String(userBranch),
                    )
                      ? '#60B7FF'
                      : Colors.error,
                  },
                ]}
                onPress={handleLinkToggle}>
                <Icon2
                  name={
                    !checkBranch(order.item.branch_key, String(userBranch))
                      ? 'chain'
                      : 'chain-broken'
                  }
                  size={20}
                  color={'white'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.report__button]}
                onPress={handleVisibility}>
                <Icon2 name="close" size={20} color={'white'}></Icon2>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.border} />

        <TouchableOpacity
          onPress={showDetails}
          style={styles.cardContainer}
          activeOpacity={0.9}>
          <View style={styles.restoName}>
            <View style={styles.order__details}>
              <Text style={styles.order__details_text}>Order Details</Text>
              <Entypo name="plus" size={20} color={'black'} />
            </View>
          </View>
        </TouchableOpacity>

        <Modal
          isVisible={logsVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropTransitionOutTiming={0}
          onBackButtonPress={() => setLogsVisible(false)}>
          <View style={styles.modal__container}>
            <ScrollView>
              <Text style={styles.modal__header}>Branch Log</Text>
              <View style={styles.separator}></View>
              <View style={styles.modal__content}>
                {storeLogs &&
                  storeLogs.map((log, index) => {
                    return <LogItem key={String(index)} order={log} />;
                  })}

                <View style={styles.modal__buttonGroup}>
                  <TouchableOpacity
                    onPress={() => setLogsVisible(false)}
                    style={[styles.closeModal__button, styles.modal__button]}>
                    <Text style={{color: 'white'}}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>

        <Modal
          isVisible={isVisible2}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropTransitionOutTiming={0}>
          <View style={styles.modal__container}>
            <Text style={styles.modal__header}>Assign to a branch</Text>
            <View style={styles.separator}></View>
            <View style={styles.modal__content}>
              <View style={styles.picker__wrapper}>
                <Picker
                  selectedValue={assignToBranch}
                  style={styles.picker}
                  onValueChange={branch => setAssignToBranch(branch)}>
                  {storeBranches
                    .filter(branch => {
                      return branch.is_active;
                    })
                    .map(branch => {
                      return (
                        <Picker.Item
                          label={branch.name}
                          value={branch.key}
                          key={branch.key}
                        />
                      );
                    })}
                </Picker>
              </View>

              <View style={styles.modal__buttonGroup}>
                <TouchableOpacity
                  style={[styles.submitReport__button, styles.modal__button]}
                  onPress={handleAssignBranch}>
                  <Text style={{color: 'white'}}>Assign</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setVisible2(false)}
                  style={[styles.closeModal__button, styles.modal__button]}>
                  <Text style={{color: 'white'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={isVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropTransitionOutTiming={0}>
          <View style={styles.modal__container}>
            <Text style={styles.modal__header}>Request to Cancel</Text>
            <View style={styles.separator}></View>
            <View style={styles.modal__content}>
              <Text style={{marginVertical: 5}}>Reason to cancel: </Text>
              <View style={styles.picker__wrapper}>
                <Picker
                  selectedValue={reportReason}
                  style={styles.picker}
                  onValueChange={itemValue => setReportReason(itemValue)}>
                  <Picker.Item
                    label="Buyer cancelled"
                    value={'Buyer cancelled'}
                  />
                  <Picker.Item label="Change Order " value={'Change Order'} />

                  <Picker.Item
                    label="Cannot contact buyer"
                    value={'Cannot contact buyer'}
                  />
                  <Picker.Item
                    label="Cannot fulfill order"
                    value={'Cannot fulfill order'}
                  />
                  <Picker.Item
                    label="Insufficient Information"
                    value={'Insuficient Information'}
                  />
                  <Picker.Item label="Repeat Entry" value={'Repeat Entry'} />
                </Picker>
              </View>

              <View style={styles.modal__buttonGroup}>
                <TouchableOpacity
                  style={[styles.submitReport__button, styles.modal__button]}
                  onPress={handleCancelOrder}>
                  <Text style={{color: 'white'}}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleVisibility}
                  style={[styles.closeModal__button, styles.modal__button]}>
                  <Text style={{color: 'white'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Alert For Acknowledging Order */}
        <AwesomeAlert
          show={confirmAlert}
          showProgress={false}
          title="New Order"
          message="Order will be moved to Pending Queue"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          cancelButtonColor={Colors.error}
          confirmText="Accept Order"
          confirmButtonColor="#63a34b"
          onCancelPressed={() => {
            setConfirmAlert(false);
          }}
          onConfirmPressed={() => {
            handleAcceptOrder();
          }}
        />

        <AwesomeAlert
          show={linkAlert}
          showProgress={false}
          title="Link Order"
          message="Process this order?"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No"
          confirmText="Confirm"
          confirmButtonColor="#63a34b"
          onCancelPressed={() => {
            setLinkAlert(false);
          }}
          onConfirmPressed={handleLinkOrder}
        />

        <AwesomeAlert
          show={unlinkAlert}
          showProgress={false}
          title="Transfer Order"
          message="Oder will be moved to another branch"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Confirm"
          confirmButtonColor="#63a34b"
          cancelButtonColor={Colors.error}
          onCancelPressed={() => {
            setUnLinkAlert(false);
          }}
          onConfirmPressed={() => {
            handleUnlinkOrder();
          }}
        />
      </View>
    );
  }, [
    order,
    isVisible,
    isVisible2,
    logsVisible,
    confirmAlert,
    linkAlert,
    unlinkAlert,
    timeDifference,
    assignToBranch,
    timedBorderColor,
  ]);
}

export default OrderItems;
