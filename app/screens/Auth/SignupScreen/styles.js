import { StyleSheet } from "react-native";
import { Theme, Colors } from "../../../config";

export default StyleSheet.create({
  container: {
    top: "10%",
    paddingHorizontal: 40,
    backgroundColor: "white",
    height: "100%",
  },
  img: {
    width: 120,
    height: 120,
  },
  imageBackground: {
    flex: 1,
    width: Theme.getScreenWidth,
    height: Theme.getScreenHeight + 50,
    backgroundColor: "white",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
    bottom: 40,
  },
  textFooter: {
    fontWeight: "100",
    color: Colors.darkGray,
  },
  textLogin: {
    fontWeight: "bold",
    color: Colors.secondary,
  },
  buttonContainer: {
    marginVertical: 10,
  },

  iconContainer: {
    marginLeft: -100,
  },
});
