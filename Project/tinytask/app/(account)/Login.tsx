import React, { useState, useEffect } from "react";
import { Alert, ActivityIndicator } from "react-native";
import UserInput from "../../components/UserInput";
import SubmitButton from "../../components/SubmitButton";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text as ThemedText,
  View as ThemedView,
  useThemeColor,
} from "../../components/Themed";
import { AuthService } from "./services/AuthService";
import { View } from '../../components/Themed';

const Login = ({ navigation }: { navigation: any }) => {
  //const Login = () => {
  //const navigation = useNavigation();
  // State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Axios Instance
  const instance = axios.create({
    httpsAgent: {
      rejectUnauthorized: false,
    },
  });

  // Function to handle form submission
  const handleSubmit = async () => {
    setLoading(true);

    if (!email || !password) {
      Alert.alert("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const { data } = await instance.post(
        // "http://141.148.73.253:8000/auth/login",
        "https://tinytaskapp.loca.lt/auth/login",
        {
          email,
          password,
        }
      );

      if (data.error) {
        Alert.alert(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("LOGIN SUCCESSFUL =>", data);
        Alert.alert("You have successfully logged in");

        //After successful login, saving token, user._id, and user.name to AsyncStorage
        if (data.token) {
          await AuthService.saveToken(data.token);
        }

        if (data.user && data.user._id) {
          await AuthService.saveID(data.user._id);
        }

        if (data.user && data.user.name) {
          await AuthService.saveUserName(data.user.name);
        }

        //navigating to Tabs after successful login

        navigation.navigate("Tabs");
      }

      /* 
            Example of how to get the userID from any file:

              const userId = await AuthService.getID();
              console.log('Retrieved User ID:', userId);
              
        */
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("AxiosError:", err);

        if (err.response) {
          console.error("Response data:", err.response.data);
          console.error("Response status:", err.response.status);
          console.error("Response headers:", err.response.headers);
        } else if (err.request) {
          console.error("No response received:", err.request);
        } else {
          console.error("Error message:", err.message);
        }
      } else {
        // Handle other types of errors if needed
        console.error("Unknown error:", err);
      }

      setLoading(false);
    }
  };

  const backgroundColor = useThemeColor(
    {
      light: "#FFFFFF", // Light gray background color
      dark: "#000000", // Dark gray background color
    },
    "background"
  );

  const textColor = useThemeColor(
    {
      light: "#000000", 
      dark: "#FFFFFF", 
    },
    "text"
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        backgroundColor,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <ThemedView>
        <ThemedText
          style={{ color: textColor, marginBottom: 75, textAlign: "center" }}
        >
          Login
        </ThemedText>

        <UserInput
          name="Email"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
          style={{ color: "#000000" }}
        />

        <UserInput
          name="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
          style={{ color: "#000000" }}
        />

        <SubmitButton
          title="Login"
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <ThemedView style={{ alignItems: "center" }}>
          <ThemedText style={{ color: textColor }}>
            Don't have an account?{" "}
            <ThemedText
              onPress={() => navigation.navigate("Signup")}
              style={{ color: "#f28b1e" }}
            >
              Register
            </ThemedText>
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </KeyboardAwareScrollView>
  );
};

export default Login;
