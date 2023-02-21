import React, {useState, useEffect, useRef} from 'react';

import {View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Colors, Theme} from '../../config';

import {useNavigation} from '@react-navigation/native';
// import HeaderSearch from "../HeaderSearch/HeaderSearch";

function CustomHeaderButton(props) {
  const navigation = useNavigation();

  return (
    <>
      {props.showBackButton && (
        <View
          style={{
            top: '20%',
            paddingHorizontal: 10,
            position: 'absolute',
            // zIndex: 2,
            marginLeft: 10,
            marginTop: 25,
          }}>
          <TouchableOpacity
            transparent
            activeOpacity={0.5}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              name="chevron-left"
              size={40}
              color={Colors.darkGray}
              style={{marginLeft: 30, margin: 30}}
            />
          </TouchableOpacity>
        </View>
      )}

      <View
        style={{
          top: '20%',
          paddingHorizontal: 10,
          position: 'absolute',
          right: 0,
          zIndex: 1,
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Icon
            name="menu"
            size={40}
            color={Colors.darkGray}
            style={{marginRight: 10, margin: 30}}
          />
        </TouchableOpacity>
      </View>

      {/* END:: Back button and drawer */}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    top: '5%',
    // paddingLeft: 47,
    paddingHorizontal: 10,
    // paddingRight: 37,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    height: 171,
    paddingTop: 15,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  // textWelcome: {
  //   fontSize: 24,
  //   color: "#fff",
  //   fontWeight: "500",
  //   lineHeight: 42,
  //   width: 160,
  //   height: 42,
  //   left: 32,
  //   top: 84,
  //   alignSelf: "flex-start",
  // },
  headerContainer: {
    height: '90%',
    paddingTop: 15,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  textWelcome: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '500',
    lineHeight: 42,
    marginHorizontal: 32,
    alignSelf: 'baseline',
    justifyContent: 'flex-end',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 44.5,
    height: 60,
    // width: "50%",
    marginHorizontal: 15,
    // justifyContent: "center",
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
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
    fontWeight: '700',
    backgroundColor: 'white',
    marginLeft: 15,
    fontWeight: '100',
    fontSize: 18,
    lineHeight: 21,
  },

  // Search bar styles
});

export default CustomHeaderButton;
