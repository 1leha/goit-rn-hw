import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { useState, useEffect } from "react";

import { SimpleLineIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { selectUser } from "../../src/redux/auth/authSellectors";

import { db, storage } from "../../db/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, onSnapshot } from "firebase/firestore";
import * as dbCollection from "../../db/collections";
import { Avatar } from "../../src/Avatar";

const DefaultUserIcon = ({ ...props }) => (
  <Feather name="user" size={24} {...props} />
);

export const PostsList = function () {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  // const { params } = useRoute();

  const insets = useSafeAreaInsets();

  const user = useSelector(selectUser);

  const getPosts = async () => {
    onSnapshot(dbCollection.posts, (data) => {
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPosts(posts);
      console.log("posts :>> ", posts);
    });
  };

  // get posts from firebase
  useEffect(() => {
    getPosts();
    console.log("useEffect posts :>> ", posts);
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
      {posts.length > 0 && (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <View style={styles.postCardThumb}>
                <Image source={{ uri: item.photoURL }} style={styles.image} />
              </View>

              <Text style={{ ...styles.description }}>{item.description}</Text>

              <View style={styles.cardFooterWrapper}>
                {/* to Comments */}
                <TouchableOpacity
                  style={styles.postComments}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate("CommentsScreen", {
                      postId: item.id,
                      photo: item.photoURL,
                    })
                  }
                >
                  <EvilIcons
                    name="comment"
                    size={32}
                    color={item.comments ? "#FF6C00" : "#BDBDBD"}
                  />
                  <Text
                    style={{
                      ...styles.commentsQuantity,
                      color: item.comments ? "#212121" : "#BDBDBD",
                    }}
                  >
                    {item.comments || 0}
                  </Text>
                </TouchableOpacity>

                {/* to Map */}
                <TouchableOpacity
                  style={styles.postLocation}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate("MapScreen", {
                      coords: {
                        latitude: item.photoLocation.latitude,
                        longitude: item.photoLocation.longitude,
                      },
                      place: item.place,
                      description: item.description,
                    })
                  }
                >
                  <SimpleLineIcons
                    name="location-pin"
                    size={24}
                    color="#BDBDBD"
                  />
                  <Text style={styles.locationText}>{item.place}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          // ItemSeparatorComponent={<View style={styles.separator}></View>}
        />
      )}

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
    // borderWidth: 1,
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
    // borderWidth: 1,
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
    // borderWidth: 1,
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
