import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuthStore } from "../../redux/auth/auth-selectors";
import { getAllPostsFromStore } from "../../redux/dashboard/dashboard-selector";
// import { getPostsById } from "../../redux/dashboard/dashboard-operations";
import * as ImagePicker from "expo-image-picker";
import { db } from "../../firebase/config";
import { onSnapshot, collection } from "firebase/firestore";
import { Feather, AntDesign, EvilIcons } from "@expo/vector-icons";
import LogOut from "../../Components/LogOut";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  SafeAreaView,
  FlatList,
} from "react-native";

function ProfileScreen({ navigation }) {
  const { login, userId, avatarURL } = useSelector(getAuthStore);
  const { posts } = useSelector(getAllPostsFromStore);
  // const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  //нужна возможность положить фотку в стор и на сервер (не забыть за правильный формат 64)
  const [state, setState] = useState();

  // const [posts, setPosts] = useState([]);
  // const postsStorageRef = collection(db, `posts`);

  const getUserPost = () => {
    return posts.filter((post) => post.userId === userId);
    // .sort((a, b) => b.creationDate - a.creationDate);
  };

  // const getAllPostsById = async () => {
  //   onSnapshot(postsStorageRef, (data) => {
  //     if (data.docs.length) {
  //       const dbPosts = data.docs.map((post) => ({
  //         ...post.data(),
  //         id: post.id,
  //       }));
  //       console.log("dbPosts: ", dbPosts);
  //       const posts = dbPosts.filter((post) => post.userId === userId);
  //       console.log("posts: ", posts);
  //       setPosts(posts);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   getUserPost();
  // }, []);

  const getAvatarFromLibarry = async () => {
    let file = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
    });
    if (!file.canceled) {
      setState((prevState) => ({
        ...prevState,
        avatarURL: file.assets[0].uri,
      }));
    }
  };

  return (
    <View style={s.container}>
      <ImageBackground
        source={require("../../assets/images/png/PhotoBG.png")}
        style={s.bgImage}
      >
        <View style={s.profileWrapper}>
          <View style={{ ...s.avatarContainer, left: (width - 120) / 2 }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={getAvatarFromLibarry}
            >
              <Image
                style={s.addIcon}
                source={require("../../assets/images/png/cross.png")}
              />

              <Image
                source={
                  avatarURL
                    ? { uri: avatarURL }
                    : require("../../assets/images/NoImage.jpg")
                }
                style={{ width: 120, height: 120, borderRadius: 16 }}
              />
            </TouchableOpacity>
          </View>
          <LogOut />
          <View>
            <Text style={s.name}>{login}</Text>
          </View>
          <SafeAreaView>
            <FlatList
              data={getUserPost()}
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
                        })
                      }
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#FF6C00"
                      />

                      <Text style={{ ...s.text, marginLeft: 6 }}>
                        {item.counter}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={s.likes}
                      onPress={() => {}}
                      activeOpacity={0.6}
                    >
                      <AntDesign name="like2" size={24} color="#FF6C00" />
                      <Text style={{ ...s.text, marginLeft: 6 }}>
                        likes.length
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
                      <Text
                        style={{ ...s.text, textDecorationLine: "underline" }}
                      >
                        {item.place.country}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  profileWrapper: {
    marginTop: 177,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 82,
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  avatarContainer: {
    position: "absolute",
    top: -60,
    // left определен динамически с момощью width
    height: 120,
    width: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  addIcon: {
    position: "absolute",
    top: 81,
    right: -12,
    width: 25,
    height: 25,
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginTop: 32,
  },
  name: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 20,
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
});

export default ProfileScreen;

// const response = await fetch(avatarURL);
// const file = await response.blob();

// const avatarStorageRef = ref(storage, `avatars/${user.uid}`);
// await uploadBytes(avatarStorageRef, file).then((snapshot) => {
//   console.log("Uploaded a blob avatar!");
// });
// const avatar = await getDownloadURL(avatarStorageRef);
// console.log("avatar: ", avatar);

// await updateProfile(auth.currentUser, {

//   photoURL: avatar,
// });
