import { useState } from "react";
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
} from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Feather, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { CustomButton } from "../../src/CustomButton";

const initFormState = { description: "", place: "" };

export const CreatePostsScreen = () => {
  const insets = useSafeAreaInsets();
  const [photo, setPhoto] = useState(null);

  const [formState, setFormState] = useState(initFormState);

  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const [isPlaceFocused, setIsPlaceFocused] = useState(false);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

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

  return (
    <TouchableWithoutFeedback onPress={closeKeyBoard}>
      <SafeAreaView
        style={{
          ...styles.container,
          paddingBottom: insets.bottom,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "heigh"}
        >
          <View style={styles.form}>
            <View style={styles.uploadImageContainer}>
              <View style={styles.imageContainer}>
                {photo && <Image />}
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={null}
                  style={[
                    styles.cameraIconContainer,
                    photo && { backgroundColor: "#FFFFFF55" },
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
              onPress={null}
            >
              Опубликовать
            </CustomButton>
          </View>
        </KeyboardAvoidingView>
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

  uploadImageContainer: {
    marginBottom: 0,
  },

  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",

    borderWidth: 1,
    borderColor: "#E8E8E8",
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
    display: "flex",
    gap: 32,
    height: 600,
  },

  photoText: {
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
});
