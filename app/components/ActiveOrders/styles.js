import { StyleSheet } from "react-native";
import { Colors } from "../../config";
import { isTablet } from "../../utils/device.utility";
import { RFValue } from "react-native-responsive-fontsize";
export default StyleSheet.create({
  container: {
    minWidth: RFValue(290),
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 19,
    backgroundColor: Colors.white,
    marginHorizontal: 15,
    flex: 1,
  },

  container__body: {
    marginHorizontal: RFValue(10),
    justifyContent: "space-around",
  },
  totalText: {
    fontSize: RFValue(15),
    textAlign: "center",
    color: "black",
  },
  totalValue: {
    fontSize: 14,
    color: Colors.header,

    fontWeight: "bold",
  },
  totalValueLatest: {
    fontSize: RFValue(15),
    color: Colors.primary,
    fontWeight: "bold",
  },
  deliveredText: {
    marginHorizontal: 10,
    marginBottom: 10,
    color: Colors.secondary,
    fontSize: RFValue(14),
    textAlign: "left",
    fontWeight: "bold",
  },
  deliveredValue: {
    fontSize: RFValue(13),

    color: Colors.darkGray,
  },
  restoName: {
    padding: 10,
    justifyContent: "center",
  },
  order__details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
  },
  order__details_text: {
    fontSize: RFValue(15),
  },
  border: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  statusText: {
    margin: 10,
    color: Colors.secondary,
    fontSize: RFValue(23),
    textAlign: "center",
    fontWeight: "bold",
  },
  statusReadyText: {
    margin: 10,
    color: Colors.darkGreen,
    fontSize: RFValue(23),
    textAlign: "center",
    fontWeight: "bold",
  },
  rowHeader: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  trackingText: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    color: Colors.darkestGrey,
  },

  paymentDetails: {
    paddingTop: 3,
    flexDirection: "row",
    width: 80,
  },

  date: {
    paddingTop: 10,
  },
  address: {
    paddingTop: 5,
    paddingBottom: 10,
    color: Colors.darkGray,
    fontSize: RFValue(13),
  },
  button__group: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 30,
  },

  accept__button: {
    flexDirection: "row",
    width: "60%",
    padding: RFValue(12),
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginRight: 15,
  },

  button: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    padding: isTablet ? RFValue(14) : RFValue(12),

    // width: "15%",
    borderRadius: 10,
    marginRight: 5,
  },

  report__button: {
    backgroundColor: Colors.error,
  },
  // link__button: {
  //   backgroundColor: Colors.secondary,
  // },
  accept__button_text: {
    color: Colors.white,
    fontSize: RFValue(12),
  },

  details__container: {
    marginHorizontal: 10,
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

  picker__wrapper: {
    alignSelf: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.darkestGrey,
    marginVertical: 10,
  },
  timeIndicator: {
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: 100,
  },
  info__container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timer__text: {
    color: "white",
    backgroundColor: "#1080D0",
    paddingHorizontal: 23,
    paddingVertical: 5,
    borderRadius: 25,
    marginTop: -20,
    fontSize: RFValue(12),
  },

  note__container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "3%",
    marginBottom: RFValue(10),
  },
  note__color: {
    width: isTablet ? 40 : 20,
    height: isTablet ? 30 : 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    marginRight: 15,
  },
  note__text: {
    fontSize: RFValue(13),
    width: "90%",
  },
});
