import React, {useEffect, useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import CustomDrawerContent from '../../components/CustomDrawer/CustomDrawerContent';

// Screens
import OrdersNavigation from '../../navigation/OrdersNavigation';
import OrderDetails from '../OrderDetailsScreen/OrderDetails';
import RefLocation from '../RefLocationScreen/RefLocation';
import ProductManagement from '..//ProductManagementScreen/Products';
import ShopMenu from '../ShopMenu/ShopMenu';
import UserManagement from '../AdminManagementScreen/UserManagementScreen/UserManagementScreen';

import {AuthContext} from '../../shared/contexts/AuthContext';
import QRScanner from '../QRScannerScreen/QRScanner';
import {deviceWidth, isTablet} from '../../utils/device.utility';
import AdminNavigation from '../../navigation/AdminNavigation';
import ManageShoppersScreen from '../AdminManagementScreen/UserManagementScreen/ManageShoppersScreen';
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const AdminHomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Orders"
      screenOptions={{animationEnabled: false, headerShown: false}}>
      <HomeStack.Screen name="Orders">
        {page => <OrdersNavigation {...page} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="RefLocation">
        {page => <RefLocation {...page} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Products">
        {page => <ProductManagement {...page} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="ShopMenu">
        {page => <ShopMenu {...page} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="OrderDetails" component={OrderDetails} />
      <HomeStack.Screen name="QRScanner" component={QRScanner} />
    </HomeStack.Navigator>
  );
};

const AdminHomeStackScreen = () => {
  console.log('AdminHomeStackScreen is called');
  return (
    <AdminHomeStack.Navigator
      initialRouteName="Manage Admin"
      screenOptions={{animationEnabled: false, headerShown: false}}>
      <AdminHomeStack.Screen name="Manage Admin">
        {page => {
          return <AdminNavigation {...page} />;
        }}
      </AdminHomeStack.Screen>
    </AdminHomeStack.Navigator>
  );
};

function HomeScreen() {
  const {userInfoRole} = useContext(AuthContext);
  return (
    <Drawer.Navigator
      options={{
        unmountInactiveRoutes: true,
      }}
      screenOptions={{
        headerShown: false,
      }}
      drawerPosition={'left'}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: '#c6cbef',
        width: isTablet ? deviceWidth * 0.6 : deviceWidth * 0.75,
      }}>
      {/* admin ui */}
      {userInfoRole == 'admin' ? (
        <>
          <Drawer.Screen
            name="Admin Tools"
            options={{
              drawerLabel: 'Management',
              groupName: 'Admin Tools',
            }}>
            {page => <AdminHomeStackScreen {...page} />}
          </Drawer.Screen>
          {/* <Drawer.Screen
            name="Branch Admins"
            options={{
              drawerLabel: 'Branch Admins',
              groupName: 'User Management',
            }}>
            {page => <ManageShoppersScreen {...page} />}
          </Drawer.Screen>
          <Drawer.Screen
            name="Resellers"
            options={{
              drawerLabel: 'Resellers',
              groupName: 'User Management',
            }}>
            {page => <ManageShoppersScreen {...page} />}
          </Drawer.Screen> */}
        </>
      ) : (
        <>
          {/* default ui */}
          <Drawer.Screen
            name="My Orders"
            options={{
              drawerLabel: 'Orders',
              groupName: 'General',
            }}>
            {page => <HomeStackScreen {...page} />}
          </Drawer.Screen>
        </>
      )}

      {userInfoRole == 'branch_admin' && (
        <Drawer.Screen
          name="Products"
          options={{
            drawerLabel: 'Item Displayed',
            groupName: 'Products',
          }}
          component={ProductManagement}
        />
      )}

      {userInfoRole == 'reseller' && (
        <>
          <Drawer.Screen
            name="Shop"
            options={{
              drawerLabel: 'Shop',
              groupName: 'Manage',
            }}
            component={ShopMenu}
          />
          <Drawer.Screen
            name="Manage"
            component={RefLocation}
            options={{
              drawerLabel: 'Reference Location',
              groupName: 'Manage',
            }}
          />
          <Drawer.Screen
            name="Products"
            options={{
              drawerLabel: 'Item Displayed',
              groupName: 'Products',
            }}
            component={ProductManagement}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}

export default HomeScreen;
