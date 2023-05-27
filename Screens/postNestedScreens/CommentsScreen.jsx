import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import { useState, useEffect } from "react";

export const CommentsScreen = ({ navigation, route }) => {
  return (
    <View style={styles.header}>
      {/* <TouchableOpacity activeOpacity={0.5}>
        <Ionicons name="arrow-back-outline" size={24} color="transparent" />
      </TouchableOpacity> */}

      <Text style={styles.headerTitle}>Комменты</Text>
      {/* 
      <TouchableOpacity activeOpacity={0.7} onPress={navigation.goBack()}>
        <Feather name="log-out" size={24} color="#BDBDBD" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenWrapper: {
    flex: 1,

    display: "flex",
    flexDirection: "column",

    justifyContent: "space-between",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,

    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },

  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.4,
    textAlign: "center",
  },

  main: {
    flex: 1,

    paddingHorizontal: 16,
    paddingVertical: 32,

    // alignItems: "flex-start",
  },
});
