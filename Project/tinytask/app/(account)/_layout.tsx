// Project\tinytask\app\(account)\_layout.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Signup from "./Signup";

const Stack = createStackNavigator();

const AccountLayout = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AccountLayout;
