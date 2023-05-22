import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { PostsScreen } from "./Screens/PostsScreen";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const MainNav = createStackNavigator();

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <MainNav.Navigator initialRouteName="Registration">
          <MainNav.Screen
            name="Registration"
            component={<RegistrationScreen />}
          />
          <MainNav.Screen name="Login" component={<LoginScreen />} />
          <MainNav.Screen name="Main" component={<PostsScreen />} />
        </MainNav.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
