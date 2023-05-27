import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { useState, useEffect } from "react";

import { SimpleLineIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";

const user = {
  id: 1,
  userName: "Alex",
  email: "alex.PO@mail.com",
  avatar: null,
};

// const posts = [
//   {
//     id: 1,
//     description: "Предмет",
//     myLocation: {
//       latitude: 1.125012,
//       longitude: 2.5217617,
//     },
//     photo:
//       "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%25401leha%252Fgoit-rn-hw/Camera/80fcef52-616c-45b0-978a-237862a993ab.jpg",
//     place: "Якесь місто, Украина",
//   },
//   {
//     id: 2,
//     description: "Предмет",
//     myLocation: {
//       latitude: 30.125012,
//       longitude: 40.5217617,
//     },
//     photo:
//       "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%25401leha%252Fgoit-rn-hw/Camera/80fcef52-616c-45b0-978a-237862a993ab.jpg",
//     place: "Місто, Украина",
//   },
// ];

const DefaultUserIcon = ({ ...props }) => (
  <Feather name="user" size={24} {...props} />
);

export const PostsList = function () {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const { params } = useRoute();

  const insets = useSafeAreaInsets();

  // Emulation DB
  useEffect(() => {
    if (!params) {
      return;
    }
    setPosts((prev) => [...prev, { ...params, id: prev.length + 1 }]);
  }, [params]);

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        paddingBottom: insets.bottom,
      }}
    >
      {/* user */}
      <View style={styles.userCard}>
        <View style={[styles.avatarThumb, user.avatar ?? styles.noAvatarThumb]}>
          <ImageBackground source={null} style={styles.avtar}>
            {!user.avatar && <DefaultUserIcon color="#BDBDBD" />}
          </ImageBackground>
        </View>

        <View style={styles.cardTextWrapper}>
          <Text style={{ ...styles.userName }}>{user.userName}</Text>
          <Text style={{ ...styles.email }}>{user.email}</Text>
        </View>
      </View>

      {/* posts */}
      {posts.length > 0 && (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <View style={styles.postCardThumb}>
                <Image source={{ uri: item.photo }} style={styles.image} />
              </View>

              <Text style={{ ...styles.description }}>{item.description}</Text>

              <View style={styles.cardFooterWrapper}>
                {/* to Comments */}
                <TouchableOpacity
                  style={styles.postComments}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate("CommentsScreen", {
                      postId: item.id,
                      photo: item.photo,
                    })
                  }
                >
                  <EvilIcons
                    name="comment"
                    size={32}
                    color={item.comments ? "#FF6C00" : "#BDBDBD"}
                  />
                  <Text
                    style={{
                      ...styles.commentsQuantity,
                      color: item.comments ? "#212121" : "#BDBDBD",
                    }}
                  >
                    {item.comments || 0}
                  </Text>
                </TouchableOpacity>

                {/* to Map */}
                <TouchableOpacity
                  style={styles.postLocation}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate("MapScreen", {
                      coords: {
                        latitude: item.myLocation.latitude,
                        longitude: item.myLocation.longitude,
                      },
                      place: item.place,
                      description: item.description,
                    })
                  }
                >
                  <SimpleLineIcons
                    name="location-pin"
                    size={24}
                    color="#BDBDBD"
                  />
                  <Text style={styles.locationText}>{item.place}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={<View style={styles.separator}></View>}
        />
      )}
      {/* </View> */}
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

  main: {
    flex: 1,
  },

  userCard: {
    // borderWidth: 1,
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
    // borderWidth: 1,
    display: "flex",
    gap: 8,
    marginBottom: 32,
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
