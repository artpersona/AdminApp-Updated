import { StyleSheet } from "react-native";
import { isTablet } from "../../utils/device.utility";
import { RFValue } from "react-native-responsive-fontsize";
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  search__container: {
    zIndex: 10,
  },
  search__section: {
    marginTop: isTablet ? 40 : 10,
    // marginBottom: 20,
    width: "86%",
    alignSelf: "center",
  },

  refLoc__text: {
    fontFamily: "OpenSans",
    fontSize: RFValue(11),
    // marginHorizontal: 10,
  },
  refLoc__container: {
    marginVertical: 15,
    height: isTablet ? 70 : 40,
    alignSelf: "center",
    // zIndex: 10,
    width: "86%",
  },

  refLoc__dropdown_text: {
    justifyContent: "flex-start",
    fontFamily: "OpenSans",
    fontSize: RFValue(11),
    color: "black",
  },
});
