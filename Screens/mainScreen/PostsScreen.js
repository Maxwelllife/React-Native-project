import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { getAuthStore } from "../../redux/auth/auth-selectors";
// import { getUser } from "../../redux/auth/auth-selectors";
// import uuid from "react-native-uuid";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { db } from "../../firebase/config";
import { onSnapshot, collection, doc } from "firebase/firestore";

import { Feather, EvilIcons } from "@expo/vector-icons";

function PostScreen({ navigation }) {
  const { userId, login, email, avatarURL } = useSelector(getAuthStore);
  console.log("Store in POSTSCREEN: ", useSelector(getAuthStore));

  const [posts, setPosts] = useState([]);

  const postsStorageRef = collection(db, `posts`);
  console.log("db: ", db);

  const getAllPosts = async () => {
    onSnapshot(postsStorageRef, (data) => {
      if (data.docs.length) {
        const dbPosts = data.docs.map((post) => ({
          ...post.data(),
          id: post.id,
        }));
        // console.log("dbPosts: ", dbPosts);
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
      <View style={{ flexDirection: "row" }}>
        <Image
          style={s.userAvatar}
          source={
            avatarURL
              ? { uri: avatarURL }
              : require("../../assets/images/png/PhotoBG.png")
          }
        />

        <View>
          <Text style={s.text}>{login}</Text>
          <Text style={{ ...s.text, marginBottom: 10 }}>{email}</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        // тут нужен нормальный const id = uuid.v4();
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Image
              style={s.image}
              resizeMode="cover"
              source={{ uri: item.photo }}
            />

            <Text style={s.title}>{item.title}</Text>

            <View style={s.wrapper}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() =>
                  navigation.navigate("Comments", {
                    photo: item.photo,
                    postId: item.id,
                    authorId: item.userId,
                  })
                }
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={s.text}>{item.comments?.length}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flexDirection: "row" }}
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
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginTop: 32,
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
    justifyContent: "space-between",
  },

  // comments: {
  //   flexDirection: "row",
  // },
  // locationIcon: {
  //   position: "absolute",
  //   bottom: -2,
  //   left: -28,
  // },
  // map: { flexDirection: "row" },
  place: {},
  text: { marginLeft: 8 },
});

export default PostScreen;
