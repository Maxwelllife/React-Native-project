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
  Dimensions,
  useWindowDimensions,
} from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useState, useEffect } from "react";

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};
const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function App() {
  const { width } = useWindowDimensions();
  // const [dimensions, setDimensions] = useState(width - 16 * 2);
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState();
  const [isReady, setIsReady] = useState(false);

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

  if (!isReady) {
    <AppLoading
      startAsync={loadApplication}
      onFinish={() => setIsReady(true)}
      onError={() => console.warn}
    />;
  }
  // при скрытии клавы делаем следующее
  const keyBoardHide = () => {
    // setIsShowKeyboard(false);
    Keyboard.dismiss();
    // console.log(state);
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

  console.log("isShowKeyboard: ", isShowKeyboard);
  return (
    <View style={s.container}>
      {/* закрытие клавиатуры когда нажимаем вне формы */}
      <TouchableWithoutFeedback onPress={keyBoardHide}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {/* не работает */}
          <View
            style={{
              ...s.form,
              marginBottom: isShowKeyboard ? 20 : 200,
              width: width - 16 * 2,
            }}
          >
            <View>
              <Text style={s.title}>Регистрация</Text>
            </View>

            <View style={{ marginTop: 33 }}>
              <TextInput
                style={s.input}
                textAlign={"left"}
                placeholder={"Логин"}
                // placeholderTextColor="red"
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
                secureTextEntry={true}
                // onFocus={() => setIsShowKeyboard(true)}
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
            </View>
            <TouchableOpacity
              style={s.btn}
              activeOpacity={0.6}
              onPress={keyBoardHide}
            >
              <Text style={s.text}>Зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
  },
  text: { textAlign: "center", color: "#fff" },
  form: {},
  input: {
    paddingLeft: 10,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    heigth: 50,
    color: "#212121",
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
