import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  FlatList,
} from "react-native";

// import { useState } from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Feather } from "@expo/vector-icons";

const users = [
  { id: 1, userName: "Alex", email: "alex.PO@mail.com", avatar: null },
];

const DefaultUserIcon = ({ ...props }) => (
  <Feather name="user" size={24} {...props} />
);

export const PostsScreen = function () {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        // paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      {users && (
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <View
                style={[
                  styles.avatarThumb,
                  item.avatar ?? styles.noAvatarThumb,
                ]}
              >
                <ImageBackground source={null} style={styles.avtar}>
                  {!item.avatar && <DefaultUserIcon color="#BDBDBD" />}
                </ImageBackground>
              </View>

              <View style={styles.cardTextWrapper}>
                <Text style={{ ...styles.userName }}>{item.userName}</Text>
                <Text style={{ ...styles.email }}>{item.email}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={<View style={styles.separator}></View>}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,

    backgroundColor: "#FFFFFF",
  },

  main: {
    flex: 1,
  },

  userCard: {
    // borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  avatarThumb: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",

    width: 60,
    height: 60,

    paddingHorizontal: 8,
    paddingVertical: 8,
    marginRight: 8,

    resizeMode: "cover",
    color: "#fff",

    borderRadius: 16,
  },

  noAvatarThumb: {
    backgroundColor: "#F6F6F6",
    color: "#fff",
  },

  cardTextWrapper: {
    display: "flex",
    flexDirection: "column",
  },

  userName: {
    fontSize: 13,
    fontWeight: 700,
    lineHeight: 15,
    color: "#212121",
  },

  email: {
    fontSize: 11,
    fontWeight: 400,
    lineHeight: 13,
    color: "#212121aa",
  },

  separator: {
    marginVertical: 8,
    width: "100%",
    height: 1,
    backgroundColor: "#F6F6F6",
  },

  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 39,

    paddingHorizontal: 16,
    paddingTop: 9,

    borderTopWidth: 1,
    borderTopColor: "#BDBDBD",

    // borderWidth: 1,
  },

  addButton: {
    width: 70,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
});
