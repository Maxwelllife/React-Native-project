import React from "react";
import { StyleSheet, View, Text } from "react-native";

function MapScreen() {
  return (
    <View style={s.container}>
      <Text>MapScreen</Text>
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

export default MapScreen;
