import React from "react";
import {View, TouchableOpacity} from 'react-native';
import {Text} from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export const Tab = ({name, text }) => (
    <TouchableOpacity>
        <>
        <FontAwesome5
            name = {name}
            size = {25}
            style = {{
            marginBottom: 3,
            alignSelf: "center",
        }}
        />

        <Text>{text}</Text>
        </>
    </TouchableOpacity>
);


export default function Footer() {
    return (
        <View style = {{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between"
    }}>
    <Tab text = "Home" name = "home"/>
    <Tab text = "Tasks" name = "checkbox"/>
    <Tab text = "Calendar" name = "calendar"/>
    </View>
    );
}
