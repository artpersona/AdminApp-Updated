import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ManageShoppersScreen from './ManageShoppersScreen';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import ManageBranchAdminsScreen from './ManageBranchAdminsScreen';
import ManageResellersScreen from './ManageResellersScreen';

const Tab = createMaterialTopTabNavigator();

function UserManagementScreen() {
  return (
    <>
      <CustomHeader />
      <Tab.Navigator
        screenOptions={{
          lazy: true,
          tabBarLabelStyle: {
            fontSize: 12,
            margin: 0,
            padding: 0,
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#F79346',
          },
        }}>
        <Tab.Screen name="Shoppers" component={ManageShoppersScreen} />
        <Tab.Screen name="Branch Admins" component={ManageBranchAdminsScreen} />
        <Tab.Screen name="Resellers" component={ManageResellersScreen} />
      </Tab.Navigator>
    </>
  );
}

export default UserManagementScreen;
