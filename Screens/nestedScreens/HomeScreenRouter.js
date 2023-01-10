import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

import { Feather, AntDesign } from "@expo/vector-icons";

import PostScreenRouter from "../mainScreen/PostScreenRouter";
import CreatePostsScreen from "../mainScreen/CreatePostsScreen";
import ProfileScreen from "../mainScreen/ProfileScreen";

const MainTab = createBottomTabNavigator();

function HomeScreenRouter() {
  return (
    <MainTab.Navigator
      screenOptions={{
        // headerShown: false,
        headerTitleAlign: "center",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
        },
      }}
    >
      <MainTab.Screen
        name="PostsScreen"
        component={PostScreenRouter}
        options={({ route }) => {
          return {
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => (
              <AntDesign
                name="appstore-o"
                size={size}
                // color={focused ? "#212121" : "#515151"}
                color={color}
              />
            ),
            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? "";
              if (routeName === "Comments" || routeName === "Map") {
                return { display: "none" };
              }
              return { height: 83 };
            })(route),
          };
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={({ navigation }) => {
          return {
            title: "Создать публикацию",
            headerLeft: () => (
              <TouchableOpacity
                style={s.goBack}
                onPress={() => navigation.navigate("Posts")}
              >
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            ),
            // tabBarIconStyle: {},
            tabBarIcon: ({ focused, size, color }) => (
              <TouchableOpacity
                style={s.createBtn}
                onPress={() => navigation.navigate("Create")}
              >
                <AntDesign name="plus" size={24} color="white" />
              </TouchableOpacity>
            ),
            tabBarStyle: { display: "none" },
          };
        }}
      />

      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => {
          return {
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => (
              <Feather
                name="user"
                size={size}
                // color={focused ? "#212121" : "#515151"}
                color={color}
              />
            ),
          };
        }}
      />
    </MainTab.Navigator>
  );
}

const s = StyleSheet.create({
  header: {
    color: "red",
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  goBack: {
    paddingLeft: 16,
  },
  createBtn: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreenRouter;
