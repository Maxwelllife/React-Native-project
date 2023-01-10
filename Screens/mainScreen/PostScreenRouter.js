import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import PostsScreen from "./PostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import { Feather } from "@expo/vector-icons";
import { logOut } from "../../redux/auth/auth-operations";
import { useDispatch } from "react-redux";
// const navigationRef = useNavigationContainerRef();
//  useEffect(() => {
//    navigationRef.navigate(user ? "Home" : "Register");
//  }, [user]);

const Stack = createStackNavigator();

function PostScreenRouter({ navigation }) {
  const dispach = useDispatch();
  const logOutUser = () => {
    dispach(logOut());
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публикации",
          headerTitleAlign: "center",
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity style={s.logOutContainer} onPress={logOutUser}>
              <Feather name="log-out" size={24} color="black" />
            </TouchableOpacity>
          ),
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

const s = StyleSheet.create({
  logOutContainer: {
    paddingRight: 16,
  },
});
export default PostScreenRouter;
