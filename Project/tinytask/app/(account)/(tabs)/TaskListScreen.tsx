// import React, { useState, useEffect } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";
// import {
//   Keyboard,
//   KeyboardAvoidingView,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   ScrollView,
// } from "react-native";
// import Task from "../../../components/Task";
// import {
//   Text as ThemedText,
//   View as ThemedView,
//   useThemeColor,
// } from "../../../components/Themed";
// import { useQuery } from "react-query";
// import axios from 'axios';

// interface Task {
//   _id: string;
//   title: string;
//   completed: boolean;
// }

// interface TaskListProps {
//   task: Task[];
// }

// const TaskListScreen: React.FC = () => {
//   const navigation = useNavigation<StackNavigationProp<any>>();

//   const [task, setTask] = useState<Task[]>([]);

//   useEffect(() => {
//     axios
//       .get("https://tinytask.loca.lt/tasks", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) => {
//         if (res.status === 200) {
//           setTask(res.data.task);
//         }
//       });
//   }, []);

//   const TaskList = ({task}: TaskListProp) => {

//   }
//   // const GetTasks = async () => {
//   //   try {
//   //     const response = await fetch("https://tinytask.loca.lt/tasks", {
//   //       method: "GET",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //     });
//   //     const data = await response.json();
//   //     setTask(data);
//   //   } catch (error) {
//   //     console.error("Error fetching tasks:", error);
//   //   }
//   // };
//   //STATE VARIABLES
//   // const [task, setTask] = useState([]);
//   // const [taskItems, setTaskItems] = useState<string[]>([]);

//   const backgroundColor = useThemeColor(
//     {
//       light: "#FFFFFF", // Light gray background color
//       dark: "#121212", // Dark gray background color
//     },
//     "background"
//   );

//   // //ADD TASK FUNCTION
//   // const handleAddTask = async () => {
//   //   Keyboard.dismiss();

//   //   //IF TASK IS NOT EMPTY
//   //   if (task () !== "") {
//   //     try {
//   //       //POST REQUEST TO MAKE TASK
//   //       const response = await fetch("http://localhost:8000/tasks", {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify({
//   //           title: task,
//   //           description: "Your task description here", // Add description as needed
//   //         }),
//   //       });

//   //       //IF REQUEST SUCCESSFUL, UPDATE THE STATE WITH NEW TASK
//   //       if (response.ok) {
//   //         const newTask = await response.json();
//   //         setTaskItems([...taskItems, newTask.title]); // Update taskItems with the new task
//   //         setTask("");
//   //         console.log("Task added successfully:", newTask); // Log success message
//   //       } else {
//   //         console.error("Failed to add task"); // Log failure message
//   //       }
//   //     } catch (error) {
//   //       console.error("Error:", error); // Log error message
//   //     }
//   //   }
//   // };

//   // //FUNCTION TO SET TASK AS COMPLETE
//   // const completeTask = (index: number) => {
//   //   let itemsCopy = [...task];
//   //   itemsCopy.splice(index, 1);
//   //   setTask(itemsCopy);
//   // };

//   const textColor = useThemeColor({}, "text");

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       paddingHorizontal: 20,
//       backgroundColor,
//     },
//     tasksWrapper: {
//       paddingTop: 80,
//     },
//     sectionTitle: {
//       fontSize: 24,
//       fontWeight: "bold",
//       color: textColor,
//     },
//     items: {
//       marginTop: 30,
//     },
//     writeTaskWrapper: {
//       position: "absolute",
//       bottom: 60,
//       width: "100%",
//       flexDirection: "row",
//       justifyContent: "space-around",
//       alignItems: "center",
//     },
//     input: {
//       paddingVertical: 15,
//       paddingHorizontal: 15,
//       borderRadius: 10,
//       borderColor: "#C0C0C0",
//       borderWidth: 1,
//       width: 250,
//       color: textColor, // Applying Themed color
//     },
//     addWrapper: {
//       width: 60,
//       height: 60,
//       borderRadius: 10,
//       justifyContent: "center",
//       alignItems: "center",
//       borderColor: "#C0C0C0",
//       borderWidth: 1,
//     },
//     addText: {
//       color: textColor,
//       fontSize: 30,
//     },
//     scrollContainer: {
//       flexGrow: 1,
//     },
//   });

//   const TaskListComponent = ({task}: TaskListProps) => {

//   return (
//     <ThemedView style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={styles.tasksWrapper}>
//           <ThemedText style={styles.sectionTitle}>Today's tasks</ThemedText>
//           <View style={styles.items}>
//             {task.map((item, index) => (
//               <TouchableOpacity key={index} onPress={() => completeTask(index)}>
//                 <Task text={item} />
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </ScrollView>

//       {/* Write a task */}
//       {/* <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.writeTaskWrapper}
//       >
//         <TextInput
//           style={styles.input}
//           placeholder={"Write a task"}
//           placeholderTextColor={textColor}
//           value={task}
//           onChangeText={(text) => setTask(text)}
//         />
//         <TouchableOpacity onPress={handleAddTask}>
//           <View style={styles.addWrapper}>
//             <Text style={styles.addText}>+</Text>
//           </View>
//         </TouchableOpacity>
//       </KeyboardAvoidingView> */}
//     </ThemedView>
//   );
//     }

// export default TaskListScreen;

import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import Task from "../../../components/Task";
import {
  Text as ThemedText,
  View as ThemedView,
  useThemeColor,
} from "../../../components/Themed";
import axios from "axios";
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Platform,
} from "react-native";

interface TaskItem {
  _id: string;
  title: string;
  completed: boolean;
}

const TaskListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch tasks when the component mounts
    axios
      .get("https://proud-pig-40.loca.lt/tasks")
      .then((res) => {
        if (res.status === 200) {
          setTasks(res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const handleAddTask = () => {
    // Add logic to send a new task to the backend or update the local state
    // For example:
    axios
      .post("https://proud-pig-40.loca.lt/tasks", {
        title: title,
        completed: false,
      })
      .then((res) => {
        if (res.status === 201) {
          setLoading(false);
          setTasks([...tasks, res.data]);
          setTitle("");
          console.log("Task added successfully:", res.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error adding task:", error);
      });
  };

  const textColor = useThemeColor({}, "text");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
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
            {tasks &&
              tasks.map((task) => (
                <TouchableOpacity key={task._id}>
                  <Text>{task.title}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>

      {/* write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          placeholderTextColor={textColor}
          value={title}
          onChangeText={(text) => setTitle(text)}
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