import React, { Component, useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Switch, Alert } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import Task from './Task'
import ToggleSwitch from '../components/ToggleSwitch'
import AddTask from './AddTask'
import { FontAwesome5 } from '@expo/vector-icons';

export default class TaskList extends Component {

    state = {
        showDoneTasks: true,
        visibleTasks: [],
        showAddTask: false,
        tasks: [
            { id: Math.random(), name: 'Build App',  status_id:1, status: 'Pendente', created_at: new Date() },
            { id: Math.random(), name: 'Finalizar projeto', status_id:1, status: 'Pendente', created_at: new Date() },
            { id: Math.random(), name: 'Aplicativo',  status_id:2, status: 'Em andamento', created_at: new Date() },
            { id: Math.random(), name: 'Finalizar API', status_id:3, status: 'Concluída', created_at: new Date() },
            { id: Math.random(), name: 'Testes Unitarios', status_id:1, status: 'Pendente'},
            { id: Math.random(), name: 'Notificações Firebase', status_id:3, status: 'Concluída',}
        ]
    }    

    addTask = task => {
        const tasks = [...this.state.tasks]

        if (task.name.trim() === '') {
            Alert.alert('Nome da tarefa é obrigatório')
            return
        }        

        tasks.push({
            id: Math.random(),
            name: task.name,
            status_id: 1,
            status: 'Pendente',
            created_at: new Date()
        })
        this.setState({ tasks, showAddTask: false }, this.filterTasks)

        console.warn('Tarefa: ', task.name, 'Salva com sucesso!')
    }

    // edit = (task) => {
    //     console.warn('edit', task.name, task )
    // }

     edit =  (taskId, isChecked, newName) => {
        // Cria uma nova lista de tarefas com os dados atualizados

            console.warn('edit', taskId, isChecked, newName)
        const tasks = this.state.tasks;

        const updatedTasks = tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, name: newName, status_id: isChecked };
          } else {
            return task;
          }
        });

        this.setState({ tasks: updatedTasks }, this.filterTasks);
      };

    remove = (taskId) => {
        const tasks = this.state.tasks.filter(task => task.id !== taskId)

        this.setState({ tasks }, this.filterTasks)

        console.warn('remove', taskId)
    }

    toglleTasks = () => {
      console.warn(this.state.showDoneTasks)

        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    hideTasks = () => {
        const tasks = this.state.tasks.filter(task => task.status_id !== 3)
        this.setState({ tasks })
    }

    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.status_id === 1

            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({ visibleTasks })
    }

    textToggle = () => {
        let texto = this.state.showDoneTasks ? 'Mostrar tarefas pendentess' : 'Mostrar todas tarefas'

        return ( <Text>{texto}</Text> )
    }

    componentDidMount = () => {
        this.filterTasks()
    }

    countAllTasks = () => {
        return this.state.tasks.length
    }

    messageQtdTasks = () => {

        const message = []

        const total = this.countAllTasks()
        const pendentes = this.state.tasks.filter(task => task.status_id === 1).length
        const emAndamento = this.state.tasks.filter(task => task.status_id === 2).length
        const concluidas = this.state.tasks.filter(task => task.status_id === 3).length


        pendentes > 0 && message.push(`Pendentes ${pendentes} 😱 `)
        emAndamento > 0 && message.push(`Em Andamento ${emAndamento} 🚀 `)
        concluidas > 0 && message.push(`Concluídas ${concluidas} 😎 `)

        return total === 0 ? (<Text style={styles.noTasks}> Sem tarefas 😀 😍 ❤️ 🌟 🎉 </Text>) 
                           :        
                            (<Text> {message.join(' | ')} </Text>)  
    }
    

    render() {
        const today = moment().format('ddd, D [de] MMMM')

        return (
            <View style={styles.container}>
                
                <AddTask isVisible={this.state.showAddTask} onCancel={() => this.setState({ showAddTask: false })} 
                    onSave={this.addTask}
                />
            
                <ImageBackground
                    source={require('../../assets/images/rpc.png')}
                    style={styles.background} />
                
                <View style={styles.title}>
                    <Text style={styles.titleText}>Hoje </Text>
                    <Text style={styles.titleText}>{today}</Text>
                    
                </View>
                <Text style={styles.messageQtdTask}> {this.messageQtdTasks()}</Text> 

                {this.countAllTasks() > 0 && (
                <TouchableOpacity style={styles.buttonToggle} onPress={this.toglleTasks}> 
                    {this.textToggle()}
                </TouchableOpacity>
                )}

                <View style={styles.taskList}>
                    <FlatList
                        data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item}  edit={this.edit} remove={this.remove} />}
                    />
                </View>

                <TouchableOpacity style={styles.addButton}
                    activeOpacity={0.7}
                    onPress={() => this.setState({showAddTask: true})} >
                    <FontAwesome5 name="plus" size={24} color="black" />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E7EB', 
        paddingHorizontal: 20, 
        paddingTop: 30, 
        
    },
    background: {
        flex: 0.2,
        resizeMode: 'cover', 
        width: '42%',
        height: 80,
        marginTop: 0,
        marginBottom: 30,           
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4B5563', 
    },
    taskList: {
        flex: 3,
        paddingTop: 10,
    },
    buttonToggle: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
        borderRadius: 10,

    },    
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fcf8c3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageQtdTask: {
        fontSize: 13,
        color: '#4B5563',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    noTasks: {
    fontSize: 25, 
    fontWeight: 'bold',
    backgroundColor: '#a4faac',
    color: '#283d5a',
    padding: 10,
  },

});