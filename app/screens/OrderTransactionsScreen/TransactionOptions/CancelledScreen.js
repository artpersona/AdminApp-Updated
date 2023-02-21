import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { OrderContext } from '../../../shared/contexts/OrderContext';
import styles from "../styles";
import TransactionItem from "../../../components/TransactionCards/TransactionCards";
import ListEmpty from "../../../components/ListEmpty/ListEmpty";
function CancelledScreen() {
  const { fetchFilteredOrders, pastOrders } = useContext(OrderContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const filtered = fetchFilteredOrders("cancelled");
    setOrders(filtered);
  }, [pastOrders]);

  const renderItem = ({ item }) => (
    <TransactionItem key={item.tracking_number} data={item} isPending={false} />
  );

  const keyExtract = (item, index) => item.tracking_number;
  return (
    <View style={styles.container}>
      <View style={styles.transaction__wrapper}>
        <FlatList
          data={orders}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<ListEmpty type={"transaction"} />}
          keyExtractor={keyExtract}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    </View>
  );
}

export default React.memo(CancelledScreen);
