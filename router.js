import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather, AntDesign } from "@expo/vector-icons";

import { StyleSheet, TouchableOpacity, Image } from "react-native";

import RegisterScreen from "./Screens/auth/RegisterScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import PostScreen from "./Screens/mainScreen/PostScreen";
import CreateScreen from "./Screens/mainScreen/CreateScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen
          name="Register"
          component={RegisterScreen}
          // options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          // options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 10,
          paddingBottom: 20,
          height: 70,
          // display: "none",
        },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostScreen}
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
        component={CreateScreen}
        options={({ navigation }) => {
          return {
            title: "Создать публикацию",
            headerLeft: () => (
              <TouchableOpacity style={s.goBack}>
                <Image
                  source={require("./assets/images/png/Group10.png")}
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
};

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
