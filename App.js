import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store";

import { AppRouter } from "./src/AppRouter";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppRouter />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
