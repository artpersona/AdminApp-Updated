import { StyleSheet } from "react-native";
import { Colors } from "../../config";
export default StyleSheet.create({
  table__row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginBottom: 10,
  },

  table__header: {
    fontWeight: "bold",
  },

  table__content: {
    flexDirection: "row",
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: Colors.primary,
    paddingVertical: 5,
    alignItems: "center",
  },
  table__item1: {
    width: "50%",
  },
  table__item2: {
    width: "25%",
  },
  table__item3: {
    width: "75%",
  },

  text: {
    color: Colors.darkestGrey,
  },
  text__special: {
    color: Colors.secondary,
  },

  order__name: {
    width: "90%",
  },
  text__total: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },

  table__total: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 5,
  },

  subcontent__header: {
    fontSize: 13,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
    paddingBottom: 5,
  },
  subcontent__contents: {
    paddingVertical: 5,
  },

  toggle__button: {
    marginLeft: -19,
  },
});
