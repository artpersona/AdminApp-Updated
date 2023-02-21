import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { deviceHeight, deviceWidth } from "../../utils/device.utility";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  wrapper: {
    width: "95%",
    backgroundColor: "white",
    alignSelf: "center",
  },

  header: {
    marginHorizontal: 10,
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  shop__table: {
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "95%",
    marginVertical: "5%",
  },

  shop__headers: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    padding: 8,
  },

  shop__content: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 2,
    borderBottomColor: "whitesmoke",
  },
  header__text: {
    fontSize: RFValue(15),
    fontWeight: "bold",
  },

  item__1: {
    width: "75%",
    fontSize: RFValue(14),
  },
  item__2: {
    width: "30%",
    alignItems: "center",
    marginLeft: RFValue(-15),
  },

  item: {
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "whitesmoke",
    backgroundColor: "white",
  },
  options__container: {
    flexDirection: "row",
  },
  imager__container: {
    height: deviceHeight / 6,
    width: deviceHeight / 6,
    marginRight: "10%",
  },
  icon: {
    marginLeft: "10%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  upload__container: {
    backgroundColor: "white",
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "whitesmoke",

    width: "80%",
    alignSelf: "center",
  },

  upload__medium: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: "whitesmoke",
  },
  upload__icon: {
    marginHorizontal: 5,
    marginRight: 10,
  },
  upload__modify: {
    marginTop: -29,
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
    borderWidth: 1,
    borderColor: "whitesmoke",
  },
  draggable__container: {
    borderWidth: 1,
    borderColor: "whitesmoke",
  },
  draggable__header: {
    width: "100%",
    backgroundColor: "#FAFAFA",
    padding: 8,
  },
});
