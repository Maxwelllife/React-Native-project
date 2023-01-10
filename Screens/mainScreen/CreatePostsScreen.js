import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAuthStore } from "../../redux/auth/auth-selectors";

import CameraIcon from "../../Components/CameraIcon";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";

import { storage, db } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import uuid from "react-native-uuid";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";

function CreateScreen({ navigation }) {
  const { userId, login } = useSelector(getAuthStore);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [title, setTitle] = useState(null);
  const [place, setPlace] = useState(null);
  const [type, setType] = useState(CameraType.back);

  // получение разрешения камеры на локацию - происходит один раз
  useEffect(() => {
    (async () => {
      const camera = await Camera.requestCameraPermissionsAsync();
      if (camera.status !== "granted") {
        return Alert.alert(
          "Доступ к камере запрещен",
          "Проверьте настройки вашего телефона",
          [{ text: "OK" }]
        );
      }
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const takePhoto = async ({ navigation }) => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    const lat = location.coords.latitude;
    const long = location.coords.longitude;

    const exactLocation = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    setPhoto(photo.uri);

    const photoLocation = {
      city: exactLocation[0]?.city || "",
      country: exactLocation[0]?.country || "",
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    };
    setPlace(photoLocation);
  };

  const sendPhoto = () => {
    sendPostToServer();
    if (!photo) {
      return Alert.alert(
        "Вы не сделали фото!",
        "Публикация без фото невозможна",
        [{ text: "OK" }]
      );
    }
    if (!title) {
      return Alert.alert(
        "Вы не заполнили описание фото!",
        "Публикация без названия невозможна",
        [{ text: "OK" }]
      );
    }

    navigation.navigate("Posts");
  };

  const sendPostToServer = async () => {
    const photoURL = await uploadPhotoToServer();
    // ссылка на коллекцию постов
    const postsStorageRef = doc(db, `posts`, uuid.v4());
    console.log("postsStorageRef: ", postsStorageRef);
    await setDoc(postsStorageRef, {
      title,
      userId,
      login,
      place,
      photo: photoURL,
      // likes: [],
      // comments: [],

      creationDate: new Date().getTime(),
    });
  };
  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const id = uuid.v4();
    const storageRef = ref(storage, `posts/${id}`);
    await uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob!");
    });
    const photoUrl = await getDownloadURL(storageRef).then((snapshot) => {
      console.log("photoRef:", snapshot); //ссылка которая мне нужна
      return snapshot;
    });
    return photoUrl;
  };

  function toggleCameraType() {
    setType((current) => {
      return current === "back" ? CameraType.front : CameraType.back;
    });
  }
  const reset = () => {
    setTitle(null);
    setPlace(null);
    setPhoto(null);
  };

  return (
    <View style={s.container}>
      {photo ? (
        <View style={s.camera}>
          <Image
            source={{ uri: photo }}
            style={{ width: "100%", height: "100%", borderRadius: 8 }}
          />
          <TouchableOpacity
            onPress={() => {
              setPhoto(null);
            }}
            style={s.snapContainer}
            activeOpacity={0.5}
          >
            <CameraIcon fill="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <Camera style={s.camera} ref={setCamera} type={type}>
          <TouchableOpacity
            onPress={takePhoto}
            style={s.snapContainer}
            activeOpacity={0.5}
          >
            <CameraIcon fill="#BDBDBD" />
          </TouchableOpacity>
        </Camera>
      )}

      <View style={{ flexDirection: "row" }}>
        <Text
          style={{ ...s.text, paddingLeft: 16, paddingTop: 8 }}
          onPress={() => {}}
        >
          Загрузите фото
        </Text>
        {!photo && (
          <View style={s.flipCamera}>
            <TouchableOpacity style={s.flipBtn} onPress={toggleCameraType}>
              <Text style={s.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{ marginTop: 32, paddingLeft: 16 }}>
        <View>
          <TextInput
            style={s.input}
            textAlign="left"
            placeholder="Название..."
            value={title}
            onChangeText={(value) => {
              setTitle(value);
            }}
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={{ ...s.input, paddingLeft: 32 }} textAlign="left">
            {place ? `${place.city}, ${place.country}` : "Местность..."}
          </Text>
          <EvilIcons
            style={s.locationIcon}
            name="location"
            size={28}
            color="#BDBDBD"
          />
        </View>
      </View>
      <View
        style={{
          ...s.sendContainer,
          backgroundColor: photo && title ? "#FF6C00" : "#f6f6f6",
        }}
      >
        <TouchableOpacity onPress={sendPhoto}>
          <Text
            style={{ ...s.text, color: photo && title ? "#FFF" : "#BDBDBD" }}
          >
            Опубликовать
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={s.basket} activeOpacity={0.6} onPress={reset}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={24}
          color={photo || title ? "#212121" : "#DADADA"}
        />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  camera: {
    position: "relative",
    height: "30%",
    marginTop: 32,
    marginHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",

    alignItems: "center",
    justifyContent: "center",
  },
  snapContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    // zIndex: 1,
    // marginTop: 200,
    borderWidth: 1,
    borderColor: "#fff",

    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 20,
  },
  snap: {
    color: "#fff",
  },
  takePhotoContainer: {
    height: "30%",
    marginTop: 32,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ff0000",
    marginHorizontal: 16,
  },
  flipCamera: {
    borderWidth: 1,
    borderColor: "#ff0000",
    borderRadius: 100,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3,
    marginRight: 16,
    marginLeft: "auto",
    padding: 5,
    borderColor: "#E8E8E8",
    backgroundColor: "#FF6C00",
  },
  input: {
    fontSize: 16,
    lineHeight: 19,
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    heigth: 50,
  },
  locationIcon: {
    position: "absolute",
    bottom: 18,
    left: -6,
  },
  sendContainer: {
    marginTop: 32,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    // color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
  },
  basket: {
    width: 70,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 170,
    marginBottom: 10,
    padding: 8,
    height: 40,
    // backgroundColor: "#FF6C00",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});

export default CreateScreen;
