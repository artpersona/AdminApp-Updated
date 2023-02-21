import { StyleSheet } from "react-native";
import { Colors } from "../../../config";
import { RFValue } from "react-native-responsive-fontsize";
export default StyleSheet.create({
  product__container: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderRightWidth: 2,
    borderColor: "whitesmoke",
    marginVertical: 5,
  },
  product__wrapper: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  product__info: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
  },
  product__image: {
    width: 40,
    height: "100%",
    borderRadius: 5,
    marginRight: 10,
  },

  product__title: {
    color: Colors.darkestGrey,
    fontSize: RFValue(14),
    marginBottom: 3,
  },

  stock__text: {
    fontSize: RFValue(12),
    color: Colors.darkestGrey,
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

  modal__header: {
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginTop: -5,
    marginBottom: 5,
    fontSize: RFValue(16),
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

  stocks__input: {
    color: "black",
    padding: 10,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "whitesmoke",
  },
  picker__wrapper: {
    width: "91%",
    alignSelf: "center",
    borderWidth: 1,
    color: Colors.darkGray,
    marginVertical: 10,
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
    fontSize: RFValue(16),
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

  picker__label: {
    color: Colors.darkestGrey,
  },
});
