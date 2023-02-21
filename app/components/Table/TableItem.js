import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";
import { getCurrentPrice } from "../../utils/order.utility";
function TableItem({ order }) {
  const [isCollapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <TouchableWithoutFeedback onPress={handleToggle}>
      <View style={styles.content__wrapper}>
        <View style={styles.table__content}>
          <View style={styles.table__item1}>
            <Text style={[styles.text, styles.order__name]}>{order.name}</Text>
          </View>
          <View style={styles.table__item2}>
            <Text style={styles.text}>
              {order.quantity} {order.unit}/s
            </Text>
          </View>
          <View>
            <Text style={styles.text}>
              P {Number(getCurrentPrice(order)) * Number(order.quantity)}
            </Text>
          </View>
        </View>
        <View style={styles.subcontents}>
          {/* Put conditionals here! If there are options then show these contents  */}
          {order.selectedOption && (
            <>
              <Text style={styles.subcontent__header}>OPTIONS</Text>

              <View
                style={[styles.subcontent__contents, { flexDirection: "row" }]}
              >
                <Text style={styles.table__item3}>
                  {order.selectedOption.name}
                </Text>
                <Text style={styles.table__item1}>
                  P {order.selectedOption.amount}
                </Text>
              </View>
            </>
          )}

          {/* Put conditionals here! If there are add-ons then show these contents  */}
          {order.selectedAddOn && order.selectedAddOn.length != 0 && (
            <>
              <Text style={styles.subcontent__header}>ADD-ONS</Text>
              {Object.values(order.selectedAddOn).map((addon) => {
                return (
                  <View
                    style={[
                      styles.subcontent__contents,
                      { flexDirection: "row" },
                    ]}
                    key={addon.name}
                  >
                    <Text style={styles.table__item1}>{addon.name}</Text>
                    <Text style={styles.table__item2}>{order.quantity}</Text>
                    <Text>P {addon.amount * order.quantity}</Text>
                  </View>
                );
              })}
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default TableItem;
