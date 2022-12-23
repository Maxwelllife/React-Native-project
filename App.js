import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";
import { useCallback, useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const routing = useRoute(true);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          // "R-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
          "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
        });
        // await Asset.fromModule(
        //   require("./assets/images/png/PhotoBG.png")
        // ).downloadAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <View onLayout={onLayoutRootView} style={{ height: "100%" }}>
        {routing}
        {/* {isAuth ? <MainNavigation /> : <AuthNavigation />} */}
      </View>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
