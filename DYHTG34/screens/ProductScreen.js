import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, FlatList, Image } from 'react-native';

const ProductScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  const getBodyShape = (BodyShapeEnum) => {
    const BodyShapeEnumMap = {
      1:'SStyle',
      2:'TStyle',
      3:'DoubleCut',
      4:'Offset',
      5:'HollowBody',
      6:'VStyle',
      7:'SmallBody',
      8:'Orchestral',
      9:'GrandAuditorium',
      10:'Dreadnought',
      11:'Jumbo',
      12:'Explorer',
      13:'SingleCut',
      14:'Combo',
      15:'Head',
      16:'Cabinet',
    };
    return BodyShapeEnumMap[BodyShapeEnum];
  };

  const getColor = (ColourEnum) => {
    const ColourEnumMap = {
      1:'Red',
      2:'Orange',
      3:'Yellow',
      4:'Green',
      5:'Blue',
      6:'Purple',
      7:'Pink',
      8:'Brown',
      9:'Gold',
      10:'Silver',
      11:'Grey',
      12:'Black',
      13:'White',
      14:'Natural',
      15:'Multicolour',
    };
    return ColourEnumMap[ColourEnum];
  };

  const getPickup = (PickupEnum) => {
    const PickupEnumMap = {
      1:'ElectroAcoustic',
      2:'SS',
      3:'SSS',
      4:'HH',
      5:'HHH',
      6:'HS',
      7:'HSS',
      8:'HSH',
      9:'P90',
      10:'S',
      11:'H',
    };
    return PickupEnumMap[PickupEnum];
  };


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
            <FlatList
                data={data}
                keyExtractor={(item) => item.SKU_ID}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <Image source={{ uri: item.PictureMain }} style={styles.productImage} />
                        <Text>Product ID: {item.SKU_ID}</Text>
                        <Text>Name: {item.ItemName}</Text>
                        <Text>Title: {item.Title}</Text>
                        <Text>Brand: {item.BrandName}</Text>
                        <Text>Description: {item.Description}</Text>
                        <Text>Details: {item.ProductDetail}</Text>
                        <Text>Price: £{item.SalesPrice}</Text>
                        <Text>In Stock: {item.QtyInStock}</Text>
                        <Text>On Order: {item.QtyOnOrder}</Text>
                        <Text>Colour: {getColor(item.ColourOption)}</Text>
                        <Text>Body Shape: {getBodyShape(item.ShapeOption)}</Text>
                        <Text>Pickup: {getPickup(item.PickupOption)}</Text>
                        <Text>{'\n'}{'\n'}</Text>
                    </View>
                )}
            />
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
