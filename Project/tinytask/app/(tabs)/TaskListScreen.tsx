import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import Task from "../../components/Task";
import {
  Text as ThemedText,
  View as ThemedView,
  useThemeColor,
} from "../../components/Themed";

const TaskListScreen: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [taskItems, setTaskItems] = useState<string[]>([]);

    const backgroundColor = useThemeColor(
      {
        light: "#f0f0f0", // Light gray background color
        dark: "#333333", // Dark gray background color
      },
      "background"
    );

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task.trim() !== "") {
      setTaskItems([...taskItems, task]);
      setTask("");
    }
  };

  const completeTask = (index: number) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const textColor = useThemeColor({}, "text");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor,
    },
    tasksWrapper: {
      paddingTop: 80,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: textColor,
    },
    items: {
      marginTop: 30,
    },
    writeTaskWrapper: {
      position: "absolute",
      bottom: 60,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      borderRadius: 60,
      borderColor: "#C0C0C0",
      borderWidth: 1,
      width: 250,
      color: textColor, // Applying Themed color
    },
    addWrapper: {
      width: 60,
      height: 60,
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#C0C0C0",
      borderWidth: 1,
    },
    addText: {
      color: textColor,
    },
    scrollContainer: {
      flexGrow: 1,
    },
  });

  return (
      <ThemedView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.tasksWrapper}>
            <ThemedText style={styles.sectionTitle}>Today's tasks</ThemedText>
            <View style={styles.items}>
              {taskItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Task text={item} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={"Write a task"}
            placeholderTextColor={textColor}
            value={task}
            onChangeText={(text) => setTask(text)}
          />
          <TouchableOpacity onPress={handleAddTask}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ThemedView>
  );
};

export default TaskListScreen;