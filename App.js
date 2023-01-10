import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import MainRouter from "./Components/MainRouter";
import { useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
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
    <Provider store={store}>
      <View onLayout={onLayoutRootView} style={{ height: "100%" }}>
        <MainRouter />
      </View>

      <StatusBar style="auto" />
    </Provider>
  );
}
