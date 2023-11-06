// app/tabs/HomeScreen.tsx
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

const HomeScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    dateText: {
      fontSize: 18,
      fontStyle: 'italic',
      marginBottom: 10,
    },
    eventContainer: {
      marginBottom: 20,
    },
    taskContainer: {
      marginBottom: 20,
    },
    taskItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    taskText: {
      marginLeft: 10,
      fontSize: 16,
    },
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
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
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Welcome, User</Text>
      <Text style={styles.dateText}>{`${dayOfWeek}, ${month} ${dayOfMonth}`}</Text>

      <View style={styles.separator} />

      <View style={styles.eventContainer}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        {events.map(event => (
          <View key={event.id} style={styles.taskItem}>
            <Text>{`${event.title} - ${event.time}`}</Text>
          </View>
        ))}
      </View>

      <View style={styles.separator} />

      <View style={styles.taskContainer}>
        <Text style={styles.sectionTitle}>Tasks</Text>
        {tasks.map(task => (
          <View key={task.id} style={styles.taskItem}>
            <Text>{task.completed ? '✅' : '◻️'}</Text>
            <Text style={styles.taskText}>{task.task}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;