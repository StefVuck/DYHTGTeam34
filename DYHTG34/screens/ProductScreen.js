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
