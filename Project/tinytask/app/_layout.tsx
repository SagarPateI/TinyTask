import React, { useEffect, useState, useCallback, createContext} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountLayout from "./(account)/_layout";
import { ActivityIndicator, View, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";


const Stack = createStackNavigator();


const RootLayout = () => {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    'SpaceMono': require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

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
