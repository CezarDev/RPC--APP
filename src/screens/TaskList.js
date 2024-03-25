import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import Task from './Task';
import AddTask from './AddTask';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from '@expo/vector-icons'; 
import storage from '../storage/storage';
import axios, { all } from 'axios';
import { BASE_URL } from "../config";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


const TaskList = () => {
    const { logout, user, userId, userToken } = useContext(AuthContext);

    console.log('user', user, userId, userToken);

    const [tasks, setTasks] = useState([]);
    //joao@email.com maria@email.com admin@email.com senha123

    async function getTasks() {
    axios
      .get(`${BASE_URL}tasksByUser/${userId}`, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        console.log("response", response.data);
        if (response.data) {
            const formattedTasks = response.data.map(task => ({
                id: task.id,
                name: task.name,
                status_id: task.status_id,
                status: task.status.name,
                created_at: task.created_at,
            }));
            setTasks(formattedTasks);
        }
      })
      .catch((error) => {
        console.warn("error", error);
      });
    }
    

    const [showDoneTasks, setShowDoneTasks] = useState(true);
    const [visibleTasks, setVisibleTasks] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);
    // const [tasks, setTasks] = useState([
    //     { id: Math.random(), name: 'Build App',  status_id:1, status: 'Pendente', created_at: new Date() },
    //     { id: Math.random(), name: 'Finalizar projeto', status_id:1, status: 'Pendente', created_at: new Date() },
    //     { id: Math.random(), name: 'Aplicativo',  status_id:2, status: 'Em andamento', created_at: new Date() },
    //     { id: Math.random(), name: 'Finalizar API', status_id:3, status: 'Concluída', created_at: new Date() },
    //     { id: Math.random(), name: 'Testes Unitarios', status_id:1, status: 'Pendente'},
    //     { id: Math.random(), name: 'Notificações Firebase', status_id:3, status: 'Concluída'}
    // ]);

    const addTask = task => {
        // const newTask = {
        //     id: Math.random(),
        //     name: task.name.trim(),
        //     status_id: 1,
        //     status: 'Pendente',
        //     created_at: new Date()
        // };

        if (task.name.trim() === '') {
            Alert.alert('Nome da tarefa é obrigatório');
            return;
        }

        axios.post(`${BASE_URL}tasks`, {
            name: task.name,
            status_id: task.status_id,
            user_id: userId,
        }, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${userToken}`,
            }
        }).then((response) => {
            console.warn("response", response.data.message);
            getTasks();
        }).catch((error) => {
            console.warn("error", error);
        });

       //const allTasks = getTasks();

        //setTasks(allTasks );
        setShowAddTask(false);
        filterTasks();
        console.warn('Tarefa:', task.name, 'salva com sucesso!');

        return;
    }

    const edit = (taskId, isChecked, newName) => {
        // const updatedTasks = tasks.map(task => {
        //     if (task.id === taskId) {
        //         return { ...task, name: newName, status_id: isChecked };
        //     } else {
        //         return task;
        //     }
        // });

        axios.put(`${BASE_URL}tasks/${taskId}`, {
            id: taskId,
            name: newName,
            status_id: isChecked,
            user_id: userId,
        }, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${userToken}`,
            }
        }).then((response) => {
            console.warn("response", response.data.message);
            getTasks();
        }).catch((error) => {
            console.warn("error", error);
        });

        //setTasks(updatedTasks);
        //filterTasks();
        console.warn('edit', taskId, isChecked, newName);
    };

    const remove = (taskId) => {

        axios.delete(`${BASE_URL}tasks/${taskId}`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${userToken}`,
            }
        }).then((response) => {
            console.warn("response", response.data.message);
            getTasks();
        }).catch((error) => {
            console.warn("error", error);
        });


        const updatedTasks = tasks.filter(task => task.id !== taskId);

        setTasks(updatedTasks);
        filterTasks();
        //console.warn('remove', taskId);
        return;
    }

    const toggleTasks = () => {
        setShowDoneTasks(!showDoneTasks);
        filterTasks();
    }

    const filterTasks = () => {
        let filteredTasks = [];
        if (showDoneTasks) {
            filteredTasks = [...tasks];
        } else {
            filteredTasks = tasks.filter(task => task.status_id === 1);
        }
        setVisibleTasks(filteredTasks);
    }

    const countAllTasks = () => {
        return tasks.length;
    }

    const messageQtdTasks = () => {
        const total = countAllTasks();
        const pendentes = tasks.filter(task => task.status_id === 1).length;
        const emAndamento = tasks.filter(task => task.status_id === 2).length;
        const concluidas = tasks.filter(task => task.status_id === 3).length;

        const message = [];
        pendentes > 0 && message.push(`Pendentes ${pendentes} 😱 `);
        emAndamento > 0 && message.push(`Em Andamento ${emAndamento} 🚀 `);
        concluidas > 0 && message.push(`Concluídas ${concluidas} 😎 `);

        return total === 0 ? (<Text style={styles.noTasks}> Sem tarefas 😀 😍 ❤️ 🌟 🎉 </Text>) 
                           : (<Text> {message.join(' | ')} </Text>);
    }

    useEffect(() => {
        getTasks();
        filterTasks();
    }, [showDoneTasks]);

    const today = moment().format('ddd, D [de] MMMM');

    return (
        <View style={styles.container}>
            <AddTask isVisible={showAddTask} onCancel={() => setShowAddTask(false)} onSave={addTask} />

            <ImageBackground source={require('../../assets/images/rpc.png')} style={styles.background} />

            <View style={styles.title}>
                <Text style={styles.titleText}>Olá {user} </Text>
                <TouchableOpacity onPress={logout}>
                    <Ionicons name="exit-outline" size={24} color="black" />    
                </TouchableOpacity>
             </View>
            <View style={styles.title}>
                <Text style={styles.titleText}>{today}</Text>
            </View>
            
            <Text style={styles.messageQtdTask}>{messageQtdTasks()}</Text> 

            {/* {countAllTasks() > 0 && ( */}
                <TouchableOpacity style={styles.buttonToggle} onPress={toggleTasks}> 
                    {showDoneTasks ? <Text>Atualizar - Mostrar tarefas pendentes</Text> : <Text>Atualizar - Mostrar todas tarefas</Text>}
                </TouchableOpacity>
            {/* )} */}

            <View style={styles.taskList}>
                <FlatList
                    data={visibleTasks}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <Task {...item}  edit={edit} remove={remove} />}
                />
            </View>

            <TouchableOpacity style={styles.addButton} activeOpacity={0.7} onPress={() => setShowAddTask(true)} >
                <FontAwesome5 name="plus" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
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

export default TaskList;
