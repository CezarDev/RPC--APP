import React, { Component } from "react";
import { View, Text, StyleSheet, Modal, TextInput, Button, TouchableWithoutFeedback, Alert } from "react-native";
import moment from "moment";
import "moment/locale/pt-br";

interface AddTaskProps {
    isVisible: boolean;
    onCancel: () => void;
}

interface AddTaskState {
    task: {
        name: string;
        status_id: number;
        status: string;
        created_at: Date;
    };
}

interface AddTaskProps {
    isVisible: boolean;
    onCancel: () => void;
    onSave?: any
}

const initialState = { task: { name: '', status_id: 1, status: 'Pendente', created_at: new Date() } };

    

export default class AddTask extends Component<AddTaskProps, AddTaskState> {
    state: AddTaskState = {
        task: {
            name: '',
            status_id: 1,
            status: 'Pendente',
            created_at: new Date()
        }
    }


    handleNameChange = (text: string) => {
        this.setState(prevState => ({
            task: { ...prevState.task, name: text }
        }));
    }

    handleStatusChange = (status: string) => {
        this.setState(prevState => ({
            task: { ...prevState.task, status }
        }));
    }

    handleAddTask = () => {
        const { task } = this.state;
        console.log("Nova tarefa:", task);
        
        this.props.onCancel();
    }

    save = () => {
        const newTask = { ...this.state.task };

        this.props.onSave && this.props.onSave(newTask);
         this.setState({ task: initialState.task });
    }

    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType="slide">

                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background} />
                </TouchableWithoutFeedback>

                <View style={styles.container}>
                    <Text style={styles.header}>Adicionar Tarefa</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome da tarefa"
                        onChangeText={this.handleNameChange}
                    />
                    <View style={styles.bottons}>
                        <Button  title="Adicionar" onPress={this.save} />
                        <Button color={'grey'} title="Cancelar" onPress={this.props.onCancel} />
                    </View>
                </View>

                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background} />

                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontFamily: 'Lato',
        height: 35,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        backgroundColor: '#fff',
        margin: 15,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        
    },
    container : {
        flex: 1,
        backgroundColor: '#dbe6fd',
    },
    header:{
        fontFamily: 'Lato',
        backgroundColor: '#f1cd01',
        color: '#1c2433',
        textAlign: 'center',
        padding: 15,
        fontSize: 20,            
    },
    bottons : {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});
