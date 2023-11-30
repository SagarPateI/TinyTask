// Project\tinytask\app\(account)\_layout.tsx

import React, {useState, useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsLayout from "./(tabs)/_layout";
import LoginScreen from "./Login";
import SignupScreen from "./Signup";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage


const Stack = createStackNavigator();

const AccountLayout = () => {
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // useEffect(() => {
  //   checkUserLoggedIn();
  // }, []);

  // const checkUserLoggedIn = async () => {
  //   const token = await AsyncStorage.getItem("token");

  //   if (token) {
  //     // User is logged in
  //     setIsUserLoggedIn(true);
  //     console.log("User Token: " + token);
  //   } else {
  //     // User is not logged in
  //     setIsUserLoggedIn(false);
  //   }
  // };

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
      {/* {isUserLoggedIn &&  */}
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
