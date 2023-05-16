import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";

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
    <>
      {/* <RegistrationScreen /> */}
      <LoginScreen />
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//     justifyContent: "center",
//   },

//   appBg: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "flex-end",
//   },

//   form: {
//     // height: 665,

//     backgroundColor: "#FFFFFF",
//     position: "relative",

//     paddingTop: 92,
//     paddingBottom: 10,
//     paddingLeft: 16,
//     paddingRight: 16,

//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//   },

//   avtar: {
//     position: "absolute",
//     alignSelf: "center",
//     top: -60,

//     width: 120,
//     height: 120,
//     backgroundColor: "#F6F6F6",
//     borderRadius: 16,
//     zIndex: 100,
//   },

//   addButton: {
//     position: "absolute",

//     flex: 1,

//     alignItems: "center",
//     justifyContent: "center",

//     width: 25,
//     height: 25,

//     right: 0,
//     bottom: 14,
//     transform: [{ translateX: 25 / 2 }],

//     backgroundColor: "#FFFFFF",

//     borderColor: "#FF6C00",
//     borderWidth: 1,
//     borderRadius: 50,
//   },

//   formTitle: {
//     fontFamily: "Roboto-Medium",
//     fontSize: 30,
//     textAlign: "center",

//     marginBottom: 33,
//   },

//   inputsList: {},

//   textInputs: {
//     marginBottom: 16,
//     padding: 15,

//     color: "#BDBDBD",
//     backgroundColor: "#F6F6F6",

//     fontFamily: "Roboto-Regular",
//     fontSize: 16,

//     borderColor: "#E8E8E8",
//     borderWidth: 1,
//     borderRadius: 8,
//   },
// });
