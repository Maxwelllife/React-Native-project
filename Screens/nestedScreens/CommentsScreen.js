import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
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
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import uuid from "react-native-uuid";

const CommentsScreen = ({ route }) => {
  useEffect(() => {
    getAllComments();
  }, []);

  const { postId } = route.params; // const postId = route.params.postId;
  const [comment, setComment] = useState([]);
  const { login } = useSelector(getAuthStore);

  const ref = collection(db, `posts/${postId}/comments`);

  const createComment = async () => {
    await addDoc(ref, {
      comment,
      login,
    });
  };

  const getAllComments = async () => {
    onSnapshot(ref, (data) => {
      console.log("data: ", data);
      if (data.docs.length) {
        const dbComents = data.docs.map((comment) => ({
          ...comment.data(),
          id: comment.id,
        }));
        console.log("dbComents: ", dbComents);
        setComment(dbComents);
      }
    });
  };

  return (
    <View style={s.container}>
      <SafeAreaView style={s.container}>
        <FlatList
          data={comment}
          renderItem={({ item }) => (
            <View>
              <Text>{item.login}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          // тут нужен нормальный const id = uuid.v4();
          keyExtractor={(item, indx) => indx.toString()}
        />
      </SafeAreaView>
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
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    // дабы внизу все было
    // justifyContent: "flex-end",
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
});

export default CommentsScreen;
