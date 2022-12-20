import { StatusBar } from "expo-status-bar";
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
} from "react-native";

import { useState, useEffect } from "react";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const { width } = useWindowDimensions();
  // console.log("width: ", width);
  // const [dimensions, setDimensions] = useState(width - 16 * 2);
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState();
  const [isShowPassword, setIsShowPassword] = useState(true);

  const showPassword = () => {
    if (isShowPassword) {
      return setIsShowPassword(false);
    }
    setIsShowPassword(true);
  };

  // useEffect(() => {
  //   const onChange = () => {
  //     const { width } = useWindowDimensions();
  //     console.log("width:", width);
  //   };
  //   Dimensions.addEventListener("change", onChange);
  //   return () => {
  //     Dimensions.removeEventListener("change", onChange);
  //   };
  // }, []);

  // при скрытии клавы делаем следующее
  const keyBoardHide = () => {
    // setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log("login-state", state);
    // в стейт записывает начальный пустой
    setState(initialState);
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

  // console.log("isShowKeyboard: ", isShowKeyboard);
  return (
    <View style={s.container}>
      <ImageBackground
        source={require("../../assets/PhotoBG.png")}
        style={s.bgImage}
      >
        {/* закрытие клавиатуры когда нажимаем вне формы */}
        <TouchableWithoutFeedback onPress={keyBoardHide}>
          {/* не работает */}
          <View
            style={{
              ...s.form,
              marginBottom: isShowKeyboard ? -200 : 0,
              width: width,
            }}
          >
            <View>
              <Text style={s.title}>Войти</Text>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={{ marginTop: 32 }}>
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
                onPress={keyBoardHide}
              >
                <Text style={s.text}>Войти</Text>
              </TouchableOpacity>
              <View style={{ marginTop: 16, alignItems: "center" }}>
                <Text onPress={() => navigation.navigate("Register")}>
                  Нет аккаунта? Зарегистрироваться
                </Text>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    // alignItems: "center",
    // justifyContent: "center",
    // justifyContent: "flex-end",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    // alignItems: "center",
    justifyContent: "flex-end",
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
    paddingBottom: 100,
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    fontSize: 16,
    lineHeight: 19,
  },
  input: {
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
    // borderWidth: 1,
    ...Platform.select({
      ios: { borderColor: "#E8E8E8", backgroundColor: "#FF6C00" },
      android: { borderColor: "#E8E8E8", backgroundColor: "#FF6C00" },
    }),
  },
});
