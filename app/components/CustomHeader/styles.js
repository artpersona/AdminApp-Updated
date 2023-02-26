import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {Colors} from '../../config';

import {RFValue} from 'react-native-responsive-fontsize';
import {isTablet} from '../../utils/device.utility';
const d = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    zIndex: 4,
    height: isTablet ? 90 : 55,
    backgroundColor: '#1080D0',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight,
  },
  wrapper: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',

    alignItems: 'center',
  },
  action__wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noBackground: {
    zIndex: 4,
    height: 70,
    justifyContent: 'center',
  },
  textWelcome: {
    fontSize: RFValue(24),
    color: 'black',
    fontWeight: '500',
    lineHeight: 42,
    height: 42,
    alignSelf: 'baseline',
    justifyContent: 'flex-end',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: Colors.white,

    borderRadius: 13,
    height: 60,
    marginHorizontal: 15,
    shadowColor: Colors.darkGray,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  filterContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 44.5,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 15,
    fontWeight: '100',
    fontSize: RFValue(18),

    // padding: 10,
    // lineHeight: 34
  },
  linearGradient: {
    borderRadius: 40,
    height: 200,
    marginTop: -40,
  },
  searchComponentContainer: {
    top: 90,
    paddingHorizontal: 10,
    position: 'absolute',
    flex: 1,
  },
  searchIcon: {
    // paddingRight: 10,
    margin: 10,
    marginRight: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    top: -40,
    marginHorizontal: 20,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
  },

  deliver__text: {
    fontFamily: 'OpenSans_semiBold',
    fontSize: RFValue(11),
  },
  area__text: {
    fontFamily: 'OpenSans',
    fontSize: RFValue(10),

    color: '#F28900',
    marginRight: 3,
  },
  page__header: {
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: -10,
  },
  header__text: {
    fontSize: RFValue(15),

    fontFamily: 'OpenSans',
    color: 'white',
  },

  cart__container: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },

  cart__text: {
    fontFamily: 'OpenSans_bold',
    fontSize: RFValue(8),

    color: 'white',
  },
  count__container: {
    backgroundColor: '#FF0000',
    borderRadius: 100,
    width: RFValue(15),
    height: RFValue(15),
    alignItems: 'center',
    justifyContent: 'center',
    top: -15,
    left: -10,
  },
  clickable__area: {
    paddingRight: RFValue(20),
  },
});
