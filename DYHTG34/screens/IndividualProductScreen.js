import React, {useMemo, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, Button, SafeAreaView } from 'react-native';
import Product from "../components/Product";
const IndividualProductScreen = () => {

    let [data, setData] = useState(null);
    let [loading, setLoading] = useState(true);
    let [available, setAvailable] = useState('');


    useEffect(() => {
        setLoading(true);

        const fetchProduct = async () => {
            try {
                let response = await fetch('https://www.guitarguitar.co.uk/hackathon/products/');
                let products = await response.json();

                let prod = products.find((prod) => prod.ItemName == "FE620 Electric Guitar Gig Bag");
                setData(prod);

                if (prod != null) {
                    if (prod.QtyInStock > 0) {
                        if (prod.Online) {
                            setAvailable("Available Online");
                        } else {
                            setAvailable("Only available in store");
                        }
                    } else {
                        setAvailable("Not in stock");
                    }
                }

            } catch (error) {
                console.log("error ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log(data);

        }, 5000);

        return () => clearTimeout(timer);
    }, [data]);

    return (<SafeAreaView>{loading ? (<Text> Loading</Text >) : (<Product product={data} available={available} />)}</SafeAreaView>);
};

    const getVarients = async (name) => {
        let response = await fetch();
        let data = await response.json();

        return (data.filter((product) => product.ItemName == name)
        );
};


export default IndividualProductScreen;
