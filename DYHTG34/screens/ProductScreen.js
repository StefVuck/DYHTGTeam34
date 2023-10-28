import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, FlatList, Image, SafeAreaView, Dimensions } from 'react-native';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import tw from "tailwind-react-native-classnames";

const ProductScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listHeight, setListHeight] = useState(ScreenHeight);


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
    <SafeAreaView style={tw`bg-white h-full`}> 
    <View style={styles.container}>
        {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
        ) : (
            <FlatList
                data={data}
                keyExtractor={(item) => item.SKU_ID}
                pagingEnabled
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <Image source={{ uri: item.PictureMain }} style={styles.productImage} />
                        <Text>Product ID: {item.SKU_ID}</Text>
                        <Text>Name: {item.ItemName}</Text>
                        {item.Title && <Text>Title: {item.Title}</Text>}
                        <Text>Brand: {item.BrandName}</Text>
                        {item.Description && <Text>Description: {item.Description}</Text>}
                        <Text>Details: {item.ProductDetail}</Text>
                        <Text>Price: £{item.SalesPrice}</Text>
                        <Text>In Stock: {item.QtyInStock}</Text>
                        <Text>On Order: {item.QtyOnOrder}</Text>
                        {item.ColorOption && <Text>Colour: {getColor(item.ColourOption)}</Text>}
                        {item.ShapeOption && <Text>Body Shape: {getBodyShape(item.ShapeOption)}</Text>}
                        {item.PickupOption && <Text>Pickup: {getPickup(item.PickupOption)}</Text>}
                    </View>
                )}
            />
        )}
    </View>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
        alignItems: "center", 
        justifyContent: "center", 
        alignSelf: "center", 
    },
    orderItem: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    productItem: {
      backgroundColor: '#ffffff',   
      padding: 15,                 
      marginBottom: 15,            
      borderRadius: 10,            
      borderColor: '#ddd',         
      borderWidth: 1,              
      shadowColor: '#000',         
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.25,         
      shadowRadius: 3.84,          
      elevation: 5,  
      height: ScreenHeight - 30,      
        
  },
  productImage: {
    width: '100%',       
    height: 200,         
    resizeMode: 'contain', 
    borderRadius: 8,     
    marginBottom: 10     
},
});

export default ProductScreen;
