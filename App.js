import { StatusBar } from "expo-status-bar";
import {} from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { useState } from "react";
import RegisterScreen from "./Screens/auth/RegisterScreen";
import LoginScreen from "./Screens/auth/LoginScreen";

const AuthStack = createStackNavigator();

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    <AppLoading
      startAsync={loadApplication}
      onFinish={() => setIsReady(true)}
      onError={() => console.warn}
    />;
  }

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
      {/* <StatusBar style="auto" /> */}
    </NavigationContainer>
  );
}
