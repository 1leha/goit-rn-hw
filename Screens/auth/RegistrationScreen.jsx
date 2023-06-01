// import React from "react";

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
import * as ImagePicker from "expo-image-picker";

import { useState } from "react";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { CustomButton } from "../../src/CustomButton";
import { QuestionButton } from "../../src/QuestionButton";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { storage } from "../../db/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "../../src/redux/auth/authSlice";
import { selectUser } from "../../src/redux/auth/authSellectors";
import * as operation from "../../src/redux/auth/authOperations";
import { uploadPhotoToFirebase } from "../../src/helpers/uploadPhotoToFirebase";

const initialUserState = {
  userName: "",
  email: "",
  password: "",
};

export const RegistrationScreen = function ({ navigation }) {
  const [avatar, setAvatar] = useState(null);
  const [newUser, setNewUser] = useState(initialUserState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [isShowPassword, setIsShowPassword] = useState(false);

  // console.log("userInState :>> ", userInState);
  // console.log("newUser :>> ", newUser);

  const dispatch = useDispatch();

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

  const onSubmitHandler = async () => {
    setNewUser(initialUserState);
    setIsShowPassword(false);
    closeKeyBoard();

    const avatarURL = avatar
      ? await uploadPhotoToFirebase("avatars", avatar)
      : null;
    // navigation.navigate("Home");
    // console.log("avatarURL :>> ", avatarURL);

    // console.log("submit form :>> ", { ...newUser, avatarURL });

    dispatch(operation.registerUser({ ...newUser, avatarURL }));
  };

  //setAvatar

  const chooseAvatar = async () => {
    const avatar = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });
    // console.log("avatar :>> ", avatar.assets);
    if (avatar.canceled) return;

    setAvatar(avatar.assets[0].uri);
  };

  const removeAvatar = () => {
    setAvatar(null);
  };

  const insets = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback onPress={closeKeyBoard}>
      <SafeAreaView
        style={{
          ...styles.container,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <ImageBackground
          source={require("../../assets/img/PhotoBG.jpg")}
          style={styles.appBg}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "heigh"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 280 : 45,
                height: isShowKeyboard ? 590 : 520,
              }}
            >
              {/* avatar */}
              <View style={styles.avtar}>
                <ImageBackground
                  source={{ uri: avatar }}
                  style={styles.avtarImg}
                />
                <TouchableOpacity
                  style={avatar ? styles.removeButton : styles.addButton}
                  activeOpacity={0.7}
                  onPress={avatar ? removeAvatar : chooseAvatar}
                >
                  <Ionicons
                    style={
                      avatar ? styles.removeButtonIcon : styles.addButtonIcon
                    }
                    name="add-outline"
                    size={25}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.formTitle}>Регистрация</Text>
              <ScrollView
                style={{
                  height: isShowKeyboard ? 160 : 311,
                }}
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
                      activeOpacity={0.7}
                      onPress={() => setIsShowPassword(!isShowPassword)}
                    >
                      <Text style={{ ...styles.showButtonText }}>Показать</Text>
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
                    onPress={() => navigation.navigate("Login")}
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
    backgroundColor: "#FFFFFF",
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
    zIndex: 100,
    borderRadius: 16,
  },

  avtarImg: {
    overflow: "hidden",
    borderRadius: 16,

    flex: 1,
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
    top: -1,

    color: "#FF6C00",
  },

  removeButton: {
    position: "absolute",
    margin: 0,
    padding: 0,

    width: 25,
    height: 25,

    right: 0,
    bottom: 14,
    transform: [{ translateX: 25 / 2 }, { rotateZ: "45deg" }],

    backgroundColor: "#FFFFFF",

    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 50,
  },

  removeButtonIcon: {
    top: -1,

    color: "#E8E8E8",
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
