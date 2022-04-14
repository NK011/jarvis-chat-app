import React, { useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
import { auth, db } from "../firebase"
import firebase from 'firebase'

const ChatScreen = ({ navigation, route }) => {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const sendMessage = () => {

        Keyboard.dismiss()
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: message,
            email: auth.currentUser.email,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL
        })
        setMessage('')
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerDisplay: {flexDirection: "row", alignItems: "center"},
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle : (
                <View style={styles.headerTitle} >
                    <Avatar rounded size={25} title={route.params.chatName[0]} source={{ uri: route.params.chatName[0]}}  />
                    <Text style={{fontSize: "medium" , marginLeft: 4 }} >{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()} >
                    <AntDesign name="leftcircle" size={24} color="white"/>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{ flexDirection:"row", alignItems: "center" }} >
                    <TouchableOpacity style={{ marginRight: 25 }} >
                    <FontAwesome name="video-camera" size={24} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 25 }}>
                    <Ionicons name="call" size={24} color="white" />
                </TouchableOpacity>
                </View>
            )
        })
        
    }, [navigation, message])

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy("timestamp", "asc").onSnapshot( (snapshot) => (
            setMessages(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ) )

        return unsubscribe

    }, [route])

    return (
        <SafeAreaView  style={{flex: 1, background: "#ffa07a" }} >
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height" } style={styles.container} keyboardVerticalOffset= {24} >
                <TouchableWithoutFeedback onPress={ Keyboard.dismiss } >
                    <>
                        <ScrollView contentContainerStyle={{paddingTop: 15}} > {messages.map(({id, data})=> 
                            data.email === auth.currentUser.email ? ( 
                            <View key={id} style={styles.senderBox} >
                                <Avatar 
                                    source={ {uri: data.photoURL} }
                                    rounded
                                    title={data.displayName[0]}
                                    postion="absolute"
                                    bottom={-10}
                                    right={-5}
                                    //for web
                                    containerStyle={{
                                        position: "absolute",
                                        bottom: -10,
                                        right: -5
                                    }}
                                />
                                <Text style={styles.senderText} > {data.message} </Text>
                            </View> ) : (  
                                <View key={id} style={styles.recieverBox} >
                                    <Avatar 
                                        source={{ uri: data.photoURL }}
                                        rounded
                                        position="absolute"
                                        left={-5}
                                        bottom={-10}
                                        //for web
                                        containerStyle={{
                                            position: "absolute",
                                            left: -5,
                                            bottom: -10
                                        }}
                                    />
                                    <Text style={styles.recieverText}> {data.message} </Text>
                                    <Text style={styles.recieverName}> {data.displayName} </Text>
                                </View>
                              )
                        )
                        }</ScrollView>
                        <View style={styles.footer} >
                            <TextInput style={styles.input} placeholder="Enter Message" onSubmitEditing={sendMessage} value={message} onChangeText={(text) => setMessage(text)} />
                            <TouchableOpacity onPress={sendMessage}>
                                <Ionicons name="send" size={25} />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    headerTitle: {
        flexDirection: "row",
        alignItems: "center",
    },
    container: {
        flex: 1
    },
    senderBox:{
        backgroundColor: "#bff000",
        padding: 15,
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    senderText: {
        color: "black",
        fontWeight: "500",
        marginRight: 10
    },
    recieverBox: {
        backgroundColor: "#2b68e6",
        alignSelf: "flex-start",
        padding: 15,
        marginLeft: 15,
        marginBottom: 10,
        borderRadius: 20,
        position: "relative",
        maxWidth: "80%",
        color:"white"
    },
    recieverText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 5
    },
    recieverName: {
        left: 10,
        paddingLeft: 10,
        marginBottom: -7,
        fontSize: 10,
        color: "white"
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    input: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30
    }
})
