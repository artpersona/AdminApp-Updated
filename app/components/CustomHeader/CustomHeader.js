import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import {RFValue} from 'react-native-responsive-fontsize';
// import { TouchableOpacity } from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native';

import styles from './styles';

function CustomHeader({showBackButton}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.action__wrapper}>
          {showBackButton && (
            <View style={styles.clickable__area}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon3
                  name="chevron-thin-left"
                  size={RFValue(24)}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          )}
          {!showBackButton && (
            <View style={styles.clickable__area}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  navigation.openDrawer();
                }}
                style={{padding: 5}}>
                <Icon name="navicon" size={RFValue(26)} color="white" />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.page__header}>
            <Text
              style={[
                styles.header__text,
                {color: '#FFBE30', fontFamily: 'OpenSans_bold'},
              ]}>
              Davao
            </Text>
            <Text style={[styles.header__text]}>Market</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

CustomHeader.defaultProps = {
  showBackButton: false,
};
export default CustomHeader;
