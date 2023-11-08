import React from "react";
import { View, StyleSheet } from "react-native";
import {
  useThemeColor,
  Text as ThemedText,
  View as ThemedView,
} from "./Themed";

interface TaskProps {
  text: string;
  backgroundColor?: string;
}

const Task: React.FC<TaskProps> = ({ text }) => {
  const backgroundColor = useThemeColor(
    {
      light: "#ffffff",
      dark: "#000000",
    },
    "background"
  );

  const styles = StyleSheet.create({
    item: {
      backgroundColor,
      padding: 15,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    itemLeft: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },
    square: {
      width: 24,
      height: 24,
      backgroundColor: "#55BCF6",
      opacity: 0.4,
      borderRadius: 5,
      marginRight: 15,
    },
    itemText: {
      maxWidth: "80%",
    },
    circular: {
      width: 12,
      height: 12,
      borderColor: "#55BCF6",
      borderWidth: 2,
      borderRadius: 5,
    },
  });

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <ThemedText style={styles.itemText}>{text}</ThemedText>
      </View>
      <View style={styles.circular}></View>
    </View>
  );
};

export default Task;
