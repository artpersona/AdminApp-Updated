import React, {useContext} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MyOrders from '../screens/MyOrdersScreen/MyOrders';
import OrderTransactions from '../screens/OrderTransactionsScreen/OrderTransactions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../config';
import {OrderContext} from '../shared/contexts/OrderContext';

const Tab = createMaterialBottomTabNavigator();
const OrdersNavigation = () => {
  const {newOrders} = useContext(OrderContext);
  return (
    <Tab.Navigator
      initialRouteName="Active Orders"
      activeColor={Colors.secondary}
      barStyle={{
        backgroundColor: 'white',
        borderWidth: 2,
        borderTopColor: 'whitesmoke',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderBottomColor: 'transparent',
      }}
      tabBarOptions={{
        style: {
          elevation: 0, // for Android
          shadowOffset: {
            width: 0,
            height: 0, // for iOS
          },
          height: 500,
        },
      }}
      lazy={true}>
      <Tab.Screen
        name="Active Orders"
        component={MyOrders}
        options={{
          tabBarLabel: 'Active Orders',
          tabBarBadge: newOrders.length > 0 ? `${newOrders.length}` : null,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="food"
              size={28}
              color={Colors.secondary}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={OrderTransactions}
        options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="receipt"
              size={24}
              color={Colors.secondary}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default React.memo(OrdersNavigation);
