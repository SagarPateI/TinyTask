import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";

export default function TaskListScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Task List Screen Screen. Hello World!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  h1: {
    margin: 28,
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
});
