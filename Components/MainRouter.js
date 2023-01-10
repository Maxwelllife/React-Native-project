import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { db, auth, storage } from "./firebase/config";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegisterScreen from "../Screens/auth/RegisterScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import HomeScreenRouter from "../Screens/nestedScreens/HomeScreenRouter";

import { getCurrentUser } from "../redux/auth/auth-operations";

const AuthStack = createStackNavigator();

const MainRouter = () => {
  const user = useSelector((store) => store.auth.userId);
  const dispatch = useDispatch();
  const navigationRef = useNavigationContainerRef();
  useEffect(() => {
    dispatch(getCurrentUser());
    // следим за user и передаем в NavigationContainer "ссылку" на Home или Register
    navigationRef.navigate(user ? "Home" : "Register");
  }, [user]);

  // const [user, setUser] = useState(null);
  // onAuthStateChanged(auth, (user) => setUser(user));
  // console.log("user IN MAIN ROUTER: ", user);

  return (
    <NavigationContainer ref={navigationRef}>
      {/* <NavigationContainer> */}
      <AuthStack.Navigator
        screenOptions={{ headerShown: false }}
        //initialRouteName  НЕ ПОНЯТНО ДЛЯ ЧЕГО ОНс тернарником нужен для того чтобы перебросило туда куда нужно после логинизиции
        // initialRouteName={user ? "Home" : "Register"}
      >
        <AuthStack.Screen name="Register" component={RegisterScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Home" component={HomeScreenRouter} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default MainRouter;
