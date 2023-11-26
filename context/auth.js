import React, {useState, useEffect, createContext} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AuthContext = createContext();

//saving user and token in state
const AuthProvider = ({children}) => {
    const [state, setState] = useState({
        user: null,
        token:"",   
});


//axios config, CHANGE FOR TUNNEL
axios.defaults.baseURL = "http://localhost:8000";

//load data from local storage using Async Storage by default
    useEffect(() => { const fromAsyncStorage = async () => {

        //saving data from "@auth" in var data
        let data = await AsyncStorage.getItem("@auth");

        //converting to javascript object
        const AsyncData = JSON.parse(data);

        setState({...state, user: AsyncData.user, token: AsyncData.token});
    };
    fromAsyncStorage();
}, []);

//setting state and setState as global
return (
    <AuthContext.Provider value = {[state, setState]}>
        {children}
    </AuthContext.Provider>
    )
};




export {AuthContext, AuthProvider};