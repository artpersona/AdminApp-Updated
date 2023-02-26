import {StyleSheet} from 'react-native';
import {isTablet} from '../../utils/device.utility';
import {RFValue} from 'react-native-responsive-fontsize';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  search__container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: RFValue(10),
    marginTop: '5%',
    paddingHorizontal: '5%',
    paddingVertical: '1%',
    borderRadius: RFValue(10),
    elevation: 5,
  },
  search__section: {
    marginTop: isTablet ? 40 : 10,
    width: '86%',
    alignSelf: 'center',
  },

  refLoc__text: {
    fontFamily: 'OpenSans',
    fontSize: RFValue(11),
    // marginHorizontal: 10,
  },
  refLoc__container: {
    marginVertical: 15,
    height: isTablet ? 70 : 40,
    alignSelf: 'center',
    // zIndex: 10,
    width: '86%',
  },

  refLoc__dropdown_text: {
    justifyContent: 'flex-start',
    fontFamily: 'OpenSans',
    fontSize: RFValue(11),
    color: 'black',
  },
});
