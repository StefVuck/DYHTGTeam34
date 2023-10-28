import { StyleSheet, Text, TextInput, Button, View, SafeAreaView, Image, ActivityIndicator, FlatList, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { setCustomerId } from '../components/CustomerID';



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

onPress = async (email) => {
    let result =  await checkemail(email);
}



let checkemail = async (userEmail) => {

    try {
        let response = await fetch('https://www.guitarguitar.co.uk/hackathon/customers/');
        let data = await response.json()

        let customer = data.find((customer) => customer.email == userEmail);
        setCustomerId(customer.Id);
        return customer;
    } catch (error) {
        console.log("Json fetch failed, ", error);
        return -1;
    }
};


const styles = StyleSheet.create({
    textInput: {
        fontSize: 20,
        borderWidth: 2,
        borderColor: 'blue',
        margin: 10
    }
});


export default LoginScreen;




