import React from "react";
import { StyleSheet, View, Text } from "react-native";

function CreateScreen() {
  return (
    <View style={s.container}>
      <Text>CreateScreen</Text>
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

export default CreateScreen;
