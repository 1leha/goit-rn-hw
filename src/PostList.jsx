import React from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { EvilIcons, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { deleteDoc, doc } from "firebase/firestore";
import * as dbCollection from "../db/collections";

export const PostList = ({ posts, showDeletePostButton = false }) => {
  const deletePost = async (postId) => {
    await deleteDoc(doc(dbCollection.posts, postId));
  };

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <View style={styles.postCard}>
          {/* delete posts button */}

          {showDeletePostButton && (
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
          )}

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
              activeOpacity={
                item?.photoLocation?.latitude || item?.photoLocation?.longitude
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
  );
};

const styles = StyleSheet.create({
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
