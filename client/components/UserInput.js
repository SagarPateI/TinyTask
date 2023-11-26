import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const UserInput = ({ name, value, setValue, autoCompleteType = "off", keyboardType = "default", secureTextEntry = false }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{name}</Text>
      <TextInput
        autoCorrect={false}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
      {/* USER INPUT (TEXT) WILL BE SENT TO setValue FUNCTION TO SET VALUE FOR THE STATE */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  label: {
    color: "#FFFFFF",
  },
  input: {
    borderBottomWidth: 0.5,
    height: 48,
    borderBottomColor: "#8e93a1",
    marginBottom: 30,
    color: "#ffffff",
  },
});

export default UserInput;
