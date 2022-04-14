import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import  Icon  from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase'

const AddNewChat = ( { navigation } ) => {

    const [newChat, setNewChat] = useState('')

    const addNewChat = async () => {
        await db.collection("chats").add({
            chatName: newChat
        })
        .then(() => navigation.goBack())
        .catch(err => alert(err.message))
    }



    return (
        <View style={styles.container}>
           <Input
            leftIcon= {
                <Icon name="commenting-o" size={24} color="grey" type="antdesign" style={styles.icon}/>
            }
            placeholder="Add Name of Chat"
            value={newChat}
            onChangeText={(text) => setNewChat(text)}
            style={{padding: 15, color: "blue"}}
            onSubmitEditing ={addNewChat}
           />
           <Button title="Add" disabled={!newChat} style={styles.Button} onPress={addNewChat} />
        </View>
    )
}

export default AddNewChat

const styles = StyleSheet.create({
    icon: {
        margin: 8
    },
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20
    },
    Button: {
        width: 200
    }
})
