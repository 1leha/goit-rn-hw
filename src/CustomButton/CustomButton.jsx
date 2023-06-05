import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const CustomButton = ({
  children,
  bgColor = "#FF6C00",
  textColor = "#FFFFFF",
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.btn, { backgroundColor: bgColor }]}
    >
      <Text style={[styles.btnText, { color: textColor }]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingTop: 16,
    paddingBottom: 15,
    paddingLeft: 16,
    paddingRight: 16,

    borderRadius: 100,
  },

  btnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,

    textAlign: "center",
    // color: "#ffffff",
  },
});
