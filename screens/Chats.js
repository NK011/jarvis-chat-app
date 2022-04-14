import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import {  } from 'react-native-gesture-handler'
import ContactViewList from '../Components/ContactViewList'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { auth, db } from '../firebase'


const Chats = ( { navigation } ) => {

    const signOut = () => {
        console.log("signout")
        auth.signOut().then(() => navigation.replace("Login"))
    }

    const [chats, setChats] = useState([])

    useEffect(()=>{
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => setChats(
            snapshot.docs.map( (doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        ) )

        return unsubscribe
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={ { marginLeft: 20 } } >
                   <TouchableOpacity activeOpacity={0.8} onPress={signOut}>
                         <Avatar 
                            title={auth?.currentUser?.displayName[0]}
                            rounded
                            source={{
                                uri: auth?.currentUser?.photoURL
                            }}
                        />
                   </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    display: "fles",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity activeOpacity={0.8}>
                        <AntDesign name="camerao" size="large" color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Add New Chat")}>
                        <SimpleLineIcons name="pencil" size="large" color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat Screen", {
            id,
            chatName
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
               {chats.map( ( { id, data: {chatName}}  ) => (
                   <ContactViewList 
                   key={id}
                    id={id}
                    chatName={chatName}
                    enterChat={enterChat}
                   />
               ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Chats

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})
