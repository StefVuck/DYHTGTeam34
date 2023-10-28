import { useMemo } from 'react';
import { StyleSheet, Text, TextInput, Button, SafeAreaView } from 'react-native';

const ProductScreen = (product) => {

    if (product.QtyInStock > 0) {
        if (product.Online) {
            let available = "Available Online";
        }
        else {
            let available = "Only availale in store";
        };
    }
    else {
        let available = "Not in stock";
    }

    const varientList = useMemo(() => getVarients(product.name));

    return (
        <SafeAreaView>
            <Text>product.title</Text>
            <Text>product.ItemName</Text>
            <Text>product.BrandName</Text>
            <Text>available</Text>
            <Text>product.description</Text>
            <Text>product.ProductDetail</Text>
            <Text>product.SalesPrice</Text>
            <Text>product.QtyInStock</Text>
            <Text>product.ColourOption</Text>
            <Text>product.PickupOption</Text>
            <Text>product.ShapeOption</Text>
        </SafeAreaView>
    );



};




const getVarients = async (name) => {
    let response = await fetch();
    let data = await response.json();

    return (data.filter((product) => product.ItemName == name));
}


