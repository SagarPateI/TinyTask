// Project\tinytask\app\(account)\_layout.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsLayout from "./(tabs)/_layout";
import LoginScreen from "./Login";
import SignupScreen from "./Signup";

const Stack = createStackNavigator();

const AccountLayout = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Login Page",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ 
        title: "Signup Page", 
        headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={TabsLayout}
        options={{ headerShown: false }}
      />
      {/* Add more screens or navigation configurations as needed */}
    </Stack.Navigator>
  );
};

export default AccountLayout;
