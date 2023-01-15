import React from "react";
import { logOut } from "../redux/auth/auth-operations";
import { useDispatch } from "react-redux";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

function LogOut() {
  const dispach = useDispatch();

  const logOutUser = () => {
    dispach(logOut());
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{ position: "absolute", top: 20, right: 0, paddingRight: 16 }}
      onPress={logOutUser}
    >
      <Feather name="log-out" size={24} color="#black" />
    </TouchableOpacity>
  );
}

export default LogOut;
