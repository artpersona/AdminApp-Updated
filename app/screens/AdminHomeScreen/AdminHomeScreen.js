import React, { useEffect, useContext } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import CustomDrawerContent from "../../components/CustomDrawer/CustomDrawerContent";

// Screens
import OrdersNavigation from "../../navigation/OrdersNavigation";
import OrderDetails from "../OrderDetailsScreen/OrderDetails";
import RefLocation from "../RefLocationScreen/RefLocation";
import ProductManagement from "..//ProductManagementScreen/Products";
import ShopMenu from "../ShopMenu/ShopMenu";
import { AuthContext } from "../../shared/contexts/AuthContext";
import QRScanner from "../QRScannerScreen/QRScanner";
import { deviceWidth, isTablet } from "../../utils/device.utility";
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreen = (props) => {
  useEffect(() => {});
  return (
    <HomeStack.Navigator
      initialRouteName="Orders"
      screenOptions={{ animationEnabled: false, headerShown: false }}
    >
      <HomeStack.Screen name="Orders">
        {(page) => <OrdersNavigation {...page} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="RefLocation">
        {(page) => <RefLocation {...page} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Products">
        {(page) => <ProductManagement {...page} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="ShopMenu">
        {(page) => <ShopMenu {...page} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="OrderDetails" component={OrderDetails} />
      <HomeStack.Screen name="QRScanner" component={QRScanner} />
    </HomeStack.Navigator>
  );
};

function HomeScreen() {
  const { userInfoRole } = useContext(AuthContext);
  return (
    <Drawer.Navigator
      options={{
        unmountInactiveRoutes: true,
      }}
      drawerPosition={"left"}
      openByDefault={false}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "#c6cbef",
        width: isTablet ? deviceWidth * 0.6 : deviceWidth * 0.75,
      }}
    >
      <Drawer.Screen
        name="Orders"
        options={{
          drawerLabel: "Orders",

          groupName: "General",
        }}
      >
        {(page) => <HomeStackScreen {...page} />}
      </Drawer.Screen>

      {userInfoRole == "branch_admin" && (
        <Drawer.Screen
          name="Products"
          options={{
            drawerLabel: "Item Displayed",
            groupName: "Products",
          }}
          component={ProductManagement}
        />
      )}

      {userInfoRole == "reseller" && (
        <>
          <Drawer.Screen
            name="Shop"
            options={{
              drawerLabel: "Shop",
              groupName: "Manage",
            }}
            component={ShopMenu}
          />
          <Drawer.Screen
            name="Manage"
            component={RefLocation}
            options={{
              drawerLabel: "Reference Location",
              groupName: "Manage",
            }}
          />
          <Drawer.Screen
            name="Products"
            options={{
              drawerLabel: "Item Displayed",
              groupName: "Products",
            }}
            component={ProductManagement}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}

export default HomeScreen;
