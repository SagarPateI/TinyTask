//TaskListScreen.tsx
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
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
import Task from "../../../components/Task";
import {
  Text as ThemedText,
  View as ThemedView,
  useThemeColor,
} from "../../../components/Themed";
import { useQuery } from "react-query";

import { AuthService } from "../services/AuthService";

const TaskListScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  //STATE VARIABLES
  const [task, setTask] = useState<string>("");
  const [taskItems, setTaskItems] = useState<string[]>([]);
  const [userId, setUserId] = useState<string>(""); // State to hold the user's _id
  const [userToken, setUserToken] = useState<string>("");

  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const token = await AuthService.getToken(); // Retrieve user token from AuthService
        if (token) {
          setUserToken(token); // Set the user token in state
        } else {
          // Handle case where token is null or undefined
          console.error("User token not found");
        }
      } catch (error) {
        console.error("Error fetching user token:", error);
      }
    };

    fetchUserToken(); // Fetch user token on component mount
  }, []);

  const backgroundColor = useThemeColor(
    {
      light: "#FFFFFF", // Light gray background color
      dark: "#121212", // Dark gray background color
    },
    "background"
  );

  //ADD TASK FUNCTION
  const handleAddTask = async () => {
    Keyboard.dismiss();

    //IF TASK IS NOT EMPTY
    if (task.trim() !== "") {
      try {
        //POST REQUEST TO MAKE TASK
        const response = await fetch("https://tinytaskapp.loca.lt/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`, // Assuming you have user's token stored
          },
          body: JSON.stringify({
            title: task,
            description: "Your task description here",
            userId: userId, // Include the userId when creating a task
          }),
        });

        //IF REQUEST SUCCESSFUL, UPDATE THE STATE WITH NEW TASK
        if (response.ok) {
          const newTask = await response.json();
          setTaskItems([...taskItems, newTask.title]);
          setTask("");
          console.log("Task added successfully:", newTask);
        } else {
          console.error("Failed to add task");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

//  useEffect(() => {
    // Fetch user data or extract userId from the token upon component mount
    // Example fetch user data function (use your own authentication logic)
//    const fetchUserData = async () => {
//      try {
//        const userResponse = await fetch("https://tinytask.loca.lt/user", {
//          headers: {
//            Authorization: `Bearer ${userToken}`,
//          },
//        });
//        if (userResponse.ok) {
//          const userData = await userResponse.json();
//          setUserId(userData._id); // Assuming user data contains _id field
//        } else {
//          console.error("Failed to fetch user data");
//        }
//      } catch (error) {
//        console.error("Error:", error);
//      }
//    };
//
//    fetchUserData(); // Fetch user data on component mount
//  }, []); // Empty dependency array to execute only once on mount

  //FUNCTION TO SET TASK AS COMPLETE
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
      borderRadius: 10,
      borderColor: "#C0C0C0",
      borderWidth: 1,
      width: 250,
      color: textColor, // Applying Themed color
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
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
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
