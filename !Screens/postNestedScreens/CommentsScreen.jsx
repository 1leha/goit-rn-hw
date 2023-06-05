import {
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";

import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as dbCollection from "../../db/collections";
import { addDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../src/redux/auth/authSellectors";
import { Avatar } from "../../src/Avatar";
import { formatDate } from "../../src/helpers/formatDate";

export const CommentsScreen = () => {
  const { id: userId, avatarURL } = useSelector(selectUser);
  const {
    params: { photo, postId },
  } = useRoute();

  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const closeKeyBoard = () => {
    if (!isShowKeyboard) return;
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const getComments = () => {
    onSnapshot(dbCollection.comments(postId), (data) => {
      const comments = data.docs
        .map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        })
        .sort((a, b) => b.createdAt - a.createdAt);
      console.log("comments :>> ", comments);
      setCommentsList(comments);
    });
  };

  // get comments from firebase
  useEffect(() => {
    getComments();
    console.log("useEffect commentsList :>> ", commentsList);

    return () => setCommentsList(null);
  }, [postId]);

  const publishComment = async () => {
    if (!comment) return;

    await addDoc(dbCollection.comments(postId), {
      userId,
      avatarURL,
      comment,
      createdAt: Date.now(),
    });

    await updateDoc(dbCollection.postRef(postId), {
      comments: commentsList.length + 1,
    });

    setComment("");
    closeKeyBoard();
  };

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        paddingBottom: insets.bottom,
        gap: 32,
      }}
    >
      <View
        style={{
          ...styles.body,
          paddingBottom: isShowKeyboard ? 230 : 8,
        }}
      >
        {/* Comments list */}
        <FlatList
          data={commentsList}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <Image source={{ uri: photo }} style={styles.photo} />
          }
          renderItem={({ item }) => {
            const isOwner = userId === item.userId;

            return (
              <View
                style={{
                  ...styles.commentWrapper,
                  flexDirection: isOwner ? "row-reverse" : "row",
                }}
              >
                <Avatar size={28} uri={item.avatarURL} />
                <View
                  style={[
                    styles.commentBox,
                    isOwner ? styles.radiusLeft : styles.radiusRight,
                  ]}
                >
                  <Text style={styles.comment}>{item.comment}</Text>
                  <Text
                    style={{
                      ...styles.commentData,
                      textAlign: isOwner ? "left" : "right",
                    }}
                  >
                    {formatDate(item.createdAt)}
                  </Text>
                </View>
              </View>
            );
          }}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "heigh"}
        >
          <View>
            <TextInput
              style={styles.input}
              value={comment}
              placeholder={"Коментувати..."}
              placeholderTextColor={"#BDBDBD"}
              onFocus={() => setIsShowKeyboard(true)}
              onBlur={closeKeyBoard}
              onChangeText={(value) => setComment(value)}
            />
            <TouchableOpacity
              activeOpacity={comment ? 0.7 : 1}
              style={{
                ...styles.commentButton,
                backgroundColor: comment ? "#FF6C00" : "#E8E8E8",
              }}
              onPress={publishComment}
            >
              <Feather
                name="arrow-up"
                size={24}
                color={comment ? "#FFFFFF" : "#BDBDBD"}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
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

  body: {
    flex: 1,

    display: "flex",
    gap: 32,
    justifyContent: "space-between",
  },

  photo: {
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },

  input: {
    backgroundColor: "#F6F6F6",
    color: "#212121",
    borderColor: "#E8E8E8",
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    fontSize: 16,
    lineHeight: 19,
    paddingLeft: 16,
    paddingRight: 50,
  },

  commentWrapper: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },

  commentButton: {
    backgroundColor: "#FF6C00",
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  commentBox: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    marginBottom: 24,
  },
  radiusLeft: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  radiusRight: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },

  comment: {
    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontSize: 13,
    marginBottom: 8,
  },

  commentData: {
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    fontSize: 10,
  },

  avatar: {
    overflow: "hidden",
    resizeMode: "cover",
    height: 28,
    width: 28,
    borderRadius: 50,
  },
});
