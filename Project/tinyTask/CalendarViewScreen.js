import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";

export default function CalendarViewScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Calendar View Screen</Text>
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
