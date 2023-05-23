import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

export const BottomTabBar = ({ state, descriptors, navigation }) => {
  console.log("state :>> ", state);
  console.log("descriptors :>> ", descriptors);
  console.log("navigation :>> ", navigation);

  return (
    <>
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          console.log("route: ", route);

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          let ButtonIcon;

          switch (route.name) {
            case "PostsScreen":
              ButtonIcon = (props) => (
                <AntDesign name="appstore-o" {...props} />
              );
              break;

            case "CreatePostsScreen":
              ButtonIcon = (props) => (
                <Ionicons name="add-outline" {...props} />
              );
              break;

            case "ProfileScreen":
              ButtonIcon = (props) => <Feather name="user" {...props} />;
              break;

            default:
              break;
          }

          return (
            <TouchableOpacity
              key={index}
              style={[styles.tabButton, isFocused && styles.tabActiveButton]}
              activeOpacity={0.5}
              onPress={onPress}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
            >
              <ButtonIcon
                size={24}
                color="#212121AA"
                style={isFocused ? styles.iconActive : styles.icon}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,

    paddingHorizontal: 16,
    paddingTop: 9,

    borderTopWidth: 1,
    borderTopColor: "#BDBDBD",

    backgroundColor: "#FFFFFF",

    // borderWidth: 1,
  },

  addButton: {
    width: 70,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },

  icon: { color: "#212121AA" },
  iconActive: { color: "#FFFFFF" },

  tabButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: 70,
    height: 40,

    backgroundColor: "transparent",
    borderRadius: 50,
  },

  tabActiveButton: {
    backgroundColor: "#FF6C00",
  },
});
