import React, { useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import OrderItem from "./OrderItems";
import ListEmpty from "../ListEmpty/ListEmpty";
import styles from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
function OrdersLists({ newOrders }) {
  const renderItem = (order) => {
    return <OrderItem key={order.item.key} order={order} />;
  };
  const keyExtract = (item, index) => item.tracking_code;

  return useMemo(() => {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        {newOrders.length > 0 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text
              style={{
                fontSize: RFValue(20),
                fontWeight: "bold",
                marginVertical: 10,
              }}
            >
              New Orders
            </Text>

            <View style={styles.note__container}>
              <View
                style={[styles.note__color, { backgroundColor: "#dff7ef" }]}
              />

              <Text style={styles.note__text}>
                Free Delivery for orders accentuated with this color.
              </Text>
            </View>
          </View>
        )}

        <FlatList
          data={newOrders}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, margin: 0, padding: 0 }}
          ListEmptyComponent={ListEmpty}
          keyExtractor={keyExtract}
          maxToRenderPerBatch={2}
          initialNumToRender={10}
          windowSize={10}
        />
      </View>
    );
  }, [newOrders]);
}

export default OrdersLists;
