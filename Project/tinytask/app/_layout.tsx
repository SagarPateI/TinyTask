import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import HomeScreen from "./(tabs)/HomeScreen";
import { useSelector } from "react-redux"; // Assuming you use Redux for state management

const Stack = createStackNavigator();

const AppNavigator = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Replace with your authentication state

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
