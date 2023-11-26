// Project\tinytask\app\_layout.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountLayout from "./(account)/_layout";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

const Stack = createStackNavigator();

const RootLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="(account)"
          component={AccountLayout}
          options={{ headerShown: false }}
        />
        {/* Add more screens or navigation configurations as needed */}
      </Stack.Navigator>
    </ThemeProvider>
  );
};

export default RootLayout;
