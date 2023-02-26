import React, {useContext} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MyOrders from '../screens/MyOrdersScreen/MyOrders';
import OrderTransactions from '../screens/OrderTransactionsScreen/OrderTransactions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../config';
import {OrderContext} from '../shared/contexts/OrderContext';
import {Provider as PaperProvider} from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();
const OrdersNavigation = () => {
  const {newOrders} = useContext(OrderContext);
  return (
    // <PaperProvider
    //   theme={{
    //     colors: {
    //       primary: 'white',
    //       onPrimary: 'white',
    //       primaryContainer: 'red',
    //       onPrimaryContainer: 'red',
    //       secondary: 'red',
    //       onSecondary: 'red',
    //       secondaryContainer: 'transparent',
    //       onSecondaryContainer: 'rgb(5, 31, 35)',
    //     },
    //   }}>
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
      screenOptions={{
        lazy: true,
        tabBarLabelStyle: {
          fontSize: 12,
          margin: 0,
          padding: 0,
        },
      }}>
      <Tab.Screen
        name="Active Orders"
        component={MyOrders}
        options={{
          tabBarLabel: 'Active Orders',
          tabBarBadge: newOrders.length > 0 ? `${newOrders.length}` : null,
          tabBarColor: 'red',
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
    // </PaperProvider>
  );
};
export default React.memo(OrdersNavigation);
