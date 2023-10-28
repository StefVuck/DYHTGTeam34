import { StyleSheet, Text, TextInput, Button, SafeAreaView ,View, Dimensions} from 'react-native';
import React, { useState} from 'react';
import { setCustomerId } from '../components/CustomerID';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <View style={styles.centered}>
                <Text>Login</Text>
                <TextInput
                    style={styles.textInput}
                    value={email}
                    placeholder='Enter email'
                    onChangeText={setEmail} />
                <Button
                    onPress={() => { this.onPress(navigation, email); setEmail('') } }
                    title='Log in'
                    />
            </View>
        </SafeAreaView>
    )
}


onPress = async (navigation, email) => {
    let customer = await checkemail(email);
    if (customer != -1 && customer.length != 0) {
        setCustomerId(customer);
        navigation.navigate("HomeScreen");
    }
}



let checkemail = async (userEmail) => {

    try {
        let response = await fetch('https://www.guitarguitar.co.uk/hackathon/customers/');
        let data = await response.json();

        let customer = data.find((customer) => customer.email.toLowerCase().includes(term.toLowerCase()) == userEmail);
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
    },
    centered: {
        position: "absolute",
        top: Dimensions.get('window').height/2.5,
        left: Dimensions.get('window').width/3,
        alignItems: "center",
    }
});


export default LoginScreen;




