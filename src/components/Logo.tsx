import React from "react";
import { ImageBackground, View, StyleSheet } from "react-native";


const Logo = () => {
    return (
        <View>
           <ImageBackground 
           source={require('../../assets/images/rpc.gif')}
           style={styles.background}
           />
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '65%',   
           
    },
});


export default Logo;