// Task.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal, Button, TouchableOpacity, TextInput } from "react-native";
import CheckboxComponent from "../components/Checkbox";

import moment from "moment";
import "moment/locale/pt-br";
import { Ionicons } from '@expo/vector-icons';
import TrashIcon from '../components/TrashIcon';

const colors = {
  pending: '#FBBF24',
  inProgress: '#447cf7',
  completed: '#3cf545',
  default: '#9fcde2'
};

export default function Task(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const date = moment(props.created_at).format("ddd, D [de] MMMM");

  const [isChecked, setChecked] = useState(props.status_id);
  const [newName, setNewName] = useState(props.name);


  const backgroundColorByStatus = (status_id) => {
    switch (status_id) {
      case 1:
        return colors.pending;
      case 2:
        return colors.inProgress;
      case 3:
        return colors.completed;
      default:
        return colors.default;
    }
  };

  const statusOptions = [
    { id: 1, name: 'Pendente' },
    { id: 2, name: 'Em andamento' },
    { id: 3, name: 'Concluída' }
  ];


  const taskClicked = () => {
    setModalVisible(true);
  };

  const handleEdit = () => {
    //props.edit({ ...props, status });

    props.edit(props.id, isChecked, newName);

    setModalVisible(false);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColorByStatus(props.status_id) },
      ]}
    >
      <Pressable onPress={taskClicked}>
        <View style={styles.task}>
          <Text style={styles.taskName}>{props.name}</Text>
          <Text style={styles.taskStatus}>{props.status}</Text>
          <Text style={styles.taskDate}>{date}</Text>
        </View>
      </Pressable>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: backgroundColorByStatus(props.status_id) }]}>

            <TextInput style={styles.taskName} onChangeText={setNewName}>{props.name}</TextInput>
            <Text style={styles.taskStatus}>Status:</Text>
            <CheckboxComponent options={statusOptions} selected={isChecked} onSelect={setChecked}  />
            {/* <Text style={styles.taskDate}>Data de criação: {date}</Text> */}

            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Button title="Cancelar" onPress={() => setModalVisible(!modalVisible)} color={"grey"} />
              <Button title="Salvar" onPress={handleEdit} />
              <TrashIcon remove={props.remove} id={props.id} />
            </Pressable>
            
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#5d91f1",
    borderBottomWidth: 2,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  task: {
    flex: 1,
    padding: 15,
  },
  taskName: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
  },
  taskStatus: {
    fontSize: 20,
  },
  taskDate: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    //backgroundColor: "#f83",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#21b8f3",
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  trash: {
    justifyContent: 'flex-end',
  },


});
