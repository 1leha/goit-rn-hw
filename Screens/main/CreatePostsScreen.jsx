import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { Feather, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { CustomButton } from "../../src/CustomButton";

import { useNavigation } from "@react-navigation/native";

import { db, storage } from "../../db/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import * as dbCollection from "../../db/collections";
import { uploadPhotoToFirebase } from "../../src/helpers/uploadPhotoToFirebase";

const initFormState = { description: "", place: "" };

export const CreatePostsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const [photo, setPhoto] = useState(null);

  const [photoLocation, setPhotoLocation] = useState(null);
  const [photoGeo, setPhotoGeo] = useState(null);

  const [formState, setFormState] = useState(initFormState);

  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const [isPlaceFocused, setIsPlaceFocused] = useState(false);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  // Camera permission
  useEffect(() => {
    // console.log("useEffect");
    if (!photoGeo) {
      // console.log("photoGeo>>>>>>> ", photoGeo);

      (async () => {
        let { status: cameraStatus } =
          await Camera.requestCameraPermissionsAsync();
        if (cameraStatus !== "granted") {
          console.log("Permission to camera access was denied!");
        }
        console.log("cameraStatus :>> ", cameraStatus);

        await MediaLibrary.requestPermissionsAsync();
        setHasCameraPermission(cameraStatus === "granted");

        let { status: locationStatus } =
          await Location.requestForegroundPermissionsAsync();

        if (locationStatus !== "granted") {
          console.log("Permission to access location was denied!");
        }
        // console.log("locationStatus :>> ", locationStatus);

        const location = await Location.getCurrentPositionAsync({});
        // console.log("location :>> ", location && "UPS!!!");

        if (location) {
          setPhotoLocation({
            latitude: location?.coords?.latitude ?? null,
            longitude: location?.coords?.longitude ?? null,
          });
          const geo = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          // console.log("geo :>> ", geo);
          setPhotoGeo({ city: geo[0].city, country: geo[0].country });
        }
      })();
    }
  }, []);

  const closeKeyBoard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onFocusDescriptionHandler = () => {
    setIsDescriptionFocused(true);
    setIsShowKeyboard(true);
  };

  const onFocusPlaceHandler = () => {
    setIsPlaceFocused(true);
    setIsShowKeyboard(true);
  };

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setPhoto(uri);

      setFormState((prevState) => ({
        ...prevState,
        place: `${photoGeo?.city ?? "Your city"}, ${
          photoGeo?.country ?? "Your country"
        }`,
      }));
    }
  };

  const publicPost = async () => {
    const photoURL = await uploadPhotoToFirebase("posts", photo);

    await addDoc(dbCollection.posts, {
      ...formState,
      photoLocation,
      photoURL,
      comments: 0,
    });

    navigation.navigate("PostsList");

    setPhoto(null);
    setFormState(initFormState);
  };

  const clearPost = () => {
    setPhoto(null);
    setFormState(initFormState);
  };

  return (
    <TouchableWithoutFeedback onPress={closeKeyBoard}>
      <SafeAreaView
        style={{
          ...styles.container,
          paddingBottom: insets.bottom,
        }}
      >
        {true && (
          <View style={styles.pageWrapper}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "heigh"}
            >
              <View style={styles.form}>
                <View style={styles.uploadImageContainer}>
                  <View style={styles.imageContainer}>
                    {photo ? (
                      <Image style={styles.image} source={{ uri: photo }} />
                    ) : (
                      <Camera
                        style={styles.camera}
                        ref={setCameraRef}
                        type={cameraType}
                        ratio="1:1"
                      />
                    )}

                    <TouchableOpacity
                      activeOpacity={photo || cameraRef ? 0.7 : 1}
                      onPress={takePhoto}
                      style={[
                        styles.cameraIconContainer,
                        (photo || cameraRef) && {
                          backgroundColor: "#FFFFFF55",
                        },
                      ]}
                    >
                      <MaterialIcons
                        name="camera-alt"
                        size={24}
                        color={photo ? "#FFFFFF" : "#BDBDBD"}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={{ ...styles.photoText }}>
                    {photo ? "Редактировать фото" : "Загрузите фото"}
                  </Text>
                </View>
                <TextInput
                  placeholder="Название..."
                  placeholderTextColor="#BDBDBD"
                  style={[
                    { ...styles.textInputs },
                    isDescriptionFocused && styles.inputIsFocused,
                  ]}
                  onFocus={onFocusDescriptionHandler}
                  onBlur={() => setIsDescriptionFocused(false)}
                  onChangeText={(value) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      description: value,
                    }))
                  }
                  value={formState.description}
                />

                <View style={styles.placeInputContainer}>
                  <SimpleLineIcons
                    style={styles.placeIcon}
                    name="location-pin"
                    size={24}
                    color="#BDBDBD"
                  />

                  <TextInput
                    placeholder="Местность..."
                    placeholderTextColor="#BDBDBD"
                    style={{ ...styles.placeInput }}
                    onFocus={onFocusPlaceHandler}
                    onBlur={() => setIsPlaceFocused(false)}
                    onChangeText={(value) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        place: value,
                      }))
                    }
                    value={formState.place}
                  />
                </View>

                <CustomButton
                  bgColor={photo ? "#FF6C00" : "#F6F6F6"}
                  textColor={photo ? "#FFFFFF" : "#BDBDBD"}
                  activeOpacity={photo ? 0.7 : 1}
                  onPress={publicPost}
                >
                  Опубликовать
                </CustomButton>
              </View>
            </KeyboardAvoidingView>

            <TouchableOpacity
              onPress={clearPost}
              activeOpacity={photo ? 0.7 : 1}
              style={styles.deleteButton}
            >
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 32,
    paddingHorizontal: 16,

    backgroundColor: "#FFFFFF",
  },

  pageWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    // borderWidth: 1,
  },

  uploadImageContainer: {
    marginBottom: 0,
  },

  imageContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",

    overflow: "hidden",

    borderWidth: 1,
    borderColor: "#E8E8E8",
  },

  camera: {
    position: "absolute",

    top: 0,
    left: 0,

    height: 240,
    width: "100%",

    borderWidth: 1,
    borderColor: "#E8E8E8",
  },

  image: {
    position: "absolute",

    top: 0,
    left: 0,

    height: 240,
    width: "100%",
  },

  cameraIconContainer: {
    // borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",

    width: 60,
    height: 60,

    borderRadius: 50,

    backgroundColor: "#FFFFFF",
  },

  form: {
    marginTop: 32,

    display: "flex",
    gap: 32,
    height: 600,
  },

  photoText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  textInputs: {
    paddingBottom: 15,

    color: "#212121",
    backgroundColor: "#FFFFFF",

    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,

    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
  },

  placeInputContainer: {
    display: "flex",
    flexDirection: "row",

    paddingLeft: 4,
    paddingBottom: 15,

    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },

  placeIcon: {
    marginRight: 8,
  },

  placeInput: {
    color: "#212121",
    backgroundColor: "#FFFFFF",

    flex: 1,

    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,

    // borderWidth: 1,
  },

  deleteButton: {
    marginTop: "auto",

    width: 70,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F6F6F6",
    borderRadius: 50,

    alignSelf: "center",
  },
});
