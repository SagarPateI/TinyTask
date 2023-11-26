

import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/auth';
import ScreensNavigation from './components/nav/ScreensNavigation';


export default function RootNavigation() {
return (
  <NavigationContainer>
    <AuthProvider>
        <ScreensNavigation/>
    </AuthProvider>
  </NavigationContainer>
);
}