import {StyleSheet} from 'react-native';
import {Theme, Colors} from '../../../config';
import {RFValue} from 'react-native-responsive-fontsize';
import {deviceHeight} from '../../../utils/device.utility';
export default StyleSheet.create({
  placeholder_text: {
    fontSize: RFValue(10),
    fontFamily: 'Poppins-Regular',
    width: '85%',
  },
  container: {
    marginTop: deviceHeight * 0.1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  formContainer: {
    top: '10%',
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // position: "absolute",
    alignSelf: 'center',
    marginTop: '5%',
    // bottom: 40
  },
  textFooter: {
    fontWeight: '100',
    color: Colors.darkGray,
  },
  textForgotPass: {
    alignSelf: 'flex-end',
    color: Colors.header,
    marginBottom: '10%',
    paddingRight: 12,
    fontSize: RFValue(11),
  },
  textSignUp: {
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  passIcon: {
    position: 'absolute',
    padding: 32,
    right: 8,
    color: Colors.lightGray,
  },
  img: {
    width: 120,
    height: 120,
  },

  titleStyle: {
    fontSize: RFValue(15),
    alignSelf: 'center',
  },

  inputContainerStyle: {
    backgroundColor: 'white',
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1,
    height: RFValue(45),
    marginBottom: 3,
    top: 9,
  },
});
