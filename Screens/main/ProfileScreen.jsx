import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useEffect, useState } from "react";

import {
  EvilIcons,
  Ionicons,
  Feather,
  SimpleLineIcons,
} from "@expo/vector-icons";

import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../src/redux/auth/authSellectors";
import * as operation from "../../src/redux/auth/authOperations";
import { uploadPhotoToFirebase } from "../../src/helpers/uploadPhotoToFirebase";
import { useNavigation } from "@react-navigation/native";
import { deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import * as dbCollection from "../../db/collections";

export const ProfileScreen = function () {
  const { id, userName, avatarURL } = useSelector(selectUser);
  const [avatar, setAvatar] = useState(avatarURL);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const [posts, setPosts] = useState([]);

  const isNoAvatar = avatarURL === null || avatarURL === "null";

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const getUserPosts = async () => {
    const userQuery = query(dbCollection.posts, where("uid", "==", id));

    onSnapshot(userQuery, (data) => {
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPosts(posts);
    });
  };

  const deletePost = async (postId) => {
    await deleteDoc(doc(dbCollection.posts, postId));
  };

  useEffect(() => {
    if (!isAvatarChanged) return;

    (async () => {
      const avatarURL = avatar
        ? await uploadPhotoToFirebase("avatars", avatar)
        : "null";

      dispatch(operation.updateUserAvatar(avatarURL));
    })();
  }, [isAvatarChanged]);

  useEffect(() => {
    setIsAvatarChanged(false);
  }, [avatarURL]);

  // get posts from firebase
  useEffect(() => {
    getUserPosts();
  }, []);

  const chooseAvatar = async () => {
    const avatar = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });
    if (avatar.canceled) return;

    setAvatar(avatar.assets[0].uri);
    setIsAvatarChanged(true);
  };

  const removeAvatar = () => {
    setAvatar(null);
    setIsAvatarChanged(true);
  };

  const logOut = () => {
    dispatch(operation.logOutUser());
  };

  return (
    <SafeAreaView
      style={{
        ...styles.container,
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

          {/* posts */}
          {posts.length > 0 && (
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <View style={styles.postCard}>
                  {/* delete posts button */}
                  <TouchableOpacity
                    style={styles.removePostButton}
                    activeOpacity={0.7}
                    onPress={() => deletePost(item.id)}
                  >
                    <Ionicons
                      style={styles.removePostButtonIcon}
                      name="add-outline"
                      size={25}
                    />
                  </TouchableOpacity>

                  <View style={styles.postCardThumb}>
                    <Image
                      source={{ uri: item.photoURL }}
                      style={styles.image}
                    />
                  </View>

                  <Text style={{ ...styles.description }}>
                    {item.description}
                  </Text>

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
                      activeOpacity={
                        item?.photoLocation?.latitude ||
                        item?.photoLocation?.longitude
                          ? 0.7
                          : 1
                      }
                      onPress={() => {
                        if (
                          item?.photoLocation?.latitude ||
                          item?.photoLocation?.longitude
                        ) {
                          navigation.navigate("MapScreen", {
                            coords: {
                              latitude: item.photoLocation.latitude,
                              longitude: item.photoLocation.longitude,
                            },
                            place: item.place,
                            description: item.description,
                          });
                        }
                      }}
                    >
                      {(item?.photoLocation?.latitude ||
                        item?.photoLocation?.longitude) && (
                        <SimpleLineIcons
                          name="location-pin"
                          size={24}
                          color="#BDBDBD"
                        />
                      )}
                      <Text style={styles.locationText}>{item.place}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          )}
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
    backgroundColor: "#FFFFFF",
    position: "relative",

    height: 520,

    paddingTop: 92,
    paddingBottom: 50,
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

  postCard: {
    display: "flex",
    gap: 8,
    marginBottom: 32,
  },

  postCardThumb: {
    position: "relative",

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

  removePostButton: {
    position: "absolute",
    margin: 0,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",

    width: 30,
    height: 30,

    right: 10,
    top: 10,

    backgroundColor: "#FF6C00",

    transform: [{ rotateZ: "45deg" }],

    borderWidth: 1,
    borderRadius: 50,
    zIndex: 2,
  },

  removePostButtonIcon: {
    color: "#FFFFFF",
    transform: [{ translateY: 0 }, { translateX: 0 }],
  },
});
