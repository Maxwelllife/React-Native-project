import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

import { Feather, EvilIcons } from "@expo/vector-icons";

function PostScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  console.log("posts: ", posts);

  return (
    <View style={s.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Image
              style={{ width: "100%", height: 240, borderRadius: 8 }}
              resizeMode="cover"
              source={{ uri: item.photo }}
            />

            <Text style={s.title}>{item.title}</Text>

            <View style={s.wrapper}>
              <TouchableOpacity
                style={s.comments}
                onPress={() =>
                  navigation.navigate("Comments", {
                    photo: item.photo,
                    // post: item.id,
                  })
                }
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={s.text}>Длинна массива</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={s.map}
                onPress={() =>
                  navigation.navigate("Map", {
                    location: item.place,
                    title: item.title,
                  })
                }
              >
                <EvilIcons
                  style={s.locationIcon}
                  name="location"
                  size={28}
                  color="#BDBDBD"
                />
                <Text style={{ ...s.text, textDecorationLine: "underline" }}>
                  {/* {`${item.place[0]} ${item.place[1]}`} */}
                  {`${item.place.city}, ${item.place.country}`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
    borderTopWidth: 2,
    borderColor: "#F6F6F6",
    // justifyContent: "center",
  },
  title: {
    marginTop: 8,
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    lineHeight: 19,
  },
  wrapper: {
    flexDirection: "row",
    marginTop: 8,
    // borderWidth: 1,
    // borderColor: "red",
    justifyContent: "space-between",
  },
  comments: {
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: "blue",
    // justifyContent: "flex-start",
  },
  // locationIcon: {
  //   position: "absolute",
  //   bottom: -2,
  //   left: -28,
  // },
  map: { flexDirection: "row" },
  place: {},
  text: { marginLeft: 8 },
});

export default PostScreen;
