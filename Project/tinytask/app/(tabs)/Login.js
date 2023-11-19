import React, { useState } from "react";
import { View } from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../../components/UserInput";
import SubmitButton from "../../components/SubmitButton";
import axios from 'axios';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = ({ navigation }) => {

    {/* STATE VARIABLES
    [VALUE, SETVALUE] */}

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const instance = axios.create({
        httpsAgent: {
            rejectUnauthorized: false,
        },
    });

    const handleSubmit = async () => {

        {/*button has been pressed*/ }
        setLoading(true)
        if (!email || !password) {
            alert('All fields are required');

            setLoading(false);
            return;
        }

        try {

            //ENTER URL HERE
            //URL NEEDS TO BE CHANGED EVERYTIME THE SERVER IS RESTARTED 
            const { data } = await instance.post('https://dry-shrimps-tan.loca.lt/login', {
                email,
                password,
            });
            if (data.error) {
                alert(data.error);
                setLoading(false);
            } else {
                setLoading(false);
                console.log("LOGIN SUCCESSFUL =>", data);
                alert("You have successfully logged in");
            }
        } catch (err) {
            console.error("AxiosError:", err);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Response data:", err.response.data);
                console.error("Response status:", err.response.status);
                console.error("Response headers:", err.response.headers);
            } else if (err.request) {
                // The request was made but no response was received
                console.error("No response received:", err.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error message:", err.message);
            }
            setLoading(false);
        }
    }
    return (
        <KeyboardAwareScrollView contentContainerStyle={{ backgroundColor: "#181220", flex: 1, justifyContent: "center" }}>
            <View>
                <Text title center style={{ color: "#FFFFFF", marginBottom: 75 }}>
                    Login
                </Text>

                {/* PASSING STATE VALUES AS PROPS*/}

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
                <SubmitButton title="Login" handleSubmit={handleSubmit} loading={loading} />

                <Text small center style={{ color: "#FFFFFF" }}>Don't have an account?<Text onPress={() => navigation.navigate("Signup")} color="#f28b1e"> Register</Text></Text>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default Login;