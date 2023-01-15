import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "./PostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import LogOut from "../../Components/LogOut";

const Stack = createStackNavigator();

function PostScreenRouter({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публикации",
          headerTitleAlign: "center",
          headerLeft: null,
          headerRight: () => <LogOut />,
        }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ navigation }) => {
          return {
            title: "Комментарии",
            headerTitleAlign: "center",
            // эта стрелка мне не нравиться
            // headerLeft: () => (
            //   <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
            //     <Image
            //       source={require("../../assets/images/png/goBack.png")}
            //       size={24}
            //       color="black"
            //     />
            //   </TouchableOpacity>
            // ),
          };
        }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }) => {
          return {
            title: "Карта",
            headerTitleAlign: "center",
            // headerLeft: () => (
            //   <TouchableOpacity
            //     // style={s.goBack}
            //     onPress={() => navigation.navigate("Posts")}
            //   >
            //     <Image
            //       source={require("../../assets/images/png/goBack.png")}
            //       size={24}
            //       color="black"
            //     />
            //   </TouchableOpacity>
            // ),
          };
        }}
      />
    </Stack.Navigator>
  );
}

export default PostScreenRouter;
