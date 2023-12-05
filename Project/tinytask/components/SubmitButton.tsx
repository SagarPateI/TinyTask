import React, { FC } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

interface SubmitButtonProps {
  title: string;
  handleSubmit: () => void;
  loading: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({
  title,
  handleSubmit,
  loading,
}) => (
  <TouchableOpacity onPress={handleSubmit} style={styles.button}>
    <Text style={styles.buttonText}>{loading ? "Please wait..." : title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2C643E",
    height: 50,
    justifyContent: "center",
    marginHorizontal: 45,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold", // Adjust styles here as per your requirements
    textAlign: "center",
    fontSize: 16,
  },
});

export default SubmitButton;
