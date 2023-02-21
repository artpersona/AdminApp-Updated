import React, { useContext, useReducer, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreens } from "../Auth";

import AuthReducer from "../../reducers/AuthReducer";
import AdminHomeScreen from "../AdminHomeScreen/AdminHomeScreen";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { AuthContext } from "../../shared/contexts/AuthContext";

import { Storage } from "../../utils";

function MainNavigation() {
  const Stack = createStackNavigator();
  const { loggedUser, userInfoRole, getAdminProfile, getCustomerProfile } =
    useContext(AuthContext);

  const Auth = { isAuthenticated: false, token: null };

  const [state, dispatch] = useReducer(AuthReducer, Auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [initialUse, setInitialUse] = useState(false);
  useEffect(() => {
    let token = null;
    let profile = null;
    const refreshToken = async () => {
      try {
        token = await Storage.getToken();
        profile = await Storage.getProfile();

        if (profile) {
          getAdminProfile()
            .then(() => {
              setAuthenticated(true);
            })
            .catch((error) => console.log(error));

          dispatch({ type: "AUTHENTICATE", token: token });
        } else {
          setInitialUse(true);
         
        }
      } catch (e) {
        console.log(e);
        Alert.alert("Sorry something went wrong", e.message);
      }
    };
    refreshToken();
  }, []);

  if (initialUse) {
    return (
      <Stack.Navigator
        initialRouteName={loggedUser != null ? "Admin" : "LogIn"}
        screenOptions={{ animationEnabled: false, headerShown: false }}
      >
        <Stack.Screen name="Admin">
          {(props) => <AdminHomeScreen {...props} />}
        </Stack.Screen>
        {loggedUser == null && (
          <Stack.Screen name="LogIn" component={LoginScreens} />
        )}
      </Stack.Navigator>
    );
  } else {
    if (isAuthenticated) {
      return (
        <Stack.Navigator
          initialRouteName={loggedUser != null ? "Admin" : "LogIn"}
          screenOptions={{ animationEnabled: false, headerShown: false }}
        >
          <Stack.Screen name="Admin">
            {(props) => <AdminHomeScreen {...props} />}
          </Stack.Screen>
          {loggedUser == null && (
            <Stack.Screen name="LogIn" component={LoginScreens} />
          )}
        </Stack.Navigator>
      );
    } else {
      return <LoadingScreen />;
    }
  }
}

export default MainNavigation;
