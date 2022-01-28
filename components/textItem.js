import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';



const TextItem = props =>{
    return( 
    <TouchableOpacity onPress={props.onDeleteItem}>
    <View style={styles.textContainer}>
        <Text>{props.data}</Text>
    </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
    textContainer:{
        flex: 1,
        margin: 5,
        padding: 2,
        borderRadius: 5,
        borderWidth: 1,
        flexGrow: 1,
        width: 300
      },
});

export default TextItem;