import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { EvilIcons, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { deleteDoc, doc } from "firebase/firestore";
import * as dbCollection from "../db/collections";

export const PostCard = ({ userData, showDeletePostButton }) => {
  const deletePost = async (postId) => {
    await deleteDoc(doc(dbCollection.posts, postId));
  };

  return (
    <View style={styles.postCard}>
      {/* delete posts button */}

      {showDeletePostButton && (
        <TouchableOpacity
          style={styles.removePostButton}
          activeOpacity={0.7}
          onPress={() => deletePost(userData.id)}
        >
          <Ionicons
            style={styles.removePostButtonIcon}
            name="add-outline"
            size={25}
          />
        </TouchableOpacity>
      )}

      <View style={styles.postCardThumb}>
        <Image source={{ uri: userData.photoURL }} style={styles.image} />
      </View>

      <Text style={{ ...styles.description }}>{userData.description}</Text>

      <View style={styles.cardFooterWrapper}>
        {/* to Comments */}
        <TouchableOpacity
          style={styles.postComments}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("CommentsScreen", {
              postId: userData.id,
              photo: userData.photoURL,
            })
          }
        >
          <EvilIcons
            name="comment"
            size={32}
            color={userData.comments ? "#FF6C00" : "#BDBDBD"}
          />
          <Text
            style={{
              ...styles.commentsQuantity,
              color: userData.comments ? "#212121" : "#BDBDBD",
            }}
          >
            {userData.comments || 0}
          </Text>
        </TouchableOpacity>

        {/* to Map */}
        <TouchableOpacity
          style={styles.postLocation}
          activeOpacity={
            userData?.photoLocation?.latitude ||
            userData?.photoLocation?.longitude
              ? 0.7
              : 1
          }
          onPress={() => {
            if (
              userData?.photoLocation?.latitude ||
              userData?.photoLocation?.longitude
            ) {
              navigation.navigate("MapScreen", {
                coords: {
                  latitude: userData.photoLocation.latitude,
                  longitude: userData.photoLocation.longitude,
                },
                place: userData.place,
                description: userData.description,
              });
            }
          }}
        >
          {(userData?.photoLocation?.latitude ||
            userData?.photoLocation?.longitude) && (
            <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
          )}
          <Text style={styles.locationText}>{userData.place}</Text>
        </TouchableOpacity>
      </View>
    </View>
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

    borderRadius: 50,
    zIndex: 2,
  },

  removePostButtonIcon: {
    color: "#FFFFFF",
    transform: [{ translateY: 0 }, { translateX: 0 }],
  },
});
