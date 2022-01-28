import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const NoteHeader = props =>{
    return( 
    <View style={styles.HeaderStyle}>
              
      <Text style={styles.headerText}>For your diary needs</Text>
    </View> 
  )
};

const styles = StyleSheet.create({
    headerStyle:{
        flex: 1,
        margin: 5,
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      },
      headerText:{
          fontWeight: '500',
          fontSize: 20
      }
});

export default NoteHeader;