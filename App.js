import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView,FlatList, Image } from 'react-native';
import TextItem from './components/textItem';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import UserInput from './components/textInput';
import InfoScreen from './components/infoScreen';
import NoteHeader from './components/noteHeader'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, child, get, orderByChild, push, onChildAdded} from "firebase/database";

export default function App() {
  const [savedText, saveNewText] = useState();
  const [isNoteOpen, setNoteOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const [keyReferences, newKeyRef] = useState([])

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://reactnativeapp-718b5-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

  const textHandler = (textData) =>{
const noteListRef = ref(database, 'dailyNotes');
const newNoteRef = push(noteListRef);
set(newNoteRef, {
  note: textData
});
  }
const removeTextItem = (textID) => {
    saveNewText(savedText=>{
      return savedText.filter((textItem) => textItem.id !== textID)
    })
  }
const cancelTyping = () =>{
    setNoteOpen(false);
}


const closeInfo = () =>{
  setInfoOpen(false);
}
const getNotesFromApi = () => {
  /*const starCountRef = ref(database, 'dailyNotes');
  onValue(starCountRef, (snapshot) => {
    const notesFromDb = snapshot.val();
    console.log(notesFromDb[savedText.length])
    console.log(savedText)
    const id=savedText.length
    const noteIntoState = notesFromDb.note
    saveNewText([...savedText, {noteIntoState, id}])
    console.log('state '+savedText)
    console.log(notesFromDb)
  });*/console.log(savedText);
};
/*function getNotesFromApi2() {
const dbRef = ref(database, '/dailyNotes');
onValue(dbRef, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    const id = childKey
    const noteIntoState = childData.note
    saveNewText([...savedText, {noteIntoState, id}])
  });
}, {onlyOnce:true
});}*/
  useEffect( ()=>{
    const kirjaRef = ref(database, '/dailyNotes');
    onValue(kirjaRef, (snapshot)=>{
      const theseDiaryNotes = snapshot.val();
      const diaryList = []
      for (let i in theseDiaryNotes){
        diaryList.push(theseDiaryNotes[i].note)
      }
      saveNewText(diaryList)
    })
  },[]
  )

  return (
    <View style={styles.mainContainer}>
      <View style={styles.buttonMargin}>
      <NoteHeader style={styles.headerFront}/>
      <Button title="Open note editor" onPress={() => setNoteOpen(true)}/>
      <Button title="Refresh entries" onPress={() => getNotesFromApi()}/>
      <Button title="Open info" onPress={() => setInfoOpen(true)}/>
      </View>
    <InfoScreen infoVisible={isInfoOpen} closeInfoScreen={closeInfo}/>
    <UserInput noteVisible={isNoteOpen} addTextProp={textHandler} cancelProp={cancelTyping}closeNote={cancelTyping}/>
    <Text>Tap on a note to delete it.</Text>
    <Text style={styles.separator}>Your notes are displayed below this.</Text>
    <View>
    <FlatList 
    style={styles.flatContainer}
    keyGetter={(item)=> item.id}
    data={savedText}
    horizontal={false}
    numColumns={2}
    renderItem={({item})=>(
      
      <TextItem key={item.id}
      data={item}
      onDeleteItem={removeTextItem}/>
      
    )}/></View>

    </View>
    
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#faebd7',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  separator:{
    fontWeight: 'bold',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    marginBottom: 5
  },
  buttonMargin:{
    justifyContent: 'space-around',
    flex:1,
    padding: 5,
    marginTop: 100
  },
  flatContainer:{
    flex: 1,
    height: '100%',
    marginBottom: 100
  }
});
