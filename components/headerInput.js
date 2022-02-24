import React,{useState} from 'react';
import {View, TextInput, Button, StyleSheet, Modal, Switch} from 'react-native';

const UserInputHeader = props =>{
    const [enteredText, newText] = useState('');
    const inputHandlerText = (inputFromUser) => {
        newText(inputFromUser);
      }
      const textClearHandler = () =>{
        props.addTextProp(enteredText);
        newText('');
        props.closeNote();

      }
    return (
    <Modal visible={props.headNoteVisible} animationType='slide'>
    <View style={styles.containerForInput}>
    <TextInput style={styles.textInput} 
    placeholder='enter text here'
    onChangeText={inputHandlerText}
    value={enteredText}/>
    <View style={styles.buttonContainerInputPage}>
    <Button title="save header" onPress={textClearHandler}/>
    <Button title='close' color='red' onPress={props.cancelProp}/>
    </View>
  </View>
  </Modal>
  )
};

const styles = StyleSheet.create({
    textInput:{
        padding: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 5,
      },
      containerForInput:{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
      },
      buttonContainerInputPage:{
          justifyContent: 'center',
          alignItems: 'center',
      }
})

export default UserInputHeader;