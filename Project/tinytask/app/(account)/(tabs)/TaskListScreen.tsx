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

interface TaskItem {
  _id: string;
  title: string;
  completed: boolean;
}

const TaskListScreen: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

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
      const userId = "6553cbce9c2e8667ef0ce643";
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
      const updatedTasks = tasks.map((task) => {
        if (task._id === taskId) {
          task.completed = true;
        }
        return task;
      });
      setTasks(updatedTasks);

      await axios.delete(`https://tinytaskapp.loca.lt/tasks/${taskId}`);
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
    // addButton: {
    //   backgroundColor: "blue",
    //   padding: 10,
    //   alignItems: "center",
    //   borderRadius: 5,
    // },
    addButton: {
      backgroundColor: "blue",
      justifyContent: "center",
      alignItems: "center",
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    addButtonText: {
      color: "white",
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
    </View>
  );
};

export default TaskListScreen;
