import { StyleSheet, Text, TextInput, Button, SafeAreaView, TouchableOpacity, View } from 'react-native';
import React, { useState} from 'react';
import { setCustomerId } from '../components/CustomerID';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../node_modules/react-native-elements/dist/index';
import { Padding } from '../GlobalStyles';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.pageContainer}>
            <Text>Login</Text>
            <TextInput
                label="Username"
                style={styles.textInput}
                value={email}
                placeholder='Enter username'
                onChangeText={(value) => { setEmail(value) }} />

            <View style={styles.passwordContainer}>
                <TextInput
                    label="Password"
                    style={styles.passwordInput}
                    secureTextEntry={isSecureEntry}
                    value={password}
                    placeholder='Enter Password'
                        onChangeText={(value) => { setPassword(value) }} />
                    <TouchableOpacity onPress={(isSecureEntry) => setIsSecureEntry(!isSecureEntry)}>
                        <Text>{isSecureEntry ? 'show' : 'hide'}</Text>
                    </TouchableOpacity>




            </View>

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
    pageContainer: {
        padding: 20,
        justifyContent: 'center',
        flex: 1
    },
    textInput: {
        height : 50,
        fontSize: 20,
        borderWidth: 2,
        borderColor: 'blue',
        paddingTop: 20,
        marginHorizontal: 12,
        marginVertical: 20,
        padding: 10
    },
    passwordInput: {
        height: 40,
        fontSize: 20,
        borderWidth: 2,
        borderColor: 'white',
        margin: 12,
        flex: 1
    },

    passwordContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: 'blue',
        borderWidth: 2,
        marginHorizontal: 12,
        marginVertical: 20
    }
});


export default LoginScreen;




