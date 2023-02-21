import {Platform, StyleSheet} from 'react-native';
import Colors from './Colors';
import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
// button theme
const buttonBorderRadius = 20;
const buttonHeight = RFValue(40);
const buttonWidth = 323;

// extra theme
const boxRadius = 50;

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  buttonPrimary: {
    backgroundColor: Colors.primary,
    borderRadius: buttonBorderRadius,
    padding: '5%',
  },
  buttonDisabled: {
    backgroundColor: Colors.darkGray,
    borderRadius: buttonBorderRadius,
    height: buttonHeight,
  },
  buttonFacebook: {
    backgroundColor: '#45489B',
    borderRadius: buttonBorderRadius,
    height: buttonHeight,
    justifyContent: 'space-around',
  },

  buttonGoogle: {
    backgroundColor: '#E13F2A',
    borderRadius: buttonBorderRadius,
    height: buttonHeight,
    justifyContent: 'space-around',
  },

  buttonPhone: {
    backgroundColor: Colors.secondary,
    borderRadius: buttonBorderRadius,
    height: buttonHeight,
    justifyContent: 'space-around',
  },

  buttonAdmin: {
    backgroundColor: Colors.darkGray,
    borderRadius: buttonBorderRadius,
    height: buttonHeight,
    justifyContent: 'space-around',
  },

  buttonSecondary: {
    backgroundColor: Colors.secondary,
    borderRadius: buttonBorderRadius,
    height: buttonHeight,
  },
  buttonTextPrimary: {
    fontStyle: 'normal',
    fontSize: RFValue(24),
    // lineHeight: 28,
  },
  buttonTitle: {
    alignItems: 'center',
    fontSize: RFValue(24),
  },
  center: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  space_between: {
    marginLeft: -30,
  },
  container: {
    marginHorizontal: 20,
    paddingBottom: 30,
  },
  inputContainer: {
    backgroundColor: 'white',
    height: 45,
    top: 9,
    marginBottom: 3,
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1,
  },
  inputBorderedContainer: {
    backgroundColor: 'white',
    borderColor: '#DADADA',
    borderWidth: 1,
    top: 9,
    marginBottom: 3,
  },
  inputHalfContainer: {
    backgroundColor: 'white',
    borderColor: '#DADADA',
    borderWidth: 1,
    height: 40,
    top: 9,
    width: 150,
  },
  isHalf: {
    width: '50%',
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  isFull: {
    width: '100%',
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  isQuarter: {
    width: '25%',
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  isThreeFourths: {
    width: '75%',
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  isSixtyPercent: {
    width: '60%',
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  isFortyPercent: {
    width: '30%',
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  headerText: {
    fontSize: RFValue(24),
    textAlign: 'center',
    color: '#434343',
    fontWeight: '700',
    paddingBottom: '10%',
    paddingLeft: 10,
  },
  labelStyle: {
    color: Colors.header,
    fontWeight: '500',
    fontSize: RFValue(14),
    // lineHeight: 14,
  },
  listTitle: {
    fontFamily: 'OpenSans_bold',
    color: '#000000',
    fontSize: RFValue(14),

    paddingHorizontal: 20,
    // lineHeight: 21,
  },
  listTitleSmall: {
    fontFamily: 'OpenSans',
    color: '#FFBE30',
    fontSize: RFValue(12),
    paddingHorizontal: 20,
    // lineHeight: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  rowNoFlex: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
  },
  inputWrap: {
    flex: 1,
  },
  inputStyle: {
    marginHorizontal: 10,
  },
  inputContainerError: {
    backgroundColor: 'white',
    borderBottomColor: '#DADADA',
    // borderColor: "#DADADA",
    borderBottomWidth: 1,
    // borderWidth: 1,
    height: 40,
    top: 9,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowSpaceEvenly: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rowCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  rowWrap: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  screenInnerContainer: {
    flex: 7,
  },
  scrollView: {
    zIndex: 0,
    position: 'relative',
  },
  subText: {
    fontSize: RFValue(14),
    fontWeight: '300',
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#9D9D9D',
  },
  overlayBg: {
    backgroundColor: Colors.overlay,
  },
  noData: {
    alignSelf: 'center',
    fontSize: RFValue(18),
    // lineHeight: 21,
    fontWeight: '300',
    color: Colors.subText,
  },
  listTitleLarge: {
    fontSize: RFValue(18),
    fontFamily: 'OpenSans_bold',
    color: 'black',
    // lineHeight: 42,
    height: 42,
    alignSelf: 'baseline',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
  },
  horizontalScrollView: {
    marginVertical: 20,
    // marginRight: 20,
  },

  dropShadow: {
    shadowColor: Colors.darkGray,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  dropShadowLight: {
    shadowColor: Colors.darkGray,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  lightBorder: {
    borderColor: Colors.lightGray,
    borderWidth: 0.5,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  searchComponentContainer: {
    top: 70,
    width: '100%',
    marginTop: 30,
    position: 'absolute',
    marginLeft: '2%',
  },
  searchIcon: {
    // paddingRight: 10,
    margin: 10,
    marginRight: 20,
  },
  getScreenWidth: Dimensions.get('window').width,
  getScreenHeight: Dimensions.get('window').height,
  keyboardVerticalOffset: Platform.OS === 'ios' ? 40 : 0,
});
