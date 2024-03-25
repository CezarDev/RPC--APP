import React, { createContext, useState, useEffect } from "react";
//import AsyncStorage from '@react-native-async-storage/async-storage';

import storage from "../storage/storage";

import axios from 'axios';
import { BASE_URL } from "../config";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState(0);

    const login = (email, password) => {
    
        setIsLoading(true);
    
        const data = {
            email: email,
            password: password
        };
    
        axios.post(`${BASE_URL}login`, data)
            .then(response => {
                console.log(response.data);
                if (!response.data.access_token) {
                    setIsLoading(false);
                    return;
                }
                setUserToken(response.data.access_token);
                setUser(response.data.name);
                setUserId(response.data.user_id);
    
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000); 
                
            })
            .catch(error => {
                console.warn(error);
                setIsLoading(false);
            });
    
        storage.save({
            key: 'userToken',
            data: userToken,
            expires: null
        });
    
        storage.save({
            key: 'user',
            data: user,
            expires: null
        });
    
        storage.save({
            key: 'userId',
            data: userId,
            expires: null
        });
    }
    

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        storage.remove({
            key: 'userToken'
        });

        storage.remove({
            key: 'user'
        });
        
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            const token = await storage.load({ key: 'userToken' });
            setUserToken(token);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.warn(error);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, user, userId}}>
            {children}
        </AuthContext.Provider>
    );
}

