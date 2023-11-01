import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const currentDate = new Date().toDateString();

  const handleProfileIconPress = () => { };

  const handleHomeIconPress = () => { };

  const handleTasksNavigationPress = () => { };

  const handleCalendarNavigationPress = () => { };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome, User</Text>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>

      <TouchableOpacity style={styles.profileIcon} onPress={handleProfileIconPress}>
        <MaterialIcons name="account-circle" size={30} color="#555" />
      </TouchableOpacity>

      <View style={styles.section}></View>
      <View style={styles.section}></View>
      
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
