

import React, { useContext } from "react";
import {createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from '../../screens/Signup';
import Login from '../../screens/Login';
import Home from "../../screens/Home";
import { AuthContext } from "../../context/auth";
import HeaderTabs from "./HeaderTabs";


const Stack = createNativeStackNavigator();

export default function ScreensNavigation() {

  const [state, setState] = useContext(AuthContext);

  const authUser = state && state.toke !== "" && state.user !== null;
  console.log("User Authentication Status: ", authUser);
return (

    <Stack.Navigator initialRouteName = "Signup" screenOptions={{headerShown:false}}
    >
      {authUser ? (
        <Stack.Screen name = "Home" component={Home} options = {{
          title: "Tiny Tasks",
          headerRight: () => <HeaderTabs/>,
        }}
        />
      ) : (
        <>
      <Stack.Screen name = "Signup" component={Signup}/>
      <Stack.Screen name = "Login" component={Login}/>
   
      </>
      )}
    </Stack.Navigator>
);
}