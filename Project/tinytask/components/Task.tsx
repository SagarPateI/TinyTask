import React from "react";
import { View, StyleSheet } from "react-native";
import { useThemeColor, Text as ThemedText } from "./Themed";

interface TaskProps {
  text: string;
  backgroundColor?: string;
}

const Task: React.FC<TaskProps> = ({ text, backgroundColor = "#55BCF6" }) => {
  const textColor = useThemeColor({}, "text");

  const styles = StyleSheet.create({
    item: {
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
      backgroundColor: backgroundColor,
      opacity: 0.4,
      borderRadius: 5,
      marginRight: 15,
    },
    itemText: {
      maxWidth: "80%",
      color: textColor, // Applying Themed text color
    },
    circular: {
      width: 12,
      height: 12,
      borderColor: backgroundColor,
      borderWidth: 2,
      borderRadius: 5,
    },
  });

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={[styles.square, { backgroundColor }]}></View>
        <ThemedText style={styles.itemText}>{text}</ThemedText>
      </View>
      <View style={styles.circular}></View>
    </View>
  );
};

export default Task;
