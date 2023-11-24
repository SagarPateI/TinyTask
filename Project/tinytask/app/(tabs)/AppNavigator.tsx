// AppNavigator.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TaskListScreen from "./TaskListScreen";
import index from "./index";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TaskList" component={TaskListScreen} />
            <Stack.Screen name="Home" component={index} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
