import React from "react";
import SwipeableFlatList from 'react-native-swipeable-list'
import { View, Text, StyleSheet, Pressable, Modal, Button, TouchableOpacity } from "react-native";

export default function Swipe(props) {
    
    return (
        <SwipeableFlatList
            data={props.data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.container}>
                    <Pressable onPress={props.onPress}>
                        <View style={styles.task}>
                            <Text style={styles.taskName}>{item.name}</Text>
                            <Text style={styles.taskStatus}>{item.status}</Text>
                            <Text style={styles.taskDate}>{item.created_at + ""}</Text>
                        </View>
                    </Pressable>
                </View>
            )}
            renderLeft={({ item }) => (
                <View style={styles.left}>
                    <TouchableOpacity onPress={props.onEdit}>
                        <Text style={styles.leftText}>Editar</Text>
                    </TouchableOpacity>
                </View>
            )}
            renderRight={({ item }) => (
                <View style={styles.right}>
                    <TouchableOpacity onPress={props.onDelete}>
                        <Text style={styles.rightText}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    task: {
        flex: 1,
    },
    taskName: {
        fontSize: 20,
    },
    taskStatus: {
        fontSize: 16,
    },
    taskDate: {
        fontSize: 12,
    },
    left: {
        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    right: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftText: {
        color: 'white',
    },
    rightText: {
        color: 'white',
    },
});