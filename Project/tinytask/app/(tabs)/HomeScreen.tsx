// app/tabs/HomeScreen.tsx
import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { View as ThemedView, useThemeColor, Text as ThemedText, View } from "../../components/Themed";
import EditScreenInfo from "../../components/EditScreenInfo"; // Delete this after we delete the "Tab One" section

const HomeScreen = () => {
  const backgroundColor = useThemeColor(
    {
      light: "#f0f0f0", // Light gray background color
      dark: "#333333", // Dark gray background color
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
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayOfWeek = days[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();

  // Mock data for events and tasks
  const events = [
    { id: 1, title: 'Meeting', time: '10:00 AM' },
    { id: 2, title: 'Gym', time: '5:00 PM' },
  ];

  const tasks = [
    { id: 1, task: 'Task 1', completed: false },
    { id: 2, task: 'Task 2', completed: true },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.container}>
        <ThemedText style={styles.sectionTitle}>Welcome, User</ThemedText>
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
      </ScrollView>

      <View style={styles.container}>
        <ThemedText style={styles.title}>Tab One</ThemedText>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <EditScreenInfo path="app/(tabs)/HomeScreen.tsx" />
      </View>

    </ThemedView>
  );
};

export default HomeScreen;