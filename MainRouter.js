import React from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegisterScreen from "./Screens/auth/RegisterScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import HomeScreenRouter from "./Screens/nestedScreens/HomeScreenRouter";

// const navigationRef = useNavigationContainerRef();
//  useEffect(() => {
//    navigationRef.navigate(user ? "Home" : "Register");
//  }, [user]);

const AuthStack = createStackNavigator();

const MainRouter = (user) => {
  return (
    // <NavigationContainer ref={ navigationRef}>
    <NavigationContainer>
      <AuthStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={user ? "Home" : "Register"}
      >
        <AuthStack.Screen name="Register" component={RegisterScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Home" component={HomeScreenRouter} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default MainRouter;
