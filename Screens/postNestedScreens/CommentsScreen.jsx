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
} from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";

import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const allComments = [
  { id: 1, comment: "Lorem ipsum1", name: "Dodz", userId: 1, avatar: null },
  { id: 2, comment: "Lorem ipsum2", name: "Alex", userId: 2, avatar: null },
  { id: 3, comment: "Lorem ipsum3", name: "Dodz", userId: 1, avatar: null },
  { id: 4, comment: "Lorem ipsum3", name: "Dodz", userId: 1, avatar: null },
  { id: 5, comment: "Lorem ipsum3", name: "Dodz", userId: 1, avatar: null },
  { id: 6, comment: "Lorem ipsum3", name: "Dodz", userId: 1, avatar: null },
  { id: 7, comment: "Lorem ipsum3", name: "Dodz", userId: 1, avatar: null },
  { id: 8, comment: "Lorem ipsum3", name: "Dodz", userId: 1, avatar: null },
];

const userId = 1;

export const CommentsScreen = () => {
  const [comment, setComment] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const navigation = useNavigation();
  const {
    params: { photo, postId },
  } = useRoute();

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        paddingBottom: insets.bottom,
      }}
    >
      <View style={styles.body}>
        <Image source={{ uri: photo }} style={styles.photo} />

        {/* Comments list */}
        <FlatList
          data={allComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.commentWrapper,
                flexDirection: userId === item.userId ? "row-reverse" : "row",
              }}
            >
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={styles.commentContainer}>
                <Text style={styles.comment}>{item.comment}</Text>
              </View>
            </View>
          )}
        />

        <View>
          <TextInput
            style={styles.input}
            value={comment}
            placeholder={"Коментувати..."}
            placeholderTextColor={"#BDBDBD"}
            onFocus={() => setIsShowKeyboard(true)}
            onChangeText={(value) => setComment(value)}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.commentButton}
            onPress={null}
          >
            <Feather name="arrow-up" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
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
    paddingBottom: 8,
    justifyContent: "space-between",
  },

  photo: {
    height: 240,
    borderRadius: 8,
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
    justifyContent: "center",
    alignItems: "center",
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

  commentContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    width: 299,
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
