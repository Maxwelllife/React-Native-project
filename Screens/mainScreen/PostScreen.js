import React from "react";
import { StyleSheet, View, Text } from "react-native";

function PostScreen() {
  return (
    <View style={s.container}>
      <Text>PostScreen</Text>
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

export default PostScreen;
