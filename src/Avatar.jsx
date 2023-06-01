import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { DefaultUserIcon } from "./DefaultUserIcon";

export const Avatar = ({ uri, size = 60, ...props }) => {
  return (
    <View
      style={[
        { ...styles.avatarThumb, width: size, height: size },
        uri ?? styles.noAvatarThumb,
      ]}
    >
      <ImageBackground style={styles.avatar} source={{ uri: uri }}>
        {!uri && <DefaultUserIcon color="#BDBDBD" size={size / 2} {...props} />}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarThumb: {
    alignItems: "center",
    justifyContent: "center",

    // width: size,
    // height: size,

    marginRight: 8,

    color: "#fff",

    borderRadius: 16,
    overflow: "hidden",
  },

  avatar: {
    resizeMode: "cover",

    width: "100%",
    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },

  noAvatarThumb: {
    backgroundColor: "#F6F6F6",
    color: "#fff",
  },
});
