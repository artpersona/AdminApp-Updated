import { StyleSheet } from "react-native";
import { Colors } from "../../config";
export default StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    paddingBottom: 20,
  },

  wrapper: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 19,
    backgroundColor: Colors.white,
    flexGrow: 1,
    marginTop: 30,
    marginBottom: 10,
  },

  orderDetails__header: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "90%",
    paddingTop: 10,
  },
  tracking__number: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.darkestGrey,
  },

  totalText: {
    fontSize: 10,
    textAlign: "center",
    color: Colors.darkestGrey,
  },
  totalValue: {
    fontSize: 15,
    color: Colors.secondary,
    fontWeight: "bold",
  },

  order__total: {
    alignItems: "center",
  },

  section: {
    marginTop: 10,
  },

  section__header: {
    backgroundColor: Colors.lightestGray,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: Colors.primary,
  },

  section__header_text: {
    width: "90%",
    alignSelf: "center",
    color: Colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
  },

  section__content: {
    width: "90%",
    alignSelf: "center",
    paddingVertical: 10,
  },

  section__text: {
    color: Colors.darkestGrey,
    paddingTop: 7,
  },

  payment__status: {
    flexDirection: "row",
    alignItems: "center",
  },
  payment__status_text: {
    paddingTop: 7,
  },
  date: {
    paddingBottom: 15,
  },
  confirmation__button: {
    alignSelf: "flex-start",
    paddingVertical: 7,
    paddingHorizontal: 15,
    marginTop: 15,
    backgroundColor: Colors.lightGray,
  },
  confirmation__text: {
    color: Colors.white,
  },

  accept__button: {
    width: "90%",
    backgroundColor: Colors.secondary,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  accept__buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
