import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Text, Input,  Button } from 'react-native-elements';
import { auth } from '../firebase';

const Register = ({ navigation  }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageURL, setImageURL] = useState('')

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => authUser.user.updateProfile({
            displayName: name,
            photoURL: imageURL
        }))
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
        })
    }, [navigation])

    return (
       <KeyboardAvoidingView style={styles.container} >
           <Text h3> Create Your Account </Text>
           <View style={styles.input}>
               <Input name="name"  placeholder="Enter Your Name"
               value={name} 
               onChangeText={(text) => setName(text)} />
               <Input name="email" type="email" placeholder="Email"
               value={email} 
               onChangeText={(text) => setEmail(text)} />
               <Input name="password" type="password" secureTextEntry placeholder="Enter Password"
               value={password} 
               onChangeText={(text) => setPassword(text)} />
               <Input name="imageURL" placeholder="Provide your image URL (optional)"
               value={imageURL} 
               onChangeText={(text) => setImageURL(text)} />
           </View>
           <Button title="Submit" style={styles.button} onPress={register} />
       </KeyboardAvoidingView>
    )
}

export default Register

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
    },
    button: {
        width: 200,
    }
})
