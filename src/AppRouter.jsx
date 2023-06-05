import React, { useEffect, useState } from "react";
import { RegistrationScreen } from "../src/Screens/auth/RegistrationScreen";
import { LoginScreen } from "../src/Screens/auth/LoginScreen";
import { HomeScreen } from "../src/Screens/main/HomeScreen";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./redux/auth/authSellectors";
import { createStackNavigator } from "@react-navigation/stack";
import { clearAuth } from "./redux/auth/authSlice";
import { checkUserAuth } from "./redux/auth/authOperations";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const { isUserLogginedIn } = useSelector(selectUser);

  useEffect(() => {
    dispatch(checkUserAuth());
    if (!isUserLogginedIn) {
      dispatch(clearAuth());
    }
  }, []);

  const AuthNav = createStackNavigator();

  return (
    <>
      {isUserLogginedIn ? (
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
