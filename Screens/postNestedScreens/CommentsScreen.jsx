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
import { addDoc, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../src/redux/auth/authSellectors";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "../../src/Avatar";

export const CommentsScreen = () => {
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const {
    params: { photo, postId },
  } = useRoute();

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { id: userId, avatarURL } = useSelector(selectUser);

  const closeKeyBoard = () => {
    if (!isShowKeyboard) return;
    console.log("closeKeyBoard");
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const getComments = () => {
    onSnapshot(dbCollection.comments(postId), (data) => {
      const comments = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
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
    console.log("publishComment", { userId, avatarURL, comment });

    const uploadedComment = await addDoc(dbCollection.comments(postId), {
      userId,
      avatarURL,
      comment,
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
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.commentWrapper,
                flexDirection: userId === item.userId ? "row-reverse" : "row",
              }}
            >
              {/* <Image source={{ uri: item.avatarURL }} style={styles.avatar} /> */}
              <Avatar size={28} uri={item.avatarURL} />
              <View style={styles.commentBox}>
                <Text style={styles.comment}>{item.comment}</Text>
              </View>
            </View>
          )}
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
              activeOpacity={0.7}
              style={styles.commentButton}
              onPress={publishComment}
            >
              <Feather name="arrow-up" size={24} color="#FFFFFF" />
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
    // borderWidth: 1,
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
    borderRadius: 6,
  },

  avatar: {
    overflow: "hidden",
    resizeMode: "cover",
    height: 28,
    width: 28,
    borderRadius: 50,
  },

  comment: {
    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontSize: 13,
  },
});
