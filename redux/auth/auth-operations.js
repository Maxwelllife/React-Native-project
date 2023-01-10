import { db, auth, storage } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { authSlice } from "./auth-reducer";

// деструктурируем actions из authSlice для короткой записи
const { updateUserProfile, authStateChange, authLogOut } = authSlice.actions;

export const register =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user: ", user);

      await updateProfile(auth.currentUser, {
        displayName: login,
        // photoURL: avatarURL,
      });

      const { displayName, uid } = auth.currentUser;
      console.log("displayName, userId: ", displayName, uid);

      dispatch(
        updateUserProfile({
          // userId: user.uid,
          userId: uid,
          login: displayName,
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
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(updateUserProfile({ userId: user.uid, login: displayName }));

      console.log("user IN AUTH-OPERATIONS: ", user);
    } catch (error) {
      // console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const getCurrentUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(authStateChange({ stateChange: true }));
      dispatch(
        updateUserProfile({
          userId: user.uid,
          login: user.displayName,
        })
      );
    }
  });
};

export const logOut = () => async (dispatch, getState) => {
  auth.signOut();
  dispatch(authLogOut());
};

// export { register, login, authSignOut };

// export const fetchContacts = createAsyncThunk(
//   "contacts/fetch",
//   async (_, thunkAPI) => {
//     try {
//       const result = await api.getContacts();
//       return result;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
