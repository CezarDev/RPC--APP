import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from 'expo-checkbox';

export default function CheckboxComponent(props) {

  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (optionId) => {
    props.onSelect(optionId);
    setSelectedOption(optionId);
  };

  return (
    <View style={styles.container}>
      {props.options.map((option) => (
        <View key={option.id} style={styles.section}>
          
          <Checkbox
            style={styles.checkbox}
            value={selectedOption === option.id}
            onValueChange={() => handleCheckboxChange(option.id)}
            color={'#4630EB'}
          />
          <Text style={styles.name}>{option.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 15,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 15,
  },
  checkbox: {
    margin: 4,
  },
});

