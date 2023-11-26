// Project\tinytask\app\(account)\(tabs)\_layout.tsx

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import TaskListScreen from "./TaskListScreen";
import CalendarScreen from "./CalendarScreen";

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tasks" component={TaskListScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      {/* Add more tabs or configurations as needed */}
    </Tab.Navigator>
  );
};

export default TabsLayout;
