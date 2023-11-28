import React, { useEffect, useState } from "react";
import { View, Alert, Text, TouchableOpacity } from "react-native";
import UserInput from "../../components/UserInput";
import SubmitButton from "../../components/SubmitButton";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const Signup = ({ navigation }: { navigation: any }) => {
  // STATE VARIABLES [VALUE, SETVALUE]
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const instance = axios.create({
    httpsAgent: {
      rejectUnauthorized: false,
    },
  });


  const handleSubmit = async () => {
    // button has been pressed
    setLoading(true);
    if (!name || !email || !password) {
      Alert.alert("All fields are required");
      setLoading(false);
      return;
    }

    try {
      // ENTER URL HERE
      // URL NEEDS TO BE CHANGED EVERY TIME THE SERVER IS RESTARTED
      const { data } = await instance.post(
        "https://tinytaskapp.loca.lt/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      if (data.error) {
        Alert.alert(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("SIGNUP SUCCESSFUL =>", data);
        Alert.alert("You've successfully signed up");
        navigation.navigate("Login");
        
      }
    } catch (err) {
      console.log(err);
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
          style={{
            color: "#FFFFFF",
            textAlign: "center",
            marginBottom: 75,
            fontSize: 24,
          }}
        >
          Sign up
        </Text>

        {/* PASSING STATE VALUES AS PROPS*/}
        <UserInput
          name="Name"
          value={name}
          setValue={setName}
          autoCompleteType="name"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <UserInput
          name="Email"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <UserInput
          name="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />
        <SubmitButton
          title="Sign Up"
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ alignItems: "center", marginTop: 20 }}
        >
          <Text style={{ color: "#f28b1e" }}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
