import { StyleSheet, Text, TextInput, Button, SafeAreaView, Touchable } from 'react-native';
import React, { useState} from 'react';
import { setCustomerId } from '../components/CustomerID';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../node_modules/react-native-elements/dist/index';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <Text>Login</Text>
            <TextInput
                style={styles.textInput}
                value={email}
                placeholder='Enter username'
                onChangeText={setEmail} />

            <Input
                label="Password"
                style={styles.textInput}
                secureTextEntry={isSecureEntry}
                icon={<TouchableOpacity onPress={() => {
                    setIsSecureEntry((prev) => !prev)
                }}>
                    <Text>{isSecureEntry ? 'Show' : 'Hide'}</Text>
                    </TouchableOpacity>}
                iconPosition="right"
                value={email}
                placeholder='Enter Password'
                onChangeText={setpassword} />

            <Button
                onPress={() => { this.onPress(navigation, email, password); setEmail(''); setPassword('') }}
                title='Log in'
            />
        </SafeAreaView>
    );
};


onPress = async (navigation, email, password) => {
    let customer = await checkemail(email);
    if (customer != -1 && customer.length != 0 && password == 'Password') {
        setCustomerId(customer.Id);
        navigation.navigate("HomeScreen");
    };
};



let checkemail = async (userEmail) => {

    try {
        let response = await fetch('https://www.guitarguitar.co.uk/hackathon/customers/');
        let data = await response.json();

        let customer = data.find((customer) => customer.email == userEmail);
        return customer;
    } catch (error) {
        console.log("Json fetch failed, ", error);
        return -1;
    };
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




