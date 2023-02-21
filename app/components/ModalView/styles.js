import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../config';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default StyleSheet.create({
  modal_content_header: {
    // minHeight: Platform.OS === 'ios' ? Header.HEIGHT - 21 : Header.HEIGHT,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ececec',
    width: '100%',
    backgroundColor: '#0A8DF2',
  },
  th_row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  th_row_left: {
    flex: 1,
    marginLeft: 15,
  },
  th_row_center: {
    flex: 4,
    alignItems: 'center',
  },
  th_row_right: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 15,
  },
  title_text: {
    fontSize: 16,
    // fontFamily: 'Poppins-Medium',
    color: '#ffffff',
  },
  modal_container: {
    height,
    width,
    backgroundColor: 'rgba(0,0,0,0.30)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_view: {
    maxWidth: 400,
    minHeight: 100,
    padding: 18,
    borderRadius: 10,
    backgroundColor: '#F7FBFF',
  },
  modal_info_logo: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_info_title_text: {
    textAlign: 'center',
    fontSize: 16,
    // fontFamily: 'Poppins-Medium',
    fontWeight: '400',
    color: Colors.secondary,
  },
  modal_info_description_text: {
    textAlign: 'center',
    fontSize: 14,
    // fontFamily: 'Poppins-Regular',
    paddingTop: 5,
    marginVertical: 5,
    color: '#333',
  },
  modal_info_button_holder: {
    marginTop: 10,
    flexDirection: 'row',
  },
  modal_info_button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    minWidth: 75,
    borderRadius: 25,
    backgroundColor: Colors.primary,
  },
  modal_info_button_option: {
    backgroundColor: '#0A8DF2',
  },
  button_text: {
    fontSize: 14,
    // fontFamily: 'Poppins-Medium',
    color: '#ffffff',
  },
  modal_loading: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    maxWidth: 350,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  ml_inner: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processing_text: {
    // fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
});
