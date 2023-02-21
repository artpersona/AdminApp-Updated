import React, {createContext, useContext, useState, useEffect} from 'react';
import {FirebaseContext} from './FirebaseContext';
import {AuthContext} from './AuthContext';
export const StoreMenuContext = createContext();

const StoreMenuProvider = ({children}) => {
  const {userInfoRole, store_id, userInfoStore, loggedUser} =
    useContext(AuthContext);
  const {database, storage} = useContext(FirebaseContext);

  const [store, setStore] = useState(null);

  const fetchStore = () => {
    const storeID =
      userInfoRole == 'branch_admin' ? String(store_id) : String(userInfoStore);
    const shopRef = database().ref('categories').orderByKey().equalTo(storeID);

    shopRef.on('value', snapshot => {
      const shopObject = (snapshot && snapshot.val()) || {};
      let newData = [];
      Object.entries(shopObject).forEach(([key, value]) => {
        newData = [
          ...newData,
          {
            id: key,
            ...value,
          },
        ];
      });
      console.log('new data is: ', newData);
      setStore(newData[0]);
    });
  };

  const updateStoreStatus = (store, status) => {
    return new Promise((resolve, reject) => {
      store.storeOpen = status;
      let updates = {};
      updates[`categories/` + store.key] = store;

      database()
        .ref()
        .update(updates)
        .then(res => {
          resolve();
        })
        .catch(error => {
          console.log('error is: ', error);
          reject(error);
        });
    });
  };

  const removeBannerImage = index => {
    return new Promise((resolve, reject) => {
      const tempBanners = [...store.store_banners];
      delete tempBanners[index].uri;
      let updates = {};
      updates[`categories/` + store.key + `/store_banners`] = tempBanners;
      database()
        .ref()
        .update(updates)
        .then(res => {
          resolve();
        })
        .catch(error => {
          console.log('error is: ', error);
          reject(error);
        });
    });
  };

  const changeBannerImagesPositioning = data => {
    return new Promise((resolve, reject) => {
      let updates = {};
      updates[`categories/` + store.key + `/store_banners`] = data;
      database()
        .ref()
        .update(updates)
        .then(res => {
          resolve();
        })
        .catch(error => {
          console.log('error is: ', error);
          reject(error);
        });
    });
  };

  const addOrEditImage = (image, index) => {
    console.log('image is: ', image);
    console.log('index is: ', index);
    return new Promise((resolve, reject) => {
      uploadImage(image)
        .then(data => {
          console.log('pasok tang ina');
          const tempBanners = [...store.store_banners];
          tempBanners[index].uri = data;
          let updates = {};
          updates[`categories/` + store.key + `/store_banners`] = tempBanners;
          database()
            .ref()
            .update(updates)
            .then(res => {
              resolve();
            })
            .catch(error => {
              console.log('error is: ', error);
              reject(error);
            });
        })
        .catch(err => console.log('err is: ', err));
    });
  };

  const uploadImage = async image => {
    console.log('pasok sa upload lodi!');
    return new Promise(async (resolve, reject) => {
      const randNumber = Math.random();
      const fileName = `${image.name}${randNumber}`;
      const response = await fetch(image.uri);
      const blob = await response.blob();
      var ref = storage.ref().child(`images/${store.key}/${fileName}`);
      await ref.put(blob);

      ref
        .getDownloadURL()
        .then(url => {
          console.log('pasok ka dito lodicakes');
          resolve(url);
        })
        .catch(err => console.log(err));
    });
  };

  useEffect(() => {
    fetchStore();
  }, [userInfoRole, loggedUser, userInfoStore, store_id]);

  const payload = {
    store,
    updateStoreStatus,
    removeBannerImage,
    changeBannerImagesPositioning,
    addOrEditImage,
  };
  return (
    <StoreMenuContext.Provider value={payload}>
      {children}
    </StoreMenuContext.Provider>
  );
};

export default StoreMenuProvider;
