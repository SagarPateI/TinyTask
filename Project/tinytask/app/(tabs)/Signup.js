import React, {useState} from "react";
import {View} from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../../components/UserInput";
import SubmitButton from "../../components/SubmitButton";
import axios from 'axios';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";



const Signup =  ({navigation}) => {

{/* STATE VARIABLES
    [VALUE, SETVALUE] */}

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const instance = axios.create({
    httpsAgent: {
        rejectUnauthorized: false,
    },
});

const handleSubmit = async () => {

    {/*button has been pressed*/}
    setLoading(true)
    if (!name || !email || !password) {
        alert('All fields are required');
        setLoading(false);
        return;
    }

    try {

        //ENTER URL HERE
        //URL NEEDS TO BE CHANGED EVERYTIME THE SERVER IS RESTARTED 
        const {data} = await instance.post('/signup', {
            name,
            email, 
            password,
        });

        if(data.error) {
            alert(data.error);
            setLoading(false);
        } else {
        setLoading(false);
        console.log('SIGNUP SUCCESSFUL =>', data);
        alert("You've successfully signed up");
        }

    } catch (err) {
        console.log(err);
        setLoading(false);
    }
}
    return (
        <KeyboardAwareScrollView contentContainerStyle = {{ backgroundColor: "#181220",flex: 1, justifyContent: "center"}}>
            <View>
                <Text title center style = {{color: "#FFFFFF", marginBottom: 75}}>
                    Sign up
                </Text>

                {/* PASSING STATE VALUES AS PROPS*/}
                <UserInput 
                    name = "Name" 
                    value = {name} 
                    setValue={setName}
                    autoCapitalize='words'
                    autoCorrect={false}
                />

                <UserInput
                    name = "Email" 
                    value = {email} 
                    setValue = {setEmail}
                    autoCompleteType = "email"
                    keyboardType = "email-address"
                    
                />

                <UserInput 
                    name = "Password" 
                    value = {password} 
                    setValue = {setPassword}
                    secureTextEntry = {true}
                    autoCompleteType = "password"
                />
            <SubmitButton title = "Sign Up" handleSubmit = {handleSubmit} loading = {loading}/>
            
            <Text small center style={{color: "#FFFFFF"}}>Already have an account?<Text onPress={() => navigation.navigate("Login")} color = "#f28b1e"> Login</Text></Text>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default Signup;