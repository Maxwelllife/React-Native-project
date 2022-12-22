import React from "react";
import { StyleSheet, View, Text } from "react-native";

function HomeScreen() {
  return (
    <View style={s.container}>
      <Text>HomeScreen</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
