import React, {useMemo, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, Button, SafeAreaView } from 'react-native';
import Product from "../components/Product";
const IndividualProductScreen = () => {

    let [data, setData] = useState(null);
    let [loading, setLoading] = useState(true);
    let [available, setAvailable] = useState('');


    setLoading(true);
    setAvalible('');


    const fetchProduct = async () => {
        try {
            let response = await fetch('https://www.guitarguitar.co.uk/hackathon/products/');
            let products = await response.json();

            let prod = products.find((prod) => prod.ItemName == "FE620 Electric Guitar Gig Bag");
            setData(prod);

        }

        catch (error) {
            console.log("error ", error);
        }

        finally {
            setLoading(false);
            return;
        };
        
    };

    setTimeout((console.log(data)), 5000);

    if (prod != null) {
        if (prod.QtyInStock > 0) {
            if (prod.Online) {
                available = "Available Online";
            } else {
                available = "Only available in store";
            }
        } else {
            available = "Not in stock";
        }
    }
    setAvailable(available);
    return (<SafeAreaView>{loading ? (<Text> Loading</Text >) : (<Product product={data} available={available} />)}</SafeAreaView>);
};

    const getVarients = async (name) => {
        let response = await fetch();
        let data = await response.json();

        return (data.filter((product) => product.ItemName == name)
        );
};


export default IndividualProductScreen;
