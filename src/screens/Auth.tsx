import React, {useState, useContext}  from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function Auth() {
    
const { login } = useContext(AuthContext) as { login: any };

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


const handleLogin = () => {
    console.log("Email:", email);
    console.log("Senha:", password );
}
    return (
        <View style={styles.container}>

                    <ImageBackground
                    source={require('../../assets/images/task.png')}
                    style={styles.background} />

        <Text style={styles.title}>Login</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={() => login(email, password)}>
            <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e6eaee",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    input: {
        width: "90%",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    button: {
        width: "90%",
        height: 40,
        backgroundColor: "#3498db",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    background: {
        flex: 0.5,
        width: '80%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 20,
        paddingStart: 20,
        marginLeft: 75,
    },

    });
