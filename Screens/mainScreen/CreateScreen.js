import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";

function CreateScreen() {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [type, setType] = useState(CameraType.back);
  console.log("type: ", type);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    console.log("Снимок: ", camera);
    console.log("Снимок: ", photo.uri);
  };

  function toggleCameraType() {
    setType((current) => {
      console.log("current: ", current);
      return current === "back" ? CameraType.front : CameraType.back;
    });
  }

  return (
    <View style={s.container}>
      {photo && (
        <View style={s.takePhotoContainer}>
          <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />
        </View>
      )}
      <Camera style={s.camera} ref={setCamera} type={type}>
        <TouchableOpacity onPress={takePhoto} style={s.snapContainer}>
          <Text style={s.snap}>SNAP</Text>
        </TouchableOpacity>
        <View style={s.flipContainer}>
          <TouchableOpacity style={s.flipBtn} onPress={toggleCameraType}>
            <Text style={s.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  camera: {
    flex: 1,
    height: 300,
    // marginTop: 50,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  snapContainer: {
    // marginTop: 200,
    borderWidth: 1,
    borderColor: "#ff0000",
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  snap: {
    color: "#fff",
  },
  takePhotoContainer: {
    position: "absolute",
    // zIndex: 1,
    // top: 50,
    left: 10,
    borderWidth: 1,
    borderColor: "#ff0000",
  },
  flipContainer: {
    borderWidth: 1,
    borderColor: "#ff0000",
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    color: "#fff",
  },
});

export default CreateScreen;
