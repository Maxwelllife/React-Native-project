import { StatusBar } from "expo-status-bar";
import {} from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";
import { useState } from "react";

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const routing = useRoute(true);
  if (!isReady) {
    <AppLoading
      startAsync={loadApplication}
      onFinish={() => setIsReady(true)}
      onError={() => console.warn}
    />;
  }

  return (
    <NavigationContainer>
      {routing}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
