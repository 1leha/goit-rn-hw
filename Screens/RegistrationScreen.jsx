import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
} from "react-native";

import { useState } from "react";

import { CustomButton } from "../src/CustomButton";
import { QuestionButton } from "../src/QuestionButton";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const initialUserState = {
  userName: "",
  email: "",
  password: "",
  avatar: null,
};

export const RegistrationScreen = function () {
  const [avatar, setAvatar] = useState(null);
  const [newUser, setNewUser] = useState(initialUserState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [isShowPassword, setIsShowPassword] = useState(false);

  // console.log("isShowKeyboard :>> ", isShowKeyboard);
  // console.log("newUser :>> ", newUser);

  const closeKeyBoard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onFocusUserNameHandler = () => {
    setIsUsernameFocused(true);
    setIsShowKeyboard(true);
  };

  const onFocusEmailHandler = () => {
    setIsEmailFocused(true);
    setIsShowKeyboard(true);
  };

  const onFocusPassowordHandler = () => {
    setIsPasswordFocused(true);
    setIsShowKeyboard(true);
  };

  const onSubmitHandler = () => {
    console.log("newUser :>> ", newUser);
    setNewUser(initialUserState);
    setIsShowPassword(false);
    closeKeyBoard();
  };

  return (
    <TouchableWithoutFeedback onPress={closeKeyBoard}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("../assets/img/PhotoBG.jpg")}
          style={styles.appBg}
        >
          <KeyboardAvoidingView
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 5 : 45,
              }}
            >
              <ImageBackground source={avatar} style={styles.avtar}>
                <TouchableOpacity style={styles.addButton} activeOpacity={0.5}>
                  <Ionicons
                    style={styles.addButtonIcon}
                    name="add-outline"
                    size={25}
                  />
                </TouchableOpacity>
              </ImageBackground>

              <Text style={styles.formTitle}>Регистрация</Text>
              <ScrollView
                style={{ height: isShowKeyboard ? 150 : 311 }}
                keyboardShouldPersistTaps="always"
              >
                <View style={styles.inputsList}>
                  <TextInput
                    placeholder="Логин"
                    textContentType="username"
                    placeholderTextColor="#BDBDBD"
                    style={[
                      styles.textInputs,
                      isUsernameFocused && styles.inputIsFocused,
                    ]}
                    onFocus={onFocusUserNameHandler}
                    onBlur={() => setIsUsernameFocused(false)}
                    onChangeText={(value) =>
                      setNewUser((prevState) => ({
                        ...prevState,
                        userName: value,
                      }))
                    }
                    value={newUser.userName}
                  />

                  <TextInput
                    placeholder="Адрес электронной почты"
                    textContentType="emailAddress"
                    placeholderTextColor="#BDBDBD"
                    keyboardType="email-address"
                    style={[
                      styles.textInputs,
                      isEmailFocused && styles.inputIsFocused,
                    ]}
                    onFocus={onFocusEmailHandler}
                    onBlur={() => setIsEmailFocused(false)}
                    onChangeText={(value) =>
                      setNewUser((prevState) => ({
                        ...prevState,
                        email: value,
                      }))
                    }
                    value={newUser.email}
                  />

                  <View style={styles.passwordWrapper}>
                    <TextInput
                      textContentType="password"
                      placeholder="Пароль"
                      secureTextEntry={!isShowPassword}
                      placeholderTextColor="#BDBDBD"
                      style={[
                        styles.textInputs,
                        isPasswordFocused && styles.inputIsFocused,
                      ]}
                      onFocus={onFocusPassowordHandler}
                      onBlur={() => setIsPasswordFocused(false)}
                      onChangeText={(value) =>
                        setNewUser((prevState) => ({
                          ...prevState,
                          password: value,
                        }))
                      }
                      value={newUser.password}
                    />

                    <TouchableOpacity
                      style={styles.showButton}
                      activeOpacity={0.5}
                      onPress={() => setIsShowPassword(!isShowPassword)}
                    >
                      <Text style={styles.showButtonText}>Показать</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.buttonWrapper}>
                  <CustomButton
                    style={styles.registerButton}
                    activeOpacity={0.7}
                    onPress={onSubmitHandler}
                  >
                    Зарегистрироваться
                  </CustomButton>

                  <QuestionButton
                    activeOpacity={0.7}
                    onPress={() => console.log("Уже есть аккаунт? Войти")}
                  >
                    Уже есть аккаунт? Войти
                  </QuestionButton>
                </View>
              </ScrollView>
            </View>
            <StatusBar style="auto" />
          </KeyboardAvoidingView>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  appBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  form: {
    // height: 509,

    backgroundColor: "#FFFFFF",
    position: "relative",

    paddingTop: 92,
    paddingBottom: 50,
    paddingHorizontal: 16,

    // marginTop: 100,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  avtar: {
    position: "absolute",
    alignSelf: "center",
    top: -60,

    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    zIndex: 100,
  },

  addButton: {
    position: "absolute",
    margin: 0,
    padding: 0,

    width: 25,
    height: 25,

    right: 0,
    bottom: 14,
    transform: [{ translateX: 25 / 2 }],

    backgroundColor: "#FFFFFF",

    borderColor: "#FF6C00",
    borderWidth: 1,
    borderRadius: 50,
  },

  addButtonIcon: {
    // transform: [{ translateY: -2 }],
    top: -1,

    color: "#FF6C00",
  },

  formTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",

    marginBottom: 33,
  },

  inputsList: {
    display: "flex",
    gap: 16,

    marginBottom: 43,
  },

  textInputs: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,

    color: "#212121",
    backgroundColor: "#F6F6F6",

    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },

  inputIsFocused: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
  },

  passwordWrapper: {
    position: "relative",
  },

  buttonWrapper: {
    display: "flex",
    gap: 16,
  },

  showButton: {
    position: "absolute",
    right: 0,
    paddingTop: 14,
    paddingBottom: 14,
    paddingRight: 16,
    transform: [{ translateY: 0 }],
  },

  showButtonText: {
    color: "#1B4371",

    fontWeight: 400,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },

  registerButton: { marginBottom: 16 },
});
