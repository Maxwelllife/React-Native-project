import { createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth, storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    doc,
    setDoc,
    updateDoc,
    onSnapshot,
    arrayUnion,
    collection,
    arrayRemove,
} from "firebase/firestore";
import uuid from "react-native-uuid";
// import { getPosts } from "./dashboard-reducer";
import * as ImagePicker from "expo-image-picker";

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
    const postsStorageRef = doc(db, `posts`, id);
    await setDoc(postsStorageRef, {
        title,
        userId,
        login,
        place,
        photo: photoURL,
        commentsCounter: 0,
        likes: [],
        creationDate: new Date().getTime(),
    });
};

//ф. getAllPosts по логике должна быть асинхронной... но где await?

// export const getAllPosts = () => async (dispatch, getState) =>

export const getAllPosts = createAsyncThunk(
    "dashboard/getAllPosts",
    async (_, { rejectWithValue }) => {
        try {
            console.log("first");
            const postsStorageRef = collection(db, `posts`);
            onSnapshot(postsStorageRef, (data) => {
                if (data.docs.length) {
                    const posts = data.docs.map((post) => ({
                        ...post.data(),
                        id: post.id,
                    }));
                    return posts;
                }
                return [];
            });
        } catch (error) {
            return rejectWithValue(
                error.response.data.message || error.message
            );
        }
    }
);

export const addLike = createAsyncThunk(
    "dashboard/addLike",
    async (postId, { rejectWithValue }) => {
        try {
            // добавляем лайк и сохраняем в database
            const currentPostRef = doc(db, `posts/${postId}`);
            await updateDoc(currentPostRef, {
                likes: arrayUnion(auth.currentUser.uid),
            });
        } catch (error) {
            return rejectWithValue(
                error.response.data.message || error.message
            );
        }
    }
);

export const deleteLike = createAsyncThunk(
    "dashboard/deleteLike",
    async (postId, { rejectWithValue }) => {
        try {
            // удаляем лайк из database
            const currentPostRef = doc(db, `posts/${postId}`);
            await updateDoc(currentPostRef, {
                likes: arrayRemove(auth.currentUser.uid),
            });
        } catch (error) {
            return rejectWithValue(
                error.response.data.message || error.message
            );
        }
    }
);

export const getAvatarFromLibarry = async () => {
    let file = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.3,
    });
    return file;
};
