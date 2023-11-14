import React from "react-native";
import {View, TextInput} from "react-native";
import Text from "@kaloraat/react-native-text";

{/* ACCESSING AND SENDING VALUES TO TEXT INPUT*/}
const UserInput =  ({name, value, setValue, autoCapitalize = "none", keyboardType = "default", secureTextEntry = false}) => {

    return (
            <View style = {{marginHorizontal: 20}}>
                <Text semi style = {{color: "#FFFFFF"}}>{name}</Text>
                <TextInput 
                    autoCorrect = {false}
                    autoCapitalize={autoCapitalize}
                    keyboardType = {keyboardType}
                    secureTextEntry = {secureTextEntry}
                    style = {{
                    borderBottomWidth: 0.5,
                    height: 48,
                    borderBottomColor: "#8e93a1",
                    marginBottom: 30,
                    color: "#ffffff",
                 }}

                 value = {value}


                 onChangeText = {(text) => setValue(text)}
                />

                 {/* USER INPUT (TEXT) WILL BE SENT TO SETVALUE FUNCTION TO SET VALUE FOR THE STATE*/}
            </View>
    );
};


export default UserInput;