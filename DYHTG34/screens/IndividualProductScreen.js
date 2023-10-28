<<<<<<< HEAD
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


=======
import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';

const ProductScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let response = await fetch('https://www.guitarguitar.co.uk/hackathon/products');
      let products = await response.json();
      setData(products);
    }
    catch(error) {
      console.error("Error fetching data: ", error);
    }
    setLoading(false);
  }
  
  useEffect(() => {
      fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text> Loaded </Text> // make this loop through every product and display a product component
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5'
    },
    orderItem: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    }
});

export default ProductScreen;
>>>>>>> 2cf0e94ca1f4ee2438f35f2632d26e782e0ac102
