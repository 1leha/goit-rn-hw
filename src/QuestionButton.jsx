import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const QuestionButton = ({ children, ...props }) => {
  return (
    <TouchableOpacity {...props} style={[styles.btn]}>
      <Text style={styles.btnText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 0,
  },

  btnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",

    color: "#1B4371",
  },
});
