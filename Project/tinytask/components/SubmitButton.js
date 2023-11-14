import React from 'react';
import Text from "@kaloraat/react-native-text";
import {TouchableOpacity} from "react-native";


const SubmitButton = ({title, handleSubmit, loading}) => (

    <TouchableOpacity
    onPress = {handleSubmit}
            style = {{
                backgroundColor: "#584277",
                height: 50,
                justifyContent: "center",
                marginHorizontal: 45,
                marginBottom: 20,
                borderRadius: 10,
            }}>
        <Text bold medium center style = {{color: "#FFFFFF"}}>{loading ? 'Please wait...' : title}</Text>
    </TouchableOpacity>
);
export default SubmitButton;