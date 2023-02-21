import React from "react";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ReadyScreen from "./TransactionOptions/ReadyScreen";
import OnTransitScreen from "./TransactionOptions/OnTransitScreen";
import DeliveredScreen from "./TransactionOptions/DeliveredScreen";
import CancelledScreen from "./TransactionOptions/CancelledScreen";

const Tab = createMaterialTopTabNavigator();

function OrderTransactions() {

  return (
    <>
      <CustomHeader />
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize: 12,
            margin: 0,
            padding: 0,
          },
          indicatorStyle: {
            backgroundColor: "#F79346",
          },
        }}
        lazy={true}
      >
        <Tab.Screen name="Ready" component={ReadyScreen} />
        <Tab.Screen name="On Transit" component={OnTransitScreen} />
        <Tab.Screen name="Delivered" component={DeliveredScreen} />
        <Tab.Screen name="Cancelled" component={CancelledScreen} />
      </Tab.Navigator>
    </>
  );
}

export default React.memo(OrderTransactions);
