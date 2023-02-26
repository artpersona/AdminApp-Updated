import React, {createContext, useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {FirebaseContext} from './FirebaseContext';

import {Alert} from 'react-native';
import Storage from '../../utils/files/Storage';

export const AuthContext = createContext();
const AuthProvider = ({children}) => {
  const {auth, database} = useContext(FirebaseContext);

  const [userCategory, setUserCategory] = useState();

  const [userBranch, setUserBranch] = useState();
  const [userInfoRole, setUserInfoRole] = useState();
  const [userInfoStore, setUserInfoStore] = useState();
  const [store_id, setStore_ID] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [token, setToken] = useState('');

  const adminAuth = (email, password) => {
    return new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async res => {
          console.log('res is: ', res);
          resolve('success!');
        })
        .catch(error => reject(error));
    });
  };

  const getAdminProfile = user => {
    if (user) {
      user
        .getIdToken()
        .then(function (idToken) {
          Storage.save('token', idToken);
          setToken(idToken);
        })
        .catch(err => {
          reject();
          Alert.alert('Sorry something went wrong', err.message);
        });

      const userRef = database().ref('user');
      userRef
        .orderByChild('email')
        .equalTo(user.email)
        .on('value', snapshot => {
          const userObject = (snapshot && snapshot.val()) || {};

          // registerForPushNotificationsAsync(Object.keys(userObject)[0]);

          const userRole =
            (userObject &&
              Object.entries(userObject) &&
              Object.entries(userObject).length &&
              Object.entries(userObject).map(item => {
                item[1].key = item[0];
                return item[1]['role'];
              })) ||
            [];

          const userName =
            (userObject &&
              Object.entries(userObject) &&
              Object.entries(userObject).length &&
              Object.entries(userObject).map(item => {
                item[1].key = item[0];
                return item[1]['name'];
              })) ||
            [];

          const userStore =
            (userObject &&
              Object.entries(userObject) &&
              Object.entries(userObject).length &&
              Object.entries(userObject).map(item => {
                item[1].key = item[0];
                return item[1]['store_id'];
              })) ||
            [];

          const _userBranch =
            (userObject &&
              Object.entries(userObject) &&
              Object.entries(userObject).length &&
              Object.entries(userObject).map(item => {
                item[1].key = item[0];
                return item[1]['branch_key'];
              })) ||
            [];

          const adminProfile = {
            photoURL: user.photoURL,
            displayName: userName[0],
            email: user.email,
            uid: user.uid,
            role: userRole,
          };

          setUserBranch(_userBranch);
          setUserInfoStore(userStore);
          setUserInfoRole(userRole);

          Storage.save('role', userRole);
          Storage.save('store_id', userStore);
          Storage.save('profile', adminProfile);
          setLoggedUser(adminProfile);
        });
    }
  };

  const fetchBranchDetails = async () => {
    await database()
      .ref('branch')
      .orderByKey()
      .equalTo(String(userBranch))
      .once('value')
      .then(snapshot => {
        snapshot.forEach(item => {
          setStore_ID(item.val().store_key);
        });
      })
      .catch(error => console.log(error));
  };

  const initAuth = async () => {
    const getProfileData = await Storage.get('profile');
    const getToken = await Storage.getToken('token');
    if (getProfileData && getToken) {
      setLoggedUser(getProfileData);
      setToken(getToken);
    }
  };

  useEffect(() => {
    auth().onAuthStateChanged(user => getAdminProfile(user));
  }, []);

  // const registerForPushNotificationsAsync = async user => {
  //   let token;

  //   const {status: existingStatus} = await Notifications.getPermissionsAsync();
  //   let finalStatus = existingStatus;
  //   if (existingStatus !== 'granted') {
  //     const {status} = await Notifications.requestPermissionsAsync();
  //     finalStatus = status;
  //   }
  //   if (finalStatus !== 'granted') {
  //     alert('Failed to get push token for push notification!');
  //     return;
  //   }
  //   token = (await Notifications.getExpoPushTokenAsync()).data;
  //   let updates = {};
  //   updates['/expoToken'] = token;
  //   database.ref('user').child(user).update(updates);

  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }

  //   return token;
  // };

  useEffect(() => {
    initAuth();
  }, []);

  useEffect(() => {
    if (userInfoRole == 'branch_admin') {
      fetchBranchDetails();
    }
  }, [loggedUser]);

  // useEffect(() => {
  //  setStoreID(userInfoRole == "branch_admin" ? String(store_id) : String(userInfoStore));

  // },[userInfoRole, store_id, userInfoStore])

  const payload = {
    userCategory,
    setUserCategory,

    userInfoRole,
    userInfoStore,
    setUserInfoRole,
    setUserInfoStore,
    userBranch,

    getAdminProfile,

    auth,
    adminAuth,

    initAuth,
    loggedUser,
    setLoggedUser,
    token,
    setToken,

    store_id,
    fetchBranchDetails,
  };

  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
};

AuthProvider.defaultProps = {};

AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default React.memo(AuthProvider);
