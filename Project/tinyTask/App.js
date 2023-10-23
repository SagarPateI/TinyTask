import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Task List" component={TaskListScreen} />
          <Tab.Screen name="Calendar View" component={CalendarViewScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Home Screen</Text>
    </SafeAreaView>
  );
};

const TaskListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Task List Screen</Text>
    </SafeAreaView>
  );
};

const CalendarViewScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Calendar View Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  h1: {
    margin: 28,
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
});
