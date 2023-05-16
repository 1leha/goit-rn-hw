import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";

// import { useState } from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

const users = [
  { id: 1, userName: "Alex", email: "alex.PO@mail.com", avatar: null },
  {
    id: 2,
    userName: "Veronika Brisse",
    email: "veronika.brisse@mail.com",
    avatar: null,
  },
  { id: 3, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 4, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 5, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 6, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 7, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 8, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 9, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 10, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 11, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 12, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 13, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 14, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 15, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 16, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 17, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 18, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 19, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 20, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
  { id: 21, userName: "Jim Kelsky", email: "Jim2022@mail.com", avatar: null },
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
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View style={styles.screenWrapper}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="arrow-back-outline" size={24} color="transparent" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Публикации</Text>

          <TouchableOpacity activeOpacity={0.5}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>

        <View style={styles.main}>
          {users && (
            <FlatList
              data={users}
              renderItem={({ item }) => (
                <View style={styles.userPostCard}>
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
                    <Text style={styles.userName}>{item.userName}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={<View style={styles.separator}></View>}
            />
          )}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="appstore-o" size={24} color="#212121AA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.addButton} activeOpacity={0.5}>
            <Ionicons name="add-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5}>
            <Feather name="user" size={24} color="#212121AA" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenWrapper: {
    flex: 1,

    display: "flex",
    flexDirection: "column",

    justifyContent: "space-between",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,

    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },

  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.4,
    textAlign: "center",
  },

  main: {
    flex: 1,

    paddingHorizontal: 16,
    paddingVertical: 32,

    // alignItems: "flex-start",
  },

  userPostCard: {
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
    gap: 0,
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
