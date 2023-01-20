import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAuthStore } from "../../redux/auth/auth-selectors";
import {
  getAllPosts,
  addLike,
  deleteLike,
} from "../../redux/dashboard/dashboard-operations";
import { getAllPostsFromStore } from "../../redux/dashboard/dashboard-selector";

import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

import { Feather, AntDesign, EvilIcons } from "@expo/vector-icons";

function PostScreen({ navigation }) {
  const { userId, login, email, avatarURL } = useSelector(getAuthStore);

  const { posts } = useSelector(getAllPostsFromStore);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const handleLike = (post) => {
    if (userId === post.userId) return;
    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      dispatch(deleteLike(post.id));
    } else {
      dispatch(addLike(post.id));
    }
  };

  return (
    <View style={s.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={s.userAvatar}
          source={
            avatarURL
              ? { uri: avatarURL }
              : require("../../assets/images/NoImage.jpg")
          }
        />

        <View>
          <Text style={s.text}>{login}</Text>
          <Text style={{ ...s.text, marginBottom: 10 }}>{email}</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
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
                    commentsCounter: item.commentsCounter,
                  })
                }
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={{ ...s.text, marginLeft: 6 }}>
                  {item.commentsCounter}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={s.likes}
                onPress={() => {
                  handleLike(item);
                }}
                activeOpacity={0.6}
              >
                <AntDesign name="like2" size={24} color="#BDBDBD" />
                <Text style={{ ...s.text, marginLeft: 6 }}>
                  {item.likes.length}
                </Text>
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
    alignItems: "center",
    flexDirection: "row",
    marginTop: 8,
  },
  likes: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 24,
    marginRight: "auto",
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
