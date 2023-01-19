import React, { useEffect, useState } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegisterScreen from "../Screens/auth/RegisterScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import HomeScreenRouter from "../Screens/nestedScreens/HomeScreenRouter";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../redux/auth/auth-operations";
import { getAuthStore } from "../redux/auth/auth-selectors";

const AuthStack = createStackNavigator();

const MainRouter = () => {
  const navigationRef = useNavigationContainerRef();

  const { userId } = useSelector(getAuthStore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId === null) {
      dispatch(getCurrentUser());
    }

    // следим за userId и передаем в NavigationContainer "ссылку" на Home или Register
    navigationRef.navigate(userId ? "Home" : "Register");
  }, [userId]);

  return (
    <NavigationContainer ref={navigationRef}>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Register" component={RegisterScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Home" component={HomeScreenRouter} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default MainRouter;
