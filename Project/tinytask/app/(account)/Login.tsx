import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import UserInput from "../components/UserInput";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationProp } from "@react-navigation/native";

const Login = ({ navigation }: { navigation: NavigationProp<any> }) => {
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
        "https://tinytask.loca.lt/auth/login",
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
        // Assuming login is successful
        navigation.navigate("HomeScreen"); // Navigate to HomeScreen after successful login
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
            Don't have an account?
            <Text
              onPress={() => navigation.navigate("Signup")}
              style={{ color: "#f28b1e" }}
            >
              {" "}
              Register
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
