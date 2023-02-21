import { StyleSheet } from "react-native";
import { Colors } from "../../config";
import { RFValue } from "react-native-responsive-fontsize";

export default StyleSheet.create({
  buttonContainer: {
    top: "44%",
    paddingHorizontal: 10,
    position: "absolute",
    zIndex: 2,
  },
  iconContainer: {
    height: "12%",
  },
  profileContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignContent: "center",
    justifyContent: "center",
    height: 100,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    marginLeft: 10,
    alignSelf: "center",
  },
  imageContainer: {
    justifyContent: "center",
    width: "30%",
  },
  closeIcon: {
    marginRight: 10,
    margin: 10,
  },
  drawerItemContainer: {
    width: "70%",
    justifyContent: "center",
    justifyContent: "center",
    marginLeft: 15,
  },
  userName: {
    fontSize: RFValue(14),
    fontWeight: "500",
    color: Colors.white,
  },
  userClientId: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    lineHeight: 14,
    color: Colors.white,
    paddingBottom: 35,
  },
  labelStyle: {
    color: Colors.white,
    fontSize: RFValue(16),
    fontWeight: "normal",
  },
  border: {
    top: 10,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  loginText: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  logo: {
    width: "60%",
    height: 100,
    resizeMode: "contain",
    opacity: 0.2,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },

  sectionContainer: {
    flex: 1,
    marginTop: "2%",
  },
  sectionHeader: {
    color: Colors.white,
    fontSize: RFValue(18),
    fontWeight: "normal",
  },
  sectionLine: {
    backgroundColor: "white",
    width: "80%",
    height: 1,
    marginVertical: 5,
  },
});
