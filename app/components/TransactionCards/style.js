import { StyleSheet } from "react-native";
import { Colors } from "../../config";

export default StyleSheet.create({
  item__container: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    padding: 12,
    justifyContent: "space-between",
    borderRightWidth: 2,
    borderTopColor: "#DDDD",
    borderBottomColor: "#DDDD",
    borderBottomWidth: 1,
    marginVertical: 5,
  },

  button__group: {
    flexDirection: "row",
    marginBottom: 10,
  },
  option__button: {
    paddingLeft: 12,
  },
  delivery__button: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginRight: 5,
    backgroundColor: "red",
  },
  tracking__number: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  order__price: {
    marginTop: 2,
    color: Colors.secondary,
    fontSize: 15,
  },

  status__container: {
    flexDirection: "row",
    // width: "30%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  status__text: {
    fontSize: 14,
  },

  pending__buttonGroup: {
    flexDirection: "row",
  },

  modal__container: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text__input: {
    width: "100%",
    height: 100,
    textAlignVertical: "top",
    backgroundColor: "#f1f3f6",
    borderRadius: 6,
    paddingHorizontal: 10,
  },

  modal__header: {
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginTop: -5,
    marginBottom: 5,
    fontSize: 16,
  },
  separator: {
    borderBottomWidth: 1,
    marginBottom: 5,
    borderColor: Colors.secondary,
  },
  modal__content: {
    paddingHorizontal: 10,
  },
  modal__buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 5,
  },

  modal__button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    marginTop: 10,
  },

  submitReport__button: {
    backgroundColor: "#63a34b",
    color: "white",
  },
  closeModal__button: {
    backgroundColor: "#DD6B55",
  },

  rider__wrapper: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: "whitesmoke",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text__header: {
    fontWeight: "bold",
    marginRight: 5,
    marginBottom: 5,
  },

  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: Colors.secondary,
  },

  text__group: {
    flexDirection: "row",
  },
  rider__details: {
    flexDirection: "row",
    marginBottom: 5,
  },
  scanner__container: {
    padding: 10,
  },
});
