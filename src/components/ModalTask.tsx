import React from "react";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";

export default function ModalTask(props) {
  return (
    <View>
      <Modal>
        <View>
          <Text>Voce clicou na Task {props.name}</Text>
        </View>
      </Modal>
    </View>
  );
}