import React, {createContext, useContext, useState, useEffect} from 'react';
import {FirebaseContext} from './FirebaseContext';
import {AuthContext} from './AuthContext';

export const BranchContext = createContext();
const BranchProvider = ({children}) => {
  const {database} = useContext(FirebaseContext);
  const {userBranch, userInfoStore, loggedUser} = useContext(AuthContext);
  const [store_id, setStoreID] = useState(null);
  const [storeBranches, setStoreBranches] = useState(null);
  const [branchRiders, setBranchRiders] = useState([]);
  const [riderGroups, setRiderGroups] = useState([]);
  const fetchBranchDetails = () => {
    const branchRef = database()
      .ref('branch')
      .orderByKey()
      .equalTo(String(userBranch));

    branchRef
      .once('value')
      .then(snapshot => {
        snapshot.forEach(item => {
          setStoreID(item.val().store_key);
        });
      })
      .catch(err => console.log(err));
  };

  const fetchBranches = async () => {
    const branchRef = await database()
      .ref('branch')
      .orderByChild('store_key')
      .equalTo(String(userInfoStore));

    branchRef.on('value', snapshot => {
      const branchesObject = (snapshot && snapshot.val()) || {};
      let branchesArray =
        (branchesObject &&
          Object.entries(branchesObject) &&
          Object.entries(branchesObject).length &&
          Object.entries(branchesObject).map(item => {
            item[1].key = item[0];
            return item[1];
          })) ||
        [];

      setStoreBranches(branchesArray);
    });
  };

  const fetchBranchRiders = () => {
    const ridersRef = database()
      .ref('riders')
      .orderByChild('branchId')
      .equalTo(String(userBranch));

    ridersRef.on('value', snapshot => {
      const ridersObject = (snapshot && snapshot.val()) || {};
      let ridersArray =
        (ridersObject &&
          Object.entries(ridersObject) &&
          Object.entries(ridersObject).length &&
          Object.entries(ridersObject).map(item => {
            item[1].key = item[0];
            return item[1];
          })) ||
        [];
      setBranchRiders(ridersArray);
    });
  };

  const fetchRiderGroups = () => {
    const ridersRef = database().ref('riders').orderByChild('affiliation');

    ridersRef.on('value', snapshot => {
      const ridersObject = (snapshot && snapshot.val()) || {};
      const riderGroupSet = new Set();
      let ridersArray =
        (ridersObject &&
          Object.entries(ridersObject) &&
          Object.entries(ridersObject).length &&
          Object.entries(ridersObject).map(item => {
            item[1].key = item[0];
            return item[1];
          })) ||
        [];

      ridersArray.map(item => {
        if (item?.affiliation) {
          riderGroupSet.add(item?.affiliation);
        }
      });
      let array = Array.from(riderGroupSet);
      setRiderGroups(array);
    });
  };

  useEffect(() => {
    // fetchBranchDetails();
    fetchBranches();
    fetchBranchRiders();
    fetchRiderGroups();
  }, [loggedUser]);

  // removed loggedUser

  const payload = {
    store_id,
    setStoreID,
    fetchBranchDetails,
    fetchBranchRiders,
    storeBranches,
    fetchBranches,
    branchRiders,
    riderGroups,
  };

  return (
    <BranchContext.Provider value={payload}>{children}</BranchContext.Provider>
  );
};

export default React.memo(BranchProvider);
