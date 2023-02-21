import React, { useState, useEffect, useContext } from "react";
import { View, FlatList } from "react-native";
import { OrderContext } from "../../../shared/contexts/OrderContext";
import { BranchContext } from "../../../shared/contexts/BranchContext";
import { AuthContext } from "../../../shared/contexts/AuthContext";

import styles from "../styles";
import TransactionItem from "../../../components/TransactionCards/TransactionCards";
import ListEmpty from "../../../components/ListEmpty/ListEmpty";

function ReadyScreen() {
  const { fetchFilteredOrders, pastOrders } = useContext(OrderContext);
  const { storeBranches } = useContext(BranchContext);
  const { userInfoRole } = useContext(BranchContext);
  const [orders, setOrders] = useState([]);

  const qrActive =
    userInfoRole == "branch_admin" ? true : storeBranches.length == 0;

  useEffect(() => {
    const filtered = fetchFilteredOrders("ready");
    setOrders(filtered);
  }, [pastOrders]);

  const renderItem = ({ item, index }) => {
    console.log("item key is: ", item.key);
    return (
      <TransactionItem
        key={item.key.toString()}
        data={item}
        isPending={false}
        isQrActive={qrActive}
      />
    );
  };

  const keyExtract = (item, index) => index.toString();

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

export default React.memo(ReadyScreen);
