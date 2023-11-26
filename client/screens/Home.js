
// DUMMY HOME SCREEN

import React, {useContext} from "react";
import {Text, View} from "react-native";
import { AuthContext } from "../context/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import FooterTab from "../components/nav/FooterTabs";


const Home = () => {

    //accessing global state and destructure 
    const [state, setState] = useContext(AuthContext);
    
    return (
<   SafeAreaView style = {{ flex: 1, justifyContent: 'space-between'}}>
        <Text>
            {JSON.stringify(state, null, 4)}
        </Text>
        <FooterTab/>
    </SafeAreaView>
    );
};


export default Home;
