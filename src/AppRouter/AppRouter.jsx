import React, { useEffect, useState } from "react";
import { RegistrationScreen } from "../../Screens/auth/RegistrationScreen";
import { LoginScreen } from "../../Screens/auth/LoginScreen";
import { HomeScreen } from "../../Screens/main/HomeScreen";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/authSellectors";
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "../../db/firebaseConfig";

export const AppRouter = () => {
  const [isUserLogined, setIsUserLogined] = useState(auth.currentUser);

  const user = useSelector(selectUser);
  console.log("user :>> ", user);
  console.log("isUserLogined :>> ", isUserLogined);

  useEffect(() => {
    setIsUserLogined(auth.currentUser);
  }, [user]);

  const AuthNav = createStackNavigator();

  return (
    <>
      {isUserLogined ? (
        <HomeScreen />
      ) : (
        <AuthNav.Navigator initialRouteName="Login">
          <AuthNav.Screen
            options={{ headerShown: false }}
            name="Registration"
            component={RegistrationScreen}
          />
          <AuthNav.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
        </AuthNav.Navigator>
      )}
    </>
  );
};
