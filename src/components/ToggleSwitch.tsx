import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, Switch } from "react-native";

const ToggleSwitch = () => {

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
    console.warn(isEnabled)
    setIsEnabled(previousState => !previousState);
    }
    return (
        <View>
        <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
        </View>
    );
}

export default ToggleSwitch;