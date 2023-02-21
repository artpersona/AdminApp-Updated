import { StyleSheet } from "react-native";
import { Colors } from "../../config";
import { RFValue } from "react-native-responsive-fontsize";
export default StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingBottom: 230,
  },

  transaction__wrapper: {
    width: "90%",
  },

  transaction__header: {
    marginHorizontal: 10,
    fontSize: RFValue(20),
    fontWeight: "bold",
    paddingBottom: 10,
    paddingTop: 20,
  },

  item__container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.lightGray,
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

  text__input: {
    color: "white",
    backgroundColor: "white",
    height: 50,
    paddingHorizontal: 15,
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
  picker__group: {
    marginVertical: 5,
  },
  picker__wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "whitesmoke",
  },
  picker: {
    width: "100%",
  },

  picker__label: {
    color: Colors.darkestGrey,
  },
  location__text: {
    fontSize: RFValue(13),
  },
});
