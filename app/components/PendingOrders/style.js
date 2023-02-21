import { StyleSheet } from "react-native";
import { Colors } from "../../../config";
export default StyleSheet.create({
  item__container: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    padding: 15,
    justifyContent: "space-between",
    borderRightWidth: 1,
    borderTopColor: "#DDDD",
    borderBottomColor: "#DDDD",
    borderBottomWidth: 1,
    borderRightColor: Colors.primary,
    marginVertical: 5,
  },

  tracking__number: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  order__price: {
    marginTop: 2,
    color: Colors.secondary,
  },

  button__group: {
    flexDirection: "row",
  },
  option__button: {
    paddingLeft: 10,
  },
});
