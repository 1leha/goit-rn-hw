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
import { SafeAreaProvider } from "react-native-safe-area-context";

const initialUserState = {
  email: "",
  password: "",
};

export const LoginScreen = function () {
  const [user, setUser] = useState(initialUserState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [isShowPassword, setIsShowPassword] = useState(false);

  // console.log("isShowKeyboard :>> ", isShowKeyboard);
  // console.log("newUser :>> ", newUser);

  const closeKeyBoard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
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
    console.log("user :>> ", user);
    setUser(initialUserState);
    setIsShowPassword(false);

    closeKeyBoard();
  };

  return (
    <TouchableWithoutFeedback onPress={closeKeyBoard}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ImageBackground
            source={require("../assets/img/PhotoBG.jpg")}
            style={styles.appBg}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "heigh"}
            >
              <View
                style={{
                  ...styles.form,
                  paddingBottom: isShowKeyboard ? 280 : 45,
                  height: isShowKeyboard ? 505 : 455,
                }}
              >
                <Text style={styles.formTitle}>Войти</Text>
                <ScrollView
                  style={{ height: isShowKeyboard ? 505 : 245 }}
                  keyboardShouldPersistTaps="always"
                >
                  <View style={styles.inputsList}>
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
                        setUser((prevState) => ({
                          ...prevState,
                          email: value,
                        }))
                      }
                      value={user.email}
                    />

                    <View style={styles.passwordWrapper}>
                      <TextInput
                        textContentType="password"
                        placeholder="Пароль"
                        secureTextEntry={!isShowPassword}
                        placeholderTextColor="#BDBDBD"
                        keyboardType="default"
                        style={[
                          styles.textInputs,
                          isPasswordFocused && styles.inputIsFocused,
                        ]}
                        onFocus={onFocusPassowordHandler}
                        onBlur={() => setIsPasswordFocused(false)}
                        onChangeText={(value) =>
                          setUser((prevState) => ({
                            ...prevState,
                            password: value,
                          }))
                        }
                        value={user.password}
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
                      Войти
                    </CustomButton>

                    <QuestionButton
                      activeOpacity={0.7}
                      onPress={() =>
                        console.log("Нет аккаунта? Зарегистрироваться")
                      }
                    >
                      Нет аккаунта? Зарегистрироваться
                    </QuestionButton>
                  </View>
                </ScrollView>
              </View>
              <StatusBar style="auto" />
            </KeyboardAvoidingView>
          </ImageBackground>
        </SafeAreaView>
      </SafeAreaProvider>
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
    backgroundColor: "#FFFFFF",
    position: "relative",

    paddingTop: 32,
    paddingBottom: 45,
    paddingHorizontal: 16,

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

    flex: 1,

    alignItems: "center",
    justifyContent: "center",

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
