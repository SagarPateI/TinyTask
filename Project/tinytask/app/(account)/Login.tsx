import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import UserInput from "../../components/UserInput";
import SubmitButton from "../../components/SubmitButton";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthService } from "./services/AuthService";

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
        "https://tinytaskapp.loca.lt/auth/login",
        {
          email,
          password,
        }
      );

      const token = data.token;
      await AsyncStorage.setItem("token", token);

      if (data.error) {
        Alert.alert(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("LOGIN SUCCESSFUL =>", data);
        Alert.alert("You have successfully logged in");

        // Save the token to AsyncStorage upon successful login
        if (data.token) {
          await AuthService.saveToken(data.token); // Save token using AuthService
        }
        // Save the user ID to AsyncStorage upon successful login
        if (data.user._id) {
          await AuthService.saveID(data.user._id); // Save token using AuthService
        }
        
        const userId = await AuthService.getID();
        console.log('Retrieved User ID:', userId);

        // Assuming login is successful
        navigation.navigate("Tabs"); // Navigate to HomeScreen after successful login
      }
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

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        backgroundColor: "#181220",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View>
        <Text
          style={{ color: "#FFFFFF", marginBottom: 75, textAlign: "center" }}
        >
          Login
        </Text>

        {/* User Input Fields */}
        <UserInput
          name="Email"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />

        <UserInput
          name="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />

        {/* Submit Button */}
        <SubmitButton
          title="Login"
          handleSubmit={handleSubmit}
          loading={loading}
        />

        {/* Navigation to Signup */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#FFFFFF" }}>
            Don't have an account?{" "}
            <Text
              onPress={() => navigation.navigate("Signup")}
              style={{ color: "#f28b1e" }}
            >
              Register
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
