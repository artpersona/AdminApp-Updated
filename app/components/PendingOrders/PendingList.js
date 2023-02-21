import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import TransactionCards from "../TransactionCards/TransactionCards";
import { RFValue } from "react-native-responsive-fontsize";

function PendingList({ pendingOrders }) {
  const renderItem = ({ item }) => (
    <TransactionCards key={item.tracking_number} data={item} isPending={true} />
  );
  const keyExtract = (item, index) => index.toString();
  return (
    <View style={{ width: "90%", height: "100%", alignSelf: "center" }}>
      <Text
        style={{
          fontSize: RFValue(20),
          fontWeight: "bold",
        }}
      >
        Pending
      </Text>
      <FlatList
        data={pendingOrders}
        renderItem={renderItem}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={listEmptyComponent}
        keyExtractor={keyExtract}
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={8} // Reduce initial render amount
        maxToRenderPerBatch={8} // Reduce number in each render batch
        updateCellsBatchingPeriod={50} // Increase time between renders
        windowSize={7} // Reduce the window size
      />
    </View>
  );
}

const listEmptyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        --- <Text>No Pending Orders Yet</Text> ---
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  text: {
    color: "#9D9D9D",
    fontSize: RFValue(13),
  },
});

export default PendingList;
