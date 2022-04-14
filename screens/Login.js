import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Image, Input  } from 'react-native-elements'
import { auth } from '../firebase'

const home = ({ navigation  }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.navigate("Chats")
            }
        })
    }, [])

    const login = () => {
        auth.signInWithEmailAndPassword(email, password).catch((err) => alert(err.message))
    }

    return (
        <KeyboardAvoidingView style={styles.container} >
            <Image 
                source={
                    {
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrVI1_VWzPDEGGF4kukUquibX9bTbXmgfJPA&usqp=CAU"
                    }
                } style={{height: 100, width: 100 }} 
            />
            <View style={styles.input} >
                <Input placeholder="email" name="name" value={email} autoFocus onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Password" name="password" value={password} secureTextEntry onChangeText={(text) => setPassword(text)} />
            </View>    
            <View style={styles.button} >
                <Button title="Login" onPress={login} raised />
                <Button title="Register" raised type="outline" onPress={() =>navigation.navigate('Register') }/>
            </View>
        </KeyboardAvoidingView>
    )
}

export default home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "white"
    },
    input: {
        width: 300,
        padding: 2,
    },
    button: {
        width: 200,
        marginTop: 5
    }

})
