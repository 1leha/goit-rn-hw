import React, { useEffect, useState } from "react";
import { RegistrationScreen } from "../../Screens/auth/RegistrationScreen";
import { LoginScreen } from "../../Screens/auth/LoginScreen";
import { HomeScreen } from "../../Screens/main/HomeScreen";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/auth/authSellectors";
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "../../db/firebaseConfig";
import { clearAuth } from "../redux/auth/authSlice";

export const AppRouter = () => {
  const [isUserLogined, setIsUserLogined] = useState(auth.currentUser);
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  // console.log("user :>> ", user);
  // console.log("auth.currentUser :>> ", auth.currentUser);
  // console.log("isUserLogined :>> ", isUserLogined);

  useEffect(() => {
    if (!isUserLogined) {
      dispatch(clearAuth());
    }
  }, []);

  useEffect(() => {
    console.log("useEffect AppRouter", user.id);

    // if (!isUserLogined) {
    //   dispatch(clearAuth());
    // }

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
