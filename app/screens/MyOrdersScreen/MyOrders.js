import React, {useContext, useEffect, useState} from 'react';
import {View, SectionList} from 'react-native';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import _ from 'lodash';
import OrdersList from '../../components/ActiveOrders/OrdersLists';
import PendingList from '../../components/PendingOrders/PendingList';
import {OrderContext} from '../../shared/contexts/OrderContext';
import NetInfo from '@react-native-community/netinfo';
import ModalView from '../../components/ModalView/ModalView';

import styles from './styles';
function MyOrders({navigation}) {
  const {newOrders, pendingOrders} = useContext(OrderContext);
  const [noNetModal, setNoNetModal] = useState(false);

  const keyExtract = index => index.toString();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setNoNetModal(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const renderItem = ({item, section}) => {
    if (section.type == 'row') {
      return (
        <View style={styles.newOrders__section}>
          <OrdersList newOrders={newOrders} />
        </View>
      );
    } else {
      return (
        <View style={styles.pending__section}>
          <PendingList pendingOrders={pendingOrders}></PendingList>
        </View>
      );
    }
  };

  const getNetInfo = () => {
    setNoNetModal(false);

    // To get the network state once
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setNoNetModal(true);
      } else {
        if (currentLocation != null) fetchAllRestaurants();
        setNoNetModal(false);
      }
    });
  };

  return (
    <>
      <CustomHeader />
      <View style={{flex: 1, backgroundColor: 'white', height: '100%'}}>
        <View style={styles.container}>
          <SectionList
            sections={[
              {type: 'row', data: [newOrders]},
              {type: 'column', data: [pendingOrders]},
            ]}
            renderItem={renderItem}
            keyExtractor={keyExtract}
            automaticallyAdjustContentInsets={false}
          />
        </View>
      </View>

      <ModalView
        visible={noNetModal}
        description="Can't connect to internet. Please refresh the app or try again later."
        // description="The server encountered an unexpected error. Please refresh the app or try again later."
        ok_text="Refresh"
        onPress1={getNetInfo}
        width="85%"
        title="Opps, something went wrong"
        animation="bounceIn"
        logoName="error"
        logoColor="#ffdd00"
      />
    </>
  );
}
export default React.memo(MyOrders);
