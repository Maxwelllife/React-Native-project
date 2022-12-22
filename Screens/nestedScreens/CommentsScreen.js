import React from "react";
import { StyleSheet, View, Text } from "react-native";

function CommentsScreen() {
  return (
    <View style={s.container}>
      <Text>CommentsScreen</Text>
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

export default CommentsScreen;
