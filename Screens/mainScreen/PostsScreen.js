import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { getAuthStore } from "../../redux/auth/auth-selectors";
// import { getUser } from "../../redux/auth/auth-selectors";
// import uuid from "react-native-uuid";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { db } from "../../firebase/config";
import { onSnapshot, collection } from "firebase/firestore";

import { Feather, EvilIcons } from "@expo/vector-icons";

function PostScreen({ navigation, route }) {
  // в dbPost есть свой id из постов
  const { userId, login, email, avatar } = useSelector(getAuthStore);
  // const { userId, login, email, avatar } = useSelector(getUser);
  console.log("userId, login, email: ", userId, login, email);
  // const id = uuid.v4();
  const [posts, setPosts] = useState([]);

  const postsStorageRef = collection(db, `posts`);

  const getAllPosts = async () => {
    onSnapshot(postsStorageRef, (data) => {
      if (data.docs.length) {
        const dbPosts = data.docs.map((post) => ({
          ...post.data(),
          id: post.id,
        }));
        console.log("dbPosts: ", dbPosts);
        setPosts(dbPosts);
      }
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  console.log("postsssssssssssssssssssssss: ", posts);

  return (
    <View style={s.container}>
      <View style={s.header}>
        {avatar ? (
          <Image style={s.userAvatar} source={{ uri: avatar }} />
        ) : (
          <View style={{ ...s.userAvatar, backgroundColor: "#F6F6F6" }}></View>
        )}
      </View>
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
                    // photo: item.photo,
                    postId: item.id,
                  })
                }
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={s.text}>{item.comments?.length}</Text>
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
