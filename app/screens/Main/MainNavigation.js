import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {LoginScreens} from '../Auth';

import AdminHomeScreen from '../AdminHomeScreen/AdminHomeScreen';
import {AuthContext} from '../../shared/contexts/AuthContext';

function MainNavigation() {
  const Stack = createStackNavigator();
  const {loggedUser, userInfoRole, getAdminProfile, getCustomerProfile} =
    useContext(AuthContext);

  return (
    <Stack.Navigator
      initialRouteName={loggedUser != null ? 'Admin' : 'LogIn'}
      screenOptions={{animationEnabled: false, headerShown: false}}>
      {loggedUser ? (
        <Stack.Screen name="Admin">
          {props => <AdminHomeScreen {...props} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="LogIn" component={LoginScreens} />
      )}
    </Stack.Navigator>
  );
}

export default MainNavigation;
