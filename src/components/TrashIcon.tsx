import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TrashIcon(props) {
    return (
        <TouchableWithoutFeedback
            onPressIn={() => {}}
            onPressOut={() => {}}
            //onMouseEnter={() => {}}
          //  onMouseLeave={() => {}}
        >
            <TouchableOpacity onPress={() => props.remove(props.id)} style={styles.container}>
                <Ionicons name="trash-outline" size={24} color="black" style={styles.trash} />
            </TouchableOpacity>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        alignItems: 'center',
    },
    trash: {
        transform: [{ translateX: 15 }], 
        marginEnd: 10,
        margin: 10,
        padding: 10,
    },
});
