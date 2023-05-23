import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";

import { BottomTabBar } from "../../src/BottomTabBar/BottomTabBar";
import { TouchableOpacity } from "react-native";

import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

export const HomeScreen = ({ navigation }) => {
  const TabsNav = createBottomTabNavigator();

  return (
    <TabsNav.Navigator
      tabBar={(props) => {
        const bottomBarIsShown =
          props.navigation.getState().index === 0 ||
          props.navigation.getState().index === 2;

        return bottomBarIsShown && <BottomTabBar {...props} />;
      }}
      initialRouteName="PostsScreen"
      options={{ headerBackVisible: true }}
    >
      <TabsNav.Screen
        options={{
          tabBarShowLabel: false,
          headerShown: true,
          title: "Публикации",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 17, fontWeight: 500 },
          headerBackVisible: true,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
        name="PostsScreen"
        component={PostsScreen}
      />

      <TabsNav.Screen
        options={{
          tabBarShowLabel: false,
          headerShown: true,
          headerBackVisible: true,
          title: "Создать публикацию",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 17, fontWeight: 500 },
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate("PostsScreen");
              }}
            >
              <Ionicons name="arrow-back-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
        name="CreatePostsScreen"
        component={CreatePostsScreen}
      />

      <TabsNav.Screen
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </TabsNav.Navigator>
  );
};
