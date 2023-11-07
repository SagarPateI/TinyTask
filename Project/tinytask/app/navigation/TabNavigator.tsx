// tinytask/app/navigation/TabNavigator.tsx

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../(tabs)/index";
import TaskListScreen from "../(tabs)/TaskListScreen";
import CalendarScreen from "../(tabs)/CalendarScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="TaskList" component={TaskListScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
