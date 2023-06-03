import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useEffect, useState } from "react";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Ionicons, Feather } from "@expo/vector-icons";

import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { storage } from "../../db/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "../../src/redux/auth/authSlice";
import { selectUser } from "../../src/redux/auth/authSellectors";
import * as operation from "../../src/redux/auth/authOperations";
import { uploadPhotoToFirebase } from "../../src/helpers/uploadPhotoToFirebase";
import { useNavigation } from "@react-navigation/native";

export const ProfileScreen = function () {
  const { userName, avatarURL } = useSelector(selectUser);
  const [avatar, setAvatar] = useState(avatarURL);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);

  console.log("ProfileScreen avatarURL :>> ", avatarURL);
  console.log("ProfileScreen avatar: ", avatar);
  const isNoAvatar = avatarURL === null || avatarURL === "null";

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!avatarURL) return;
  //   setAvatar(avatarURL);
  // }, []);

  useEffect(() => {
    if (!isAvatarChanged) return;

    console.log("Avatar: ", avatar);

    (async () => {
      const avatarURL = avatar
        ? await uploadPhotoToFirebase("avatars", avatar)
        : "null";
      // console.log("avatarURL :>> ", avatarURL);

      dispatch(operation.updateUserAvatar(avatarURL));
      // setIsAvatarChanged(false);
    })();
  }, [isAvatarChanged]);

  useEffect(() => {
    setIsAvatarChanged(false);
  }, [avatarURL]);

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
    setIsAvatarChanged(true);
  };

  const removeAvatar = () => {
    setAvatar(null);
    setIsAvatarChanged(true);

    // console.log("removeAvatar");
  };

  const logOut = () => {
    dispatch(operation.logOutUser());
  };

  return (
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
        <View
          style={{
            ...styles.body,
          }}
        >
          {/* avatar */}
          <View style={styles.avtar}>
            <ImageBackground
              source={{ uri: avatar || avatarURL }}
              style={styles.avtarImg}
            />
            {!isAvatarChanged && (
              <TouchableOpacity
                style={isNoAvatar ? styles.addButton : styles.removeButton}
                activeOpacity={0.7}
                onPress={isNoAvatar ? chooseAvatar : removeAvatar}
              >
                <Ionicons
                  style={
                    isNoAvatar ? styles.addButtonIcon : styles.removeButtonIcon
                  }
                  name="add-outline"
                  size={25}
                />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.7}
            onPress={logOut}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>

          <Text style={styles.userName}>{userName}</Text>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </SafeAreaView>
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

  body: {
    // height: 509,

    backgroundColor: "#FFFFFF",
    position: "relative",

    // paddingBottom: 45,
    height: 520,

    paddingTop: 92,
    paddingBottom: 50,
    paddingHorizontal: 16,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    // borderWidth: 1,
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

  userName: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",

    marginBottom: 33,
  },

  logoutButton: {
    position: "absolute",
    top: 24,
    right: 24,
  },
});
