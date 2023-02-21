import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
function ListEmpty({ type }) {
  return (
    <View style={styles.container}>
      {type == "transaction" ? (
        <View style={styles.wrapper}>
          <Image
            style={styles.image}
            source={require("../../assets/no_item.png")}
          ></Image>
          <Text style={styles.container__header}>Nothing to see here yet!</Text>
        </View>
      ) : (
        <View style={[styles.wrapper, styles.wrapper__colored]}>
          <Image
            style={styles.image}
            source={require("../../assets/empty.png")}
          ></Image>
          <Text style={styles.container__header}>No new orders yet!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container__header: {
    fontWeight: "bold",
    fontSize: 15,
  },

  wrapper: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },

  wrapper__colored: {
    borderBottomWidth: 2,
    borderBottomColor: "#F79346",
  },

  image: {
    marginLeft: -25,
    width: 170,
    height: 170,
  },
});

export default ListEmpty;
