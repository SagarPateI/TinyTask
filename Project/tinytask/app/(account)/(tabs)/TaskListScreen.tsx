import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import Task from "../../../components/Task";
import {
  Text as ThemedText,
  View as ThemedView,
  useThemeColor,
} from "../../../components/Themed";
import axios from "axios";
import { AuthService } from "../services/AuthService";

interface TaskItem {
  _id: string;
  title: string;
  completed: boolean;
}

const TaskListScreen: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://tinytaskapp.loca.lt/tasks");
      if (response.status === 200) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      //const userId = "6553cbce9c2e8667ef0ce643";

      const userId = await AuthService.getID();
      console.log("Retrieved User ID:", userId);

      const response = await axios.post("https://tinytaskapp.loca.lt/tasks", {
        title: title,
        completed: false,
        userId: userId,
      });
      if (response.status === 201) {
        setTasks([...tasks, response.data]);
        setTitle("");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleTaskPress = async (taskId: string) => {
    try {
      console.log("Updating task with ID:", taskId);

      const updatedTasks = tasks.map((task) => {
        if (task._id === taskId) {
          // Update the local task completion status
          return { ...task, completed: true };
        }
        return task;
      });

      setTasks(updatedTasks);

      // Send a PATCH request to update task completion status on the server
      await axios.patch(`https://tinytaskapp.loca.lt/tasks/${taskId}`, {
        completed: true,
        title: "Task Title", // Replace 'Task Title' with the appropriate title
      });

      console.log("Task with ID:", taskId, "updated successfully.");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const textColor = useThemeColor({}, "text");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 40,
      backgroundColor: useThemeColor(
        { light: "#FFFFFF", dark: "#121212" },
        "background"
      ),
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
      flex: 1,
      paddingVertical: 15,
      backgroundColor: "black",
      paddingHorizontal: 15,
      borderRadius: 10,
      borderColor: "#C0C0C0",
      borderWidth: 1,
      width: 250,
      color: textColor,
    },
    addWrapper: {
      width: 60,
      height: 60,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#C0C0C0",
      borderWidth: 1,
    },
    addText: {
      color: textColor,
      fontSize: 30,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    taskItem: {
      marginBottom: 10,
    },
    addButton: {
      backgroundColor: "blue",
      justifyContent: "center",
      alignItems: "center",
      width: 100,
      height: 50,
      borderRadius: 25,
      marginLeft: 10,
    },
    addButtonText: {
      color: "white",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
  });

  // JSX Component
  return (
    <View style={styles.container}>
      <ScrollView>
        {tasks.map(
          (task) =>
            !task.completed && (
              <TouchableOpacity
                key={task._id}
                style={styles.taskItem}
                onPress={() => handleTaskPress(task._id)}
              >
                <Task text={task.title} />
              </TouchableOpacity>
            )
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskListScreen;
