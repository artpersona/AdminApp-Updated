import React, {createContext, useContext, useState, useEffect} from 'react';
import {FirebaseContext} from './FirebaseContext';
import {AuthContext} from './AuthContext';
export const LocationContext = createContext();

const OrderProvider = ({children}) => {
  const {userInfoStore, loggedUser} = useContext(AuthContext);
  const {database} = useContext(FirebaseContext);
  const [refLocations, setRefLocations] = useState([]);

  const updateRefLoc = (data, updates) => {
    return new Promise((resolve, reject) => {
      const locationRef = database().ref(
        `categories/${String(userInfoStore)}/location/${data.key}`,
      );
      locationRef
        .update(updates)
        .then(() => {
          resolve();
        })
        .catch(err => reject(err));
    });
  };

  const fetchLocation = () => {
    const locationRef = database()
      .ref('categories/' + String(userInfoStore) + '/location')
      .orderByChild('name');
    locationRef.on('value', snapshot => {
      const locationObject = (snapshot && snapshot.val()) || {};

      const locationArray =
        (locationObject &&
          Object.entries(locationObject) &&
          Object.entries(locationObject).length &&
          Object.entries(locationObject).map(item => {
            item[1].key = item[0];
            return item[1];
          })) ||
        [];

      setRefLocations(locationArray);
    });
  };

  useEffect(() => {
    fetchLocation();
  }, [userInfoStore, loggedUser]);

  const payload = {refLocations, fetchLocation, updateRefLoc};
  return (
    <LocationContext.Provider value={payload}>
      {children}
    </LocationContext.Provider>
  );
};

export default OrderProvider;
