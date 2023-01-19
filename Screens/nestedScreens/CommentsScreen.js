import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { getAuthStore } from "../../redux/auth/auth-selectors";
import { db } from "../../firebase/config";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  arrayUnion,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import uuid from "react-native-uuid";

const CommentsScreen = ({ route }) => {
  const { postId, photo, authorId } = route.params;
  const [comment, setComment] = useState("");
  const [commentsCounter, setCommentsCounter] = useState(1);

  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { login, userId, avatarURL } = useSelector(getAuthStore);

  useEffect(() => {
    getAllComments();
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const ref = collection(db, `posts/${postId}/comments`);

  const createComment = async () => {
    const postsStorageRef = doc(db, `posts/${postId}`);
    console.log("postsStorageRef: ", postsStorageRef);
    setCommentsCounter(commentsCounter + 1);
    await updateDoc(postsStorageRef, {
      // comments: arrayUnion(comment), для добавления массива коментариев в коллекцию пост
      commentsCounter,
    });

    await addDoc(ref, {
      comment,
      login,
      commentAuthor: userId,
      authorAvatar: avatarURL,
    });
    setComment("");
    keyboardHide();
  };

  const getAllComments = async () => {
    onSnapshot(ref, (data) => {
      if (data.docs.length) {
        const dbComents = data.docs.map((comment) => ({
          ...comment.data(),
          id: comment.id,
        }));
        console.log("dbComents: ", dbComents);
        setAllComments(dbComents);
      }
    });
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={s.container}>
      <Image
        style={{
          width: "100%",
          height: 240,
          borderRadius: 8,
        }}
        resizeMode="cover"
        source={{ uri: photo }}
      />

      {!isShowKeyboard && (
        <FlatList
          style={s.itemsContainer}
          data={allComments}
          // тут нужен нормальный const id = uuid.v4();
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                ...s.commentWrapper,
                flexDirection:
                  item.commentAuthor === authorId ? "row-reverse" : "row",
              }}
            >
              <Image
                source={
                  item.authorAvatar
                    ? { uri: item.authorAvatar }
                    : require("../../assets/images/NoImage.jpg")
                }
                style={s.avatar}
              />
              <Text style={s.comment}>{item.comment}</Text>
            </View>
          )}
        />
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ marginTop: "auto", marginBottom: 16 }}>
          <TextInput
            style={s.input}
            textAlign="left"
            placeholder="Комментировать..."
            value={comment}
            onChangeText={(value) => {
              setComment(value);
            }}
          />
          <TouchableOpacity onPress={createComment} style={s.buttonSend}>
            <AntDesign name="arrowup" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
    marginHorizontal: 16,
    // дабы внизу все было
    // justifyContent: "flex-end",
  },
  itemsContainer: {
    marginTop: 8,
    marginHorizontal: 16,
  },
  commentWrapper: {
    marginTop: 24,
  },
  input: {
    heigth: 50,
    marginTop: 31,
    marginHorizontal: 16,
    padding: 8,
    paddingLeft: 16,
    backgroundColor: "#00000008",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    fontSize: 16,
    lineHeight: 19,
  },

  buttonSend: {
    position: "absolute",
    right: 25,
    top: 36,
    height: 34,
    width: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  comment: {
    backgroundColor: "#00000008",
    marginHorizontal: 16,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
});

export default CommentsScreen;
