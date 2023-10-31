import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import TaskListScreen from "./TaskListScreen";
import CalendarViewScreen from "./CalendarViewScreen";

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