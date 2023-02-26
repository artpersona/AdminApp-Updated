import React, {useContext, useState} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import LinearGradient from 'react-native-linear-gradient';
import {View, Image, Button, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './styles';
import Storage from '../../utils/files/Storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../shared/contexts/AuthContext';

import {ModalLoading} from '../../components/ModalView/ModalView';
import AwesomeAlert from 'react-native-awesome-alerts';

function CustomDrawerContent(props) {
  const {state, descriptors, navigation, style} = props;
  let lastGroupName = '';
  let newGroup = true;

  const {
    loggedUser,
    setToken,
    setLoggedUser,
    setUserInfoRole,
    setUserInfoStore,
  } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [confirmAlert, setConfirmAlert] = useState(false);

  const logOut = async () => {
    setUserInfoRole(null);
    setIsLoading(true);
    await Storage.removeUserData();
    try {
      setLoggedUser(null);
      await Storage.removeItem('role');
      await Storage.removeItem('store_id');
      // await firebase.auth().signOut();

      navigation.reset({index: 0, routes: [{name: 'LogIn'}]});
    } catch (e) {
      console.log(e);
    }
    setToken('');
  };

  return (
    <LinearGradient colors={['#FEC636', '#FEC636']} style={{flex: 1}}>
      <View style={styles.iconContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            transparent
            activeOpacity={0.5}
            onPress={() => navigation.closeDrawer()}>
            <Icon
              name="chevron-left"
              size={40}
              color="#FFF"
              style={(styles.closeIcon, style)}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileContainer}>
        {loggedUser ? (
          <>
            <View style={styles.imageContainer}>
              <Image
                source={
                  loggedUser.photoURL
                    ? {
                        uri: loggedUser.photoURL,
                      }
                    : require('../../assets/avatar/noimage.jpg')
                }
                style={styles.image}
              />
            </View>

            <View style={styles.drawerItemContainer}>
              <Text style={styles.userName}>{loggedUser.displayName}</Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.loginText}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  navigation.navigate('Signup');
                  navigation.closeDrawer();
                }}>
                <Text style={styles.userName}>Login </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      <View style={styles.border} />

      {loggedUser ? (
        <DrawerContentScrollView {...props} style={{paddingHorizontal: 20}}>
          {state.routes.map((route, index) => {
            const {drawerLabel, activeTintColor, groupName} =
              descriptors[route.key].options;

            if (lastGroupName !== groupName) {
              newGroup = true;
              lastGroupName = groupName;
            } else newGroup = false;
            return (
              <React.Fragment key={route.key}>
                {newGroup ? (
                  <View style={styles.sectionContainer} key={index}>
                    <Text key={groupName} style={styles.sectionHeader}>
                      {groupName}
                    </Text>
                    {groupName && <View style={styles.sectionLine} />}
                  </View>
                ) : null}
                <DrawerItem
                  key={route.key}
                  label={`${drawerLabel}`}
                  labelStyle={styles.labelStyle}
                  focused={
                    state.index ===
                    state.routes.findIndex(e => e.name === route.name)
                  }
                  activeTintColor={activeTintColor}
                  onPress={() => navigation.navigate(route.name)}
                />
              </React.Fragment>
            );
          })}

          {/* <DrawerItemList {...props} labelStyle={styles.labelStyle} /> */}
          <DrawerItem
            label="Log Out"
            labelStyle={styles.labelStyle}
            onPress={() => setConfirmAlert(true)}
          />
        </DrawerContentScrollView>
      ) : null}

      <ModalLoading visible={isLoading} loading message={'Logging Out'} />

      <AwesomeAlert
        show={confirmAlert}
        showProgress={false}
        title="Confirm Logout ?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        cancelButtonColor={'red'}
        confirmText="Confirm"
        confirmButtonColor="#63a34b"
        onCancelPressed={() => {
          setConfirmAlert(false);
        }}
        onConfirmPressed={logOut}
      />
    </LinearGradient>
  );
}

export default React.memo(CustomDrawerContent);
