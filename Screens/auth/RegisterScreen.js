import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
// import { getAvatarFromLibarry } from "../../helpers/getAvatarFromLibarry";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
  ImageBackground,
  Image,
} from "react-native";

import { register } from "../../redux/auth/auth-operations";

const initialState = {
  login: "",
  email: "",
  password: "",
  avatarURL: null,
};

export default function RegisterScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);

  const { width } = useWindowDimensions();

  const dispatch = useDispatch();

  const showPassword = () => {
    if (isShowPassword) {
      return setIsShowPassword(false);
    }
    setIsShowPassword(true);
  };

  const getAvatarFromLibarry = async () => {
    let file = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
    });
    // const test = () => {
    //   const file = getAvatarFromLibarry();

    if (!file.canceled) {
      setState((prevState) => ({
        ...prevState,
        avatarURL: file.assets[0].uri,
      }));
    }
  };

  // const resetPhoto = () => {
  //   setImage(null);
  // };

  const handleSubmit = () => {
    dispatch(register(state));
    setState(initialState);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

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

  return (
    <View style={s.container}>
      <ImageBackground
        source={require("../../assets/images/png/PhotoBG.png")}
        style={s.bgImage}
      >
        {/* закрытие клавиатуры когда нажимаем вне формы */}
        <TouchableWithoutFeedback onPress={keyboardHide}>
          <View
            style={{
              ...s.form,
              marginBottom: isShowKeyboard ? -180 : 0,
              // paddingBottom: isShowKeyboard ? 32 : 85,
              width: width,
            }}
          >
            <View style={{ ...s.photoContainer, left: (width - 120) / 2 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={getAvatarFromLibarry}
              >
                {state.avatarURL ? (
                  <Image
                    style={s.addIcon}
                    source={require("../../assets/images/png/cross.png")}
                  />
                ) : (
                  <Image
                    style={s.addIcon}
                    source={require("../../assets/images/png/add.png")}
                  />
                )}
                {state.avatarURL && (
                  <Image
                    source={{ uri: state.avatarURL }}
                    style={{ width: 120, height: 120, borderRadius: 16 }}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View>
              <Text style={s.title}>Регистрация</Text>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={{ marginTop: 33 }}>
                <TextInput
                  style={s.input}
                  textAlign={"left"}
                  placeholder={"Логин"}
                  // onFocus={() => setIsShowKeyboard(true)}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={s.input}
                  textAlign={"left"}
                  placeholder={"Адрес электронной почты"}
                  // onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={s.input}
                  textAlign="left"
                  placeholder="Пароль"
                  secureTextEntry={isShowPassword}
                  // onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity
                  style={s.showPasswordWrapper}
                  activeOpacity={0.6}
                  onPress={showPassword}
                >
                  <Text style={s.showPassword}>
                    {isShowPassword ? "Показать" : "Скрыть"}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={s.btn}
                activeOpacity={0.6}
                onPress={handleSubmit}
              >
                <Text style={s.text}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <View style={{ marginTop: 16, alignItems: "center" }}>
                <Text onPress={() => navigation.navigate("Login")}>
                  Уже есть аккаунт? Войти
                </Text>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  photoContainer: {
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
  title: {
    textAlign: "center",
    fontSize: 30,
  },
  text: { textAlign: "center", color: "#fff" },
  form: {
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 82,
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    // fontSize: 16,
    // lineHeight: 19,
  },
  input: {
    fontSize: 16,
    lineHeight: 19,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    heigth: 50,
    color: "#212121",
  },
  showPasswordWrapper: {
    position: "absolute",
    top: 20,
    right: 16,
  },
  showPassword: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  btn: {
    padding: 16,
    marginTop: 43,
    borderRadius: 100,
    borderWidth: 1,
    ...Platform.select({
      ios: { borderColor: "#E8E8E8", backgroundColor: "#FF6C00" },
      android: { borderColor: "#E8E8E8", backgroundColor: "#FF6C00" },
    }),
  },
});
