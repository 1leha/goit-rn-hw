import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { useState, useEffect } from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSellectors";

import { onSnapshot } from "firebase/firestore";
import * as dbCollection from "../../../db/collections";
import { Avatar } from "../../Avatar";
import { PostList } from "../../PostList";

export const PostsListScreen = function () {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  const insets = useSafeAreaInsets();

  const user = useSelector(selectUser);

  const getPosts = async () => {
    onSnapshot(dbCollection.posts, (data) => {
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPosts(posts);
    });
  };

  // get posts from firebase
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        paddingBottom: insets.bottom,
      }}
    >
      {/* user */}
      {user.id && (
        <TouchableOpacity
          style={styles.userCard}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Avatar size={60} uri={user.avatarURL} />

          <View style={styles.cardTextWrapper}>
            <Text style={{ ...styles.userName }}>{user.userName}</Text>
            <Text style={{ ...styles.email }}>{user.email}</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* posts */}
      {posts.length > 0 && <PostList posts={posts} />}

      {/* </View> */}
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",

    marginBottom: 32,
  },

  avatarThumb: {
    alignItems: "center",
    justifyContent: "center",

    width: 60,
    height: 60,

    paddingHorizontal: 8,
    paddingVertical: 8,
    marginRight: 8,

    color: "#fff",

    borderRadius: 16,
    overflow: "hidden",
  },

  avatar: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    overflow: "hidden",

    justifyContent: "center",
    alignItems: "center",
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

  postCard: {
    display: "flex",
    gap: 8,
    marginBottom: 32,
  },

  postCardThumb: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    height: 240,

    borderRadius: 8,
    overflow: "hidden",
  },

  image: {
    flex: 1,
    height: 240,
    width: "100%",
  },

  description: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,

    color: "#212121",
  },

  cardFooterWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginTop: 0,
  },

  postComments: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  commentsQuantity: {
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 9,
  },

  postLocation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  locationText: {
    marginLeft: 8,

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",

    color: "#212121",
  },
});
