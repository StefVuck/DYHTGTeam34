import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

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
    <View style={style.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text> Loaded </Text> // make this loop through every product and display a product component
      )}
    </View>
  )
}

export default ProductScreen;
