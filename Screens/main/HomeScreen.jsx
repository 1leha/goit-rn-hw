import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";

import { BottomTabBar } from "../../src/BottomTabBar/BottomTabBar";
import { TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {
  const TabsNav = createBottomTabNavigator();

  const navigation = useNavigation();

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
          headerShown: false,
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
              activeOpacity={0.7}
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
