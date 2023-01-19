import { db, auth, storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  collection,
} from "firebase/firestore";
import uuid from "react-native-uuid";
import { dashboardSlice } from "./dashboard-reducer";
import * as ImagePicker from "expo-image-picker";

const { getPosts, comments } = dashboardSlice.actions;

export const sendPostToServer = async ({
  photo,
  title,
  place,
  userId,
  login,
}) => {
  // загрузка фото на сервер
  const response = await fetch(photo);
  const file = await response.blob();
  const id = uuid.v4();
  const storageRef = ref(storage, `posts/${id}`);
  await uploadBytes(storageRef, file);
  const photoURL = await getDownloadURL(storageRef);

  // загрузка поста на сервер
  const postsStorageRef = doc(db, `posts`, uuid.v4());
  await setDoc(postsStorageRef, {
    title,
    userId,
    login,
    place,
    photo: photoURL,
    // commentsCounter: 0,
    likes: 0,
    creationDate: new Date().getTime(),
  });
};

//ф. getAllPosts по логике должна быть асинхронной... но где await?
const postsStorageRef = collection(db, `posts`);

export const getAllPosts = () => async (dispatch, getState) => {
  // export const getAllPosts = async () => {
  try {
    onSnapshot(postsStorageRef, (data) => {
      if (data.docs.length) {
        const posts = data.docs.map((post) => ({
          ...post.data(),
          id: post.id,
        }));
        // console.log("posts: ", posts);
        dispatch(getPosts({ posts }));
      }
    });
  } catch (error) {
    console.log("error.message", error.message);
  }
};

export const getAvatarFromLibarry = async () => {
  let file = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.3,
  });
  return file;
};

// console.log("auth.currentUser.uid: ", auth.currentUser.uid);
// сейчас наш userId = auth.currentUser.uid;
export const addLike = async (props) => {
  const { userId } = props;
  console.log("userId: ", userId);
  // async (dispatch, getState) => {
  // try {
  // добавляем лайк и сохраняем в database
  const currentPostRef = doc(db, `posts/${postId}`);
  console.log("currentPostRef: ", currentPostRef);

  await updateDoc(currentPostRef, {
    likes: arrayUnion(auth.currentUser.uid),
  });
  // } catch (error) {
  console.log("error.message", error.message);
  // }
  // dispatch(addLikeToStore(userId));
  // };
};
