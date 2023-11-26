// Project\tinytask\app\_layout.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountLayout from "./(account)/_layout";

const Stack = createStackNavigator();

const RootLayout = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountLayout}
        options={{ headerShown: false }}
      />
      {/* Add more screens or navigation configurations as needed */}
    </Stack.Navigator>
  );
};

export default RootLayout;
