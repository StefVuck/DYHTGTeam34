import { StyleSheet, Text, TextInput, Button, SafeAreaView} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';




const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <Text>Login</Text>
            <TextInput
                style={styles.textInput}
                value={email}
                placeholder='Enter username'
                onChangeText={setEmail} />
            <Button
                onPress={() => { this.onPress(navigation, email); setEmail('') } }
                title='Log in'
                />
        </SafeAreaView>
    )
}

onPress = async (navigation, email) => {
    let customer = await checkemail(email);
    if (customer.length != 0) {
        console.log("hello");
        navigation.navigate("HomeScreen");
    }
    console.log(result);
}



let checkemail = async (userEmail) => {

    try {
        let response = await fetch('https://www.guitarguitar.co.uk/hackathon/customers/');
        let data = await response.json();

        let customer = data.filter((customer) => customer.email == userEmail);
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




