import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import Table from "../../components/Table/Table";
import PhotoOrders from "./PhotoOrders";
import AwesomeAlert from "react-native-awesome-alerts";
import { OrderContext } from "../../shared/contexts/OrderContext";
import { AuthContext } from "../../shared/contexts/AuthContext";
import styles from "./styles";
import { Colors } from "../../config";
import {
  getStoreOrderItems,
  fetchOrderTotal,
  fetchTotalShipping,
  getRiderDetails,
} from "../../utils/order.utility";
function OrderDetails({ route, navigation }) {
  const { userInfoRole, userInfoStore, store_id } = useContext(AuthContext);
  const { moveToPreparing } = useContext(OrderContext);

  const [confirmAlert, setConfirmAlert] = useState(false);
  const [acceptAlert, setAcceptAlert] = useState(false);

  const { order, confirmation } = route.params;

  const storeID =
    userInfoRole == "branch_admin" ? String(store_id) : String(userInfoStore);

  const shippingFee = fetchTotalShipping(order.total_shipping.data, storeID);
  const totalGoods = fetchOrderTotal(getStoreOrderItems(order.items, storeID));

  const cummulativeTotal = shippingFee + totalGoods;
  console.log("total goods is: ", totalGoods);
  console.log("shipping fee is: ", shippingFee);

  const [paymentStatus, setPaymentStatus] = useState(
    order.payment_status ? true : false
  );

  const photoArray = order.items.filter((order) => {
    return order.image;
  });

  const [riderDetails, setRiderDetails] = useState(
    getRiderDetails(order, storeID)
  );

  const handleAcceptOrder = () => {
    moveToPreparing(order)
      .then(() => {
        setConfirmAlert(false);
        ToastAndroid.show(`Order Moved to Pending`, 3000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView>
      <CustomHeader showBackButton />

      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.orderDetails__header}>
            <Text style={styles.tracking__number}>
              Tracking #: {order.tracking_code}
            </Text>
            <View style={styles.order__total}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalValue}>₱{cummulativeTotal}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.section__header}>
              <Text style={styles.section__header_text}>Order Info</Text>
            </View>
            <View style={styles.section__content}>
              <Text style={[styles.date, styles.section__text]}>
                {order.ordered_at}
              </Text>
              <Text style={styles.section__text}>
                Payment Method: {order.payment_method}
              </Text>
              {/* <View style={styles.payment__status}>
                <Text style={styles.section__text}>Payment Status: </Text>
                {paymentStatus ? (
                  <Text
                    style={[styles.payment__status_text, { color: "green" }]}
                  >
                    Paid
                  </Text>
                ) : (
                  <Text style={[styles.payment__status_text, { color: "red" }]}>
                    Not Paid
                  </Text>
                )}
              </View> */}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.section__header}>
              <Text style={styles.section__header_text}>Delivery Details</Text>
            </View>
            <View style={styles.section__content}>
              <Text style={styles.section__text}>
                Customer Name: {order.info.full_name}
              </Text>
              <Text style={styles.section__text}>
                Phone Number: {order.info.phone}
              </Text>
              <Text style={styles.section__text}>
                Address: {order.info.full_address}
              </Text>
              <Text style={[styles.address__notes, styles.section__text]}>
                Address Notes: {order.info.address_notes}
              </Text>
            </View>
          </View>

          {riderDetails.riderName && (
            <View style={styles.section}>
              <View style={styles.section__header}>
                <Text style={styles.section__header_text}>Rider Details</Text>
              </View>
              <View style={styles.section__content}>
                <Text style={styles.section__text}>
                  Rider ID: {riderDetails.riderId}
                </Text>
                <Text style={styles.section__text}>
                  Rider Name: {riderDetails.riderName}
                </Text>
                <Text style={styles.section__text}>
                  Rider Group: {riderDetails.set_rider}
                </Text>
              </View>
            </View>
          )}

          <View style={styles.section}>
            <View style={styles.section__header}>
              <Text style={styles.section__header_text}>Order Items</Text>
            </View>
            <View style={styles.section__content}>
              <Table
                items={getStoreOrderItems(order.items, storeID)}
                total_shipping={fetchTotalShipping(
                  order.total_shipping.data,
                  storeID
                )}
                total_goods={fetchOrderTotal(
                  getStoreOrderItems(order.items, storeID)
                )}
                key={order.key}
              />
            </View>
          </View>
          {photoArray.length > 0 && (
            <View style={styles.section}>
              <View style={styles.section__header}>
                <Text style={styles.section__header_text}>Photo Orders</Text>
              </View>
              <View style={styles.section__content}>
                <PhotoOrders key={order.key} orders={photoArray} />
              </View>
            </View>
          )}

          <View style={styles.section}>
            <View style={styles.section__header}>
              <Text style={styles.section__header_text}>Order Notes</Text>
            </View>
            <View style={styles.section__content}>
              <Text style={styles.section__text}>{order.info.order_notes}</Text>
            </View>
          </View>
        </View>
        {confirmation && userInfoRole != "reseller" && (
          <TouchableOpacity
            style={
              !order.is_preparing
                ? [styles.accept__button, { backgroundColor: Colors.lightGray }]
                : styles.accept__button
            }
            onPress={() => setAcceptAlert(true)}
            disabled={!order.is_preparing}
          >
            <Text style={styles.accept__buttonText}>Accept Order</Text>
          </TouchableOpacity>
        )}
      </View>

      <AwesomeAlert
        show={acceptAlert}
        showProgress={false}
        title="Accept Order"
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
          setAcceptAlert(false);
        }}
        onConfirmPressed={() => {
          handleAcceptOrder();
        }}
      />
    </ScrollView>
  );
}

export default OrderDetails;
