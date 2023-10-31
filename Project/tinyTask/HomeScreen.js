import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Import icons from Expo package

const HomeScreen = () => {
  const currentDate = new Date().toDateString(); // Get the current date

  // Placeholder event handlers for icon press
  const handleProfileIconPress = () => {
    // Handle profile icon press
  };

  const handleHomeIconPress = () => {
    // Handle Home icon press
  };

  const handleTasksNavigationPress = () => {
    // Handle Tasks navigation press
  };

  const handleCalendarNavigationPress = () => {
    // Handle Calendar navigation press
  };

  return (
    <View style={styles.container}>
      {/* Welcoming Interface */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome, User</Text>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>

      {/* Profile Icon */}
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={handleProfileIconPress}
      >
        <MaterialIcons name="account-circle" size={30} color="#555" />
      </TouchableOpacity>

      {/* Events Section */}
      <View style={styles.section}>
        {/* Display upcoming events */}
        {/* ... (code for displaying events) */}
      </View>

      {/* Tasks Section */}
      <View style={styles.section}>
        {/* Display tasks with checkboxes */}
        {/* ... (code for displaying tasks) */}
      </View>

      {/* Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={handleHomeIconPress}>
          <MaterialIcons name="home" size={30} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTasksNavigationPress}>
          <MaterialIcons name="check" size={30} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCalendarNavigationPress}>
          <MaterialIcons name="date-range" size={30} color="#555" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  welcomeSection: {
    alignItems: "center",
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 16,
    color: "#555",
  },
  profileIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  section: {
    marginTop: 20,
    // Add styles for event and tasks sections
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#eee",
    paddingVertical: 10,
  },
});

export default HomeScreen;
