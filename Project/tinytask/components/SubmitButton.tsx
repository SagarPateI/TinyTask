import React, { FC } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
} from "react-native";

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
    <View style={styles.buttonContent}>
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#584277",
    height: 50,
    justifyContent: "center",
    marginHorizontal: 45,
    marginBottom: 20,
    borderRadius: 10,
  },

  buttonContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold", // Adjust styles here as per your requirements
    textAlign: "center",
    fontSize: 16,
  },
});

export default SubmitButton;
