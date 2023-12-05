// app/tabs/HomeScreen.tsx
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { Text, ScrollView, StyleSheet } from "react-native";
import {
  View as ThemedView,
  useThemeColor,
  Text as ThemedText,
  View,
} from "../../../components/Themed";
import EditScreenInfo from "../../../components/EditScreenInfo"; // Delete this after we delete the "Tab One" section
import AsyncStorage from "@react-native-async-storage/async-storage";




type RootStackParamList = {
  TaskList: undefined; // or any other params for TaskList screen
  Home: { newTask?: string };
};


const HomeScreen: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, task: "Task 1", completed: false },
    { id: 2, task: "Task 2", completed: true },
  ]);



  // useEffect(() => {
  //   // Fetch user's token from AsyncStorage
  //   const fetchUserToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("token");

  //       if (token) {
  //         // Decode the JWT token to access user information
  //          // Correct function name
  //         const decode = jwtDecode<JwtPayload>(token);

  //         // Assuming the token contains a 'name' property
      
  //       } else {
  //         console.error("No token found");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user token:", error);
  //     }
  //   };

  //   // Call the fetchUserToken function when the component mounts
  //   fetchUserToken();
  // }, []);


  //WAS JUST CHECKING TOKEN GOT THROUGH!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // useEffect(() => {
  //   // Fetch user's token from AsyncStorage
  //   const fetchUserToken = async () => {
      
  //       const token = await AsyncStorage.getItem("token");

        
  //         // Decode the JWT token to access user information
          
  //         const decodedToken = jwt.decode(token);
  //         const { userId, userName } = decodedToken;
  //         console.log('User ID:', userId);
  //         console.log('User Name:', userName);
  //   }
  //   // Call the fetchUserToken function when the component mounts
  //   fetchUserToken();
  // }, []);

  // Receive the route and get the new task parameter
  const route = useRoute<RouteProp<RootStackParamList, "Home">>();
  const newTask = route.params?.newTask;


  useEffect(() => {
    // Update the tasks array if a new task is received
    if (newTask) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: prevTasks.length + 1, task: newTask, completed: false },
      ]);
    }
  }, [newTask]);

  const backgroundColor = useThemeColor(
    {
      light: "#FFFFFF", // Light gray background color
      dark: "#000000", // Dark gray background color
    },
    "background"
  );

  const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      backgroundColor,
      marginTop: 20
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 5,
    },
    dateText: {
      fontSize: 18,
      fontStyle: "italic",
      marginBottom: 5,
    },
    eventContainer: {
      marginBottom: 10,
    },
    taskContainer: {
      marginBottom: 5,
    },
    taskItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    taskText: {
      marginLeft: 10,
      fontSize: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      marginVertical: 15,
    },
  });

  const currentDate = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = days[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();

  // Mock data for events and tasks
  const events = [
    { id: 1, title: "Meeting", time: "10:00 AM" },
    { id: 2, title: "Gym", time: "5:00 PM" },
  ];



  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.container}>
        <ThemedText style={styles.sectionTitle}>{'Welcome, {name}'}</ThemedText>
        <ThemedText
          style={styles.dateText}
        >{`${dayOfWeek}, ${month} ${dayOfMonth}`}</ThemedText>

        <View style={styles.separator} />

        <View style={styles.eventContainer}>
          <ThemedText style={styles.sectionTitle}>Upcoming Events</ThemedText>
          {events.map((event) => (
            <View key={event.id} style={styles.taskItem}>
              <ThemedText>{`${event.title} - ${event.time}`}</ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.separator} />

        <View style={styles.taskContainer}>
          <ThemedText style={styles.sectionTitle}>Tasks</ThemedText>
          {tasks.map((task) => (
            <View key={task.id} style={styles.taskItem}>
              <ThemedText>{task.completed ? "✅" : "◻️"}</ThemedText>
              <ThemedText style={styles.taskText}>{task.task}</ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.container}>
          <ThemedText style={styles.title}>Tab One</ThemedText>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="#121212"
          />
          <EditScreenInfo path="app/(tabs)/index.tsx" />
        </View>

        <View style={styles.separator} />
      </ScrollView>
    </ThemedView>
  );
};

export default HomeScreen;
