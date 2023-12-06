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


  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        
        //fetching the user's name that is stored in AsyncStorage using the key "USER_NAME"
        const userName = await AsyncStorage.getItem("USER_NAME");

        if (userName) {
          
          setName(userName);
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, []);

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
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    dateText: {
      fontSize: 18,
      fontStyle: "italic",
      marginBottom: 10,
    },
    eventContainer: {
      marginBottom: 20,
    },
    taskContainer: {
      marginBottom: 20,
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
        <ThemedText style={styles.sectionTitle}>{`Welcome, ${name || ""} !`}</ThemedText>
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
          <EditScreenInfo path="app/(tabs)/HomeScreen.tsx" />
        </View>

        <View style={styles.separator} />
      </ScrollView>
    </ThemedView>
  );
};

export default HomeScreen;
