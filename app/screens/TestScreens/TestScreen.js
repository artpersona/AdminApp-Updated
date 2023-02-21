import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomHeader } from "../../../components";
function TestScreen({ route, navigation }) {
  return (
    <View style={styles.container}>
      <CustomHeader />
      <Text>Test Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});

export default TestScreen;
