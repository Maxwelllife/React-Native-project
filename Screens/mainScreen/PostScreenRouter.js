import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PostsScreen from "./PostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

// const navigationRef = useNavigationContainerRef();
//  useEffect(() => {
//    navigationRef.navigate(user ? "Home" : "Register");
//  }, [user]);

const Stack = createStackNavigator();

function PostScreenRouter({ navigation }) {
  return (
    // <NavigationContainer ref={ navigationRef}>

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Posts" component={PostsScreen} />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ navigation }) => {
          return {
            title: "Комментарии",
            headerLeft: () => (
              <TouchableOpacity
                style={s.goBack}
                onPress={() => navigation.navigate("Posts")}
              >
                <Image
                  source={require("../../assets/images/png/goBack.png")}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            ),
          };
        }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }) => {
          return {
            title: "Карта",
            headerLeft: () => (
              <TouchableOpacity
                style={s.goBack}
                onPress={() => navigation.navigate("Posts")}
              >
                <Image
                  source={require("../../assets/images/png/goBack.png")}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
}
export default PostScreenRouter;
