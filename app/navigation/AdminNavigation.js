import React, {useContext} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import UserManagement from '../screens/AdminManagementScreen/UserManagementScreen/UserManagementScreen';
import InventoryManagement from '../screens/AdminManagementScreen/InventoryManagementScreen/InventoryManagementScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../config';

const Tab = createMaterialBottomTabNavigator();

const AdminNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="User Management"
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
        name="User Management"
        component={UserManagement}
        options={{
          tabBarLabel: 'User Management',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account-group"
              size={28}
              color={Colors.secondary}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Inventory Management"
        component={InventoryManagement}
        options={{
          tabBarLabel: 'Inventory Management',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="warehouse"
              size={24}
              color={Colors.secondary}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default React.memo(AdminNavigation);
