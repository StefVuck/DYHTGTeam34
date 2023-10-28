import { React, useState } from 'react'
import { StyleSheet, Text, TextInput, Button, View, SafeAreaView, Image } from 'react-native';


onsubmitEdit = () => {
    checkemail(email)
}

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    return (
        <SafeAreaView>
            <Text>Login</Text>
            <TextInput
                style={styles.textInput}
                value={email}
                placeholder='Enter username'
                onChangeText={setEmail} />
            <Button
                onPress={() => { this.onPress(email); setEmail('') } }
                title='Log in'
                />
        </SafeAreaView>
    )
}

onPress = (email) => {
    console.log(checkemail(email));

}


let checkemail = async (userEmail) => {
    try {
        let response = await fetch('https://www.guitarguitar.co.uk/hackathon/customers/');
        let customer = await response.json()

        return customer;
    }

    catch (error) {
        console.log("Json fetch failed, ", error);
        return -1;
    }
}


const styles = StyleSheet.create({
    textInput: {
        fontSize: 20,
        borderWidth: 2,
        borderColor: 'blue',
        margin: 10
    }
});


export default LoginScreen;




