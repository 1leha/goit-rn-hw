import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PostsScreen } from "./PostsScreen";
import { CommentsScreen } from "./CommentsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { MapScreen } from "./MapScreen";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabBar } from "../../src/BottomTabBar/BottomTabBar";

export const HomeScreen = ({ navigation }) => {
  const TabsNav = createBottomTabNavigator();
  // const insets = useSafeAreaInsets();

  return (
    <>
      <TabsNav.Navigator
        tabBar={(props) => {
          return <BottomTabBar {...props} />;
        }}
        initialRouteName="PostsScreen"
        screenOptions={({ route }) => ({
          tabBarButton: (props) => {
            console.log(props);
            const isSellected = props.accessibilityState.selected;

            // console.log("isSellected>>>>>>>>> ", isSellected);

            return (
              <TouchableOpacity
                {...props}
                activeOpacity={0.5}
                style={[
                  styles.tabButton,
                  isSellected && styles.tabActiveButton,
                ]}
              />
            );
          },
          tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
              case "PostsScreen":
                return (
                  <AntDesign
                    name="appstore-o"
                    size={24}
                    color={focused ? "#FFFFFF" : color}
                  />
                );

              case "CreatePostsScreen":
                return (
                  <Ionicons
                    name="add-outline"
                    size={24}
                    color={focused ? "#FFFFFF" : color}
                  />
                );

              case "ProfileScreen":
                return (
                  <Feather
                    name="user"
                    size={24}
                    color={focused ? "#FFFFFF" : color}
                  />
                );

              default:
                break;
            }
          },

          // tabBarStyle: styles.buttonsContainer,
        })}
      >
        <TabsNav.Screen
          options={{ tabBarShowLabel: false, headerShown: false }}
          name="PostsScreen"
          component={PostsScreen}
        />

        <TabsNav.Screen
          options={{ tabBarShowLabel: false, headerShown: false }}
          name="CreatePostsScreen"
          component={CreatePostsScreen}
        />

        <TabsNav.Screen
          options={{ tabBarShowLabel: false, headerShown: false }}
          name="ProfileScreen"
          component={ProfileScreen}
        />
      </TabsNav.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    // alignSelf: "center",

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,

    // paddingHorizontal: 16,
    // paddingTop: 9,

    // borderTopWidth: 1,
    // borderTopColor: "#BDBDBD",

    borderWidth: 5,
  },

  icon: { inactive: { color: "#212121AA" }, active: { color: "#FFFFFF" } },

  tabButton: {
    width: 70,
    height: 40,

    backgroundColor: "transparent",
    borderRadius: 50,
    borderWidth: 1,
    // marginRight: 16,
  },

  tabActiveButton: {
    backgroundColor: "#FF6C00",
  },
});
