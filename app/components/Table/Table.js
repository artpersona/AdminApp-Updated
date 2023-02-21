import React from "react";
import { View, Text } from "react-native";
import TableItem from "./TableItem";
import styles from "./styles";
function Table({ items, total_shipping, total_goods }) {
  var total_discount = 0;
  return (
    <View style={styles.table__container}>
      <View style={styles.table__row}>
        <Text style={[styles.table__item1, styles.table__header]}>Item</Text>
        <Text style={[styles.table__item2, styles.table__header]}>
          Quantity
        </Text>
        <Text style={[styles.table__item2, styles.table__header]}>
          Subtotal
        </Text>
      </View>
      {items.map((order, index) => {
        total_discount += order.discountSellingPrice - order.discountPrice;
        if (!order.image) {
          return <TableItem order={order} key={String(index)}></TableItem>;
        }
      })}

      <View style={styles.table__content}>
        <View style={styles.table__item3}>
          <Text style={styles.text__special}>Delivery Fee:</Text>
        </View>

        <View style={styles.table__item2}>
          <Text style={styles.text}>P {total_shipping}</Text>
        </View>
      </View>

      <View style={[styles.table__total, styles.table__content]}>
        <View style={styles.table__item3}>
          <Text style={styles.text__total}>Total: </Text>
        </View>

        <View style={styles.table__item2}>
          <Text style={styles.text__total}>
            ₱ {Number(total_goods) + Number(total_shipping)}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Table;
