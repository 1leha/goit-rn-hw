import { StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsListScreen } from "../postNestedScreens/PostsListScreen";
import { MapScreen } from "../postNestedScreens/MapScreen";
import { CommentsScreen } from "../postNestedScreens/CommentsScreen";

import { Ionicons, Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as operation from "../../redux/auth/authOperations";

export const PostsScreen = function () {
  const PostsNav = createBottomTabNavigator();
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(operation.logOutUser());
  };

  return (
    <SafeAreaView
      style={{
        ...styles.container,
      }}
    >
      <PostsNav.Navigator initialRouteName="PostsListScreen">
        <PostsNav.Screen
          name="PostsListScreen"
          component={PostsListScreen}
          options={{
            headerShown: true,
            tabBarStyle: { display: "none" },
            title: "Публикации",
            headerTitleAlign: "center",
            headerTitleStyle: { fontSize: 17, fontWeight: 500 },
            headerBackVisible: true,
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 16 }}
                activeOpacity={0.7}
                onPress={logOut}
              >
                <Feather name="log-out" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            ),
          }}
        />

        <PostsNav.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            headerShown: true,
            tabBarStyle: { display: "none" },
            title: "Карта",
            headerTitleAlign: "center",
            headerTitleStyle: { fontSize: 17, fontWeight: 500 },
            headerBackVisible: true,
            headerShown: true,
            tabBarStyle: { display: "none" },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 16 }}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate("PostsListScreen");
                }}
              >
                <Ionicons name="arrow-back-outline" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            ),
          }}
        />

        <PostsNav.Screen
          name="CommentsScreen"
          component={CommentsScreen}
          options={{
            title: "Комментарии",
            headerTitleAlign: "center",
            headerTitleStyle: { fontSize: 17, fontWeight: 500 },
            headerBackVisible: true,
            headerShown: true,
            tabBarStyle: { display: "none" },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 16 }}
                activeOpacity={0.5}
                onPress={() => {
                  navigation.navigate("PostsListScreen");
                }}
              >
                <Ionicons name="arrow-back-outline" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            ),
          }}
        />
      </PostsNav.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  postCard: {
    display: "flex",
    gap: 8,
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
