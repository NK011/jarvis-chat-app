import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../firebase'

const ContactViewList = ({id, chatName, enterChat }) => {

    const [chatMessages, setChatMessages] = useState([])

    useEffect(() => {
        const unsubscribe = db.collection("chats").doc(id).collection("messages").orderBy("timestamp", "desc").onSnapshot((snapshot) =>setChatMessages(snapshot.docs.map(doc => doc.data()
        )))

        console.log(chatMessages)

        return unsubscribe
    },[])

    

    return (
        <ListItem key={id} onPress={()=> enterChat(id, chatName)} bottomDivider >
            <Avatar 
                rounded
                title={chatName[0]}
                source={
                    {
                        uri: chatName[0],
                    }
                }
                activeOpacity = {0.7}
                size = "small"
            />
            <ListItem.Content>
                <ListItem.Title> {chatName}  </ListItem.Title>
                <ListItem.Subtitle style={{color: "green"}} > {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message} </ListItem.Subtitle>
            </ListItem.Content>    
        </ListItem>
    )
}

export default ContactViewList

const styles = StyleSheet.create({})
