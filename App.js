import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";
import { LoginScreen } from "./Screens/auth/LoginScreen";
import { HomeScreen } from "./Screens/main/HomeScreen";
import { MapScreen } from "./Screens/postNestedScreens/MapScreen";
import { CreatePostsScreen, PostsScreen } from "./Screens/main";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const AuthNav = createStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthNav.Navigator initialRouteName="Registration">
          <AuthNav.Screen
            options={{ headerShown: false }}
            name="Registration"
            component={RegistrationScreen}
          />
          <AuthNav.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <AuthNav.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
        </AuthNav.Navigator>
      </NavigationContainer>

      {/* <PostsScreen /> */}

      {/* <CreatePostsScreen /> */}
    </SafeAreaProvider>
  );
}
