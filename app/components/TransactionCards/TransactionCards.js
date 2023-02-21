import React, {useState, useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../../config';
import AwesomeAlert from 'react-native-awesome-alerts';
import {OrderContext} from '../../shared/contexts/OrderContext';
import {BranchContext} from '../../shared/contexts/BranchContext';
import {AuthContext} from '../../shared/contexts/AuthContext';
import {
  getCurrentStatus,
  getRiderDetails,
  getStoreOrderItems,
  fetchOrderTotal,
  fetchRiderAffiliation,
} from '../../utils/order.utility';
import Modal from 'react-native-modal';
import styles from './style';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {isNull} from 'lodash';

function TransactionCards({data, isPending, isQrActive}) {
  const navigation = useNavigation();
  const showDetails = () => {
    navigation.navigate('OrderDetails', {order: data});
  };

  const pending = isPending;

  const {
    markReadyForDeliveryFreelance,
    markReadyForDeliveryStore,
    moveBackToRiderQueue,
    handleLoanRequest,
  } = useContext(OrderContext);

  const {userInfoRole, userInfoStore, store_id} = useContext(AuthContext);
  const {branchRiders, riderGroups} = useContext(BranchContext);

  const [finalRiderGroups, setFinalRiderGroups] = useState([]);

  useEffect(() => {
    const riderFinalGroups = fetchRiderAffiliation(data);
    if (riderFinalGroups.length != 0) {
      if (riderFinalGroups.length > 1) riderFinalGroups.pop();
      console.log('pasok 1');
      setFinalRiderGroups(riderFinalGroups.splice(0, 1));
    } else {
      console.log('pasok 2');

      setFinalRiderGroups(riderGroups);
    }
  }, [riderGroups]);

  const [transitAlert, setTransitAlert] = useState(false);
  const [riderLateAlert, setRiderLateAlert] = useState(false);

  const [riderModal, setRiderModal] = useState(false);
  const [groupRiderModal, setGroupRiderModal] = useState(false);

  const [clicked, setClicked] = useState(null);

  const [riderGroupClicked, setRiderGroupClicked] = useState(null);

  const storeID =
    userInfoRole == 'branch_admin' ? String(store_id) : String(userInfoStore);
  const [orderStatus, setOrderStatus] = useState(
    getCurrentStatus(data, storeID),
  );

  const [loanRequestModal, setLoanRequestModal] = useState(
    orderStatus?.loanRequest ? true : false,
  );

  const [riderDetails, setRiderDetails] = useState(
    getRiderDetails(data, storeID),
  );

  const [riderInfo, setRiderInfo] = useState('');

  const handleQRPress = () => {
    navigation.navigate('QRScanner', {product: data});
  };

  const handleAcceptLoanRequest = () => {
    handleLoanRequest(data, orderStatus?.store_id, 'accept').then(() => {
      setLoanRequestModal(false);
      ToastAndroid.show(`Payments via points accepted`, 3000);
    });
  };

  const handleRejectLoanRequest = () => {
    handleLoanRequest(data, orderStatus?.store_id, 'reject').then(() => {
      setLoanRequestModal(false);
      ToastAndroid.show(`Payments via points rejected`, 3000);
    });
  };

  const getBorderColor = () => {
    if (!pending) {
      if (orderStatus.status == 'on_transit') {
        return '#F79346';
      } else if (orderStatus.status == 'delivered') {
        return 'green';
      } else if (
        orderStatus.status == 'ready' ||
        orderStatus.status == 'reserved'
      ) {
        return 'blue';
      }
      return 'red';
    } else {
      return '#F79346';
    }
  };

  const showStoreRiders = () => {
    setRiderModal(true);
    // handleAssignFreelance();
  };

  const handleAssignStore = () => {
    markReadyForDeliveryStore(data, riderInfo);
    ToastAndroid.show(`Order is on transit`, 3000);
    setRiderModal(false);
  };

  const handleAssignFreelance = () => {
    markReadyForDeliveryFreelance(data);
    ToastAndroid.show(`Order moved to ready`, 3000);
  };

  const handleSetRiderAlert = () => {
    setRiderLateAlert(!riderLateAlert);
  };

  const handleSendBackToQueue = () => {
    setRiderLateAlert(false);
    moveBackToRiderQueue(data);
  };

  const borderColor = getBorderColor();

  return (
    <TouchableOpacity
      style={[styles.item__container, {borderRightColor: borderColor}]}
      onPress={showDetails}>
      <View style={styles.item__info}>
        <Text style={styles.tracking__number}>
          Tracking #: {data.tracking_code}
        </Text>
        {!riderDetails.riderName && (
          <Text style={styles.customer__name}>
            {orderStatus.rider_affiliation}
          </Text>
        )}
        {riderDetails.riderName && (
          <View style={styles.rider__details}>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>Rider Name: </Text>
            <Text style={{fontSize: 13}}>{riderDetails.riderName}</Text>
          </View>
        )}
      </View>
      {pending ? (
        <TouchableOpacity
          style={styles.option__button}
          onPress={() => setTransitAlert(true)}
          disabled={userInfoRole == 'reseller'}>
          <FontAwesome5
            name="car-alt"
            size={24}
            color={userInfoRole == 'reseller' ? Colors.darkGray : '#F79346'}
          />
        </TouchableOpacity>
      ) : (
        <View
          style={
            isQrActive && orderStatus.status == 'reserved'
              ? [styles.status__container, {width: '30%'}]
              : styles.status__container
          }>
          {orderStatus.riderLate == true &&
            orderStatus.status == 'reserved' && (
              <TouchableOpacity
                onPress={handleSetRiderAlert}
                style={styles.scanner__container}>
                <MaterialIcons name="no-transfer" size={24} color="red" />
              </TouchableOpacity>
            )}

          {isQrActive && orderStatus.status == 'reserved' && (
            <TouchableOpacity
              onPress={handleQRPress}
              style={styles.scanner__container}>
              <MaterialIcons name="qr-code-scanner" size={24} color="black" />
            </TouchableOpacity>
          )}

          {(!orderStatus.riderLate ||
            (orderStatus.riderLate && orderStatus.status != 'reserved')) && (
            <Text style={styles.order__price}>
              ₱ {fetchOrderTotal(getStoreOrderItems(data.items, storeID))}
            </Text>
          )}
        </View>
      )}

      <AwesomeAlert
        show={transitAlert}
        showProgress={false}
        title="Order's Ready?"
        message="Select a delivery group"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        onDismiss={() => {
          setTransitAlert(false);
        }}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Freelance Riders"
        confirmText="Store Riders"
        confirmButtonColor={!branchRiders.length > 0 ? 'grey' : '#63a34b'}
        cancelButtonColor="#6692e3"
        onCancelPressed={() => {
          // setGroupRiderModal(true);
          handleAssignFreelance();
          setTransitAlert(false);
        }}
        onConfirmPressed={() => {
          if (branchRiders.length > 0) {
            showStoreRiders();
            setTransitAlert(false);
          }
        }}
      />

      <AwesomeAlert
        show={riderLateAlert}
        showProgress={false}
        title="Return to Queue?"
        message="Rider has been late for 15mins already"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        onDismiss={handleSetRiderAlert}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Confirm"
        confirmButtonColor="#63a34b"
        cancelButtonColor="red"
        onCancelPressed={handleSendBackToQueue}
        onConfirmPressed={() => {
          handleSetRiderAlert();
        }}
      />

      <Modal
        isVisible={riderModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
        onBackButtonPress={() => setRiderModal(false)}>
        <View style={styles.modal__container}>
          <Text style={styles.modal__header}>Select Rider</Text>
          <View style={styles.separator}></View>
          <View style={styles.modal__content}>
            {branchRiders.map((rider, index) => {
              return (
                <View style={styles.rider__wrapper} key={rider.plate_number}>
                  <View>
                    <View style={styles.text__group}>
                      <Text style={[styles.text__header, {fontSize: 16}]}>
                        {rider.name}
                      </Text>
                    </View>
                    <View style={styles.text__group}>
                      <Text style={styles.text__header}>Plate Number:</Text>
                      <Text>{rider.plate_number}</Text>
                    </View>
                  </View>
                  <View style={styles.radio__container}>
                    <TouchableOpacity
                      style={styles.radioCircle}
                      onPress={() => {
                        setClicked(index);
                        setRiderInfo(rider);
                      }}>
                      {index == clicked && <View style={styles.selectedRb} />}
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}

            <View style={styles.modal__buttonGroup}>
              <TouchableOpacity
                style={[styles.submitReport__button, styles.modal__button]}
                onPress={() => handleAssignStore()}
                disabled={riderInfo == ''}>
                <Text style={{color: 'white'}}>Assign</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setRiderModal(false)}
                style={[styles.closeModal__button, styles.modal__button]}>
                <Text style={{color: 'white'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={groupRiderModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
        onBackButtonPress={() => setGroupRiderModal(false)}>
        <View style={styles.modal__container}>
          <Text style={styles.modal__header}>Select Rider Group</Text>
          <View style={styles.separator}></View>
          <View style={styles.modal__content}>
            {finalRiderGroups.map((item, index) => {
              return (
                <View style={styles.rider__wrapper} key={index}>
                  <View>
                    <View style={styles.text__group}>
                      <Text style={[styles.text__header, {fontSize: 16}]}>
                        {item}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.radio__container}>
                    <TouchableOpacity
                      style={styles.radioCircle}
                      onPress={() => {
                        setRiderGroupClicked(index);
                      }}>
                      {index == riderGroupClicked && (
                        <View style={styles.selectedRb} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}

            <View style={styles.modal__buttonGroup}>
              <TouchableOpacity
                style={[styles.submitReport__button, styles.modal__button]}
                onPress={handleAssignFreelance}
                disabled={isNull(riderGroupClicked)}>
                <Text style={{color: 'white'}}>Assign</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setGroupRiderModal(false)}
                style={[styles.closeModal__button, styles.modal__button]}>
                <Text style={{color: 'white'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <AwesomeAlert
        show={loanRequestModal}
        showProgress={false}
        title={`${data.tracking_code}: ₱ ${orderStatus?.loanAmount} points to pay.`}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Reject"
        cancelButtonColor={Colors.error}
        confirmText="Confirm"
        confirmButtonColor="#63a34b"
        onCancelPressed={handleRejectLoanRequest}
        onConfirmPressed={handleAcceptLoanRequest}
      />
    </TouchableOpacity>
  );
}
export default React.memo(TransactionCards);
