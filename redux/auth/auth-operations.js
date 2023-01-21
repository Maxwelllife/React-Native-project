import { db, auth, storage } from "../../firebase/config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { authSlice } from "./auth-reducer";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// деструктурируем actions из authSlice для короткой записи
const { updateUserProfile, authLogOut } = authSlice.actions;

export const register =
    ({ login, email, password, avatarURL }) =>
    async (dispatch, getState) => {
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            let avatar;
            if (avatarURL) {
                const response = await fetch(avatarURL);
                const file = await response.blob();
                const avatarStorageRef = ref(storage, `avatars/${user.uid}`);
                await uploadBytes(avatarStorageRef, file);

                avatar = await getDownloadURL(avatarStorageRef);
            }
            // тут только логин и аватар потомучто при создании уже туда положили емаил и пароль
            await updateProfile(auth.currentUser, {
                displayName: login,
                photoURL: avatar,
            });

            // обновили стор данными (к примеру в photoURL мы уже положили avatar взятый из сервера)
            dispatch(
                updateUserProfile({
                    userId: user.uid,
                    login,
                    email: user.email,
                    // возможно операция записи в стор сработает быстрее чем запишеться на сервере информация потому в стор возьмем из локальной среды
                    // avatarURL: user.photoURL,
                    avatarURL: avatar,
                })
            );
        } catch (error) {
            // console.log("error", error);
            console.log("error.message", error.message);
        }
    };

export const login =
    ({ email, password }) =>
    async (dispatch, getState) => {
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            // обновили стор данными
            dispatch(
                updateUserProfile({
                    userId: user.uid,
                    login: user.displayName,
                    email: user.email,
                    avatarURL: user.photoURL,
                })
            );
        } catch (error) {
            console.log("error.message", error.message);
        }
    };

export const logOut = () => async (dispatch, getState) => {
    await auth.signOut();
    dispatch(authLogOut());
};

export const getCurrentUser = () => (dispatch, getState) => {
    onAuthStateChanged(auth, (user) => {
        if (!user) return;

        // dispatch(authStateChange({ stateChange: true }));
        dispatch(
            updateUserProfile({
                userId: user.uid,
                login: user.displayName,
                avatarURL: user.photoURL,
                email: user.email,
            })
        );
    });
};
