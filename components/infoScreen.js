import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';

const InfoScreen = props =>{
    return( 
    <Modal visible={props.infoVisible} animationType='slide'>
    <TouchableOpacity onPress={props.closeInfoScreen}>
    <View style={styles.textContainerInfo}>
        <Text>This is a React Native app created by Kai Oraviita.</Text>
        <Text>This apps key features are: Notekeeping and passing time.</Text>
        <Text>You can close this view by pressing this info bubble.</Text>
    </View>
    </TouchableOpacity>
    </Modal>
  )
};

const styles = StyleSheet.create({
    textContainerInfo:{
        flex: 0,
        width: 300,
        padding:10,
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: 100,
        backgroundColor: 'aliceblue',
        borderRadius: 5
      },
});

export default InfoScreen;