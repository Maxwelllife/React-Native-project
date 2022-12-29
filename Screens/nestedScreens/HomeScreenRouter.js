import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
        headerTitleAlign: "center",
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 10,
          paddingBottom: 20,
          height: 70,
        },
      }}
    >
      <MainTab.Screen
        name="PostsScreen"
        component={PostScreenRouter}
        options={{
          title: "Публикации",
          headerRight: () => (
            <TouchableOpacity style={s.logOutContainer}>
              <Feather name="log-out" size={24} color="black" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign
              name="appstore-o"
              size={size}
              // color={focused ? "#212121" : "#515151"}
              color={color}
            />
          ),
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
                <Image
                  source={require("../../assets/images/png/goBack.png")}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            ),
            tabBarIconStyle: {
              width: 70,
              backgroundColor: "#FF6C00",
              borderRadius: 20,
            },
            tabBarIcon: ({ focused, size, color }) => (
              <AntDesign name="plus" size={24} color="white" />
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
  logOutContainer: {
    paddingRight: 16,
  },
  goBack: {
    paddingLeft: 16,
  },
});

export default HomeScreenRouter;
