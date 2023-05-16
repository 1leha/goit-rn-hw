import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const CustomButton = ({ children, ...props }) => {
  return (
    <TouchableOpacity {...props} style={[styles.btn]}>
      <Text style={styles.btnText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingTop: 16,
    paddingBottom: 15,
    paddingLeft: 16,
    paddingRight: 16,

    color: "#ffffff",
    backgroundColor: "#FF6C00",

    borderRadius: 100,
  },

  btnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,

    textAlign: "center",
    color: "#ffffff",
  },
});
