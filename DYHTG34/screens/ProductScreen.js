import * as React from "react";
import { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, FlatList, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { Padding, FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import { getLoyaltyLevel } from "../components/CustomerID";


import { htmlToText } from 'html-to-text';
import RenderHtml from 'react-native-render-html';
import { Assets } from "@react-navigation/elements";



const ProductScreen = ({ query }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listHeight, setListHeight] = useState(ScreenHeight);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log(query)
    
    if(query!="") {
      let categories = products.map(product => product.Category);
      console.log("All fetched categories:", categories);


      const results = products.filter(item => item.Category && item.Category.toLowerCase().includes(query.toLowerCase()));
  
      console.log("Filtered results: ", results);
      setData(results);
    } else {
      setData(products)
    }

  }, [query, products]);

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
  
  const calculateDiscountedPrice = (item) => {
    const loyalty = getLoyaltyLevel();

    switch (loyalty) {
        case 0:
            return item.SalesPrice;
        case 1:
            if (item.category.substring(0, 2) === "GU") {
                return item.SalesPrice * 0.95;
            } else {
                return item.SalesPrice;
            }
        case 2:
            if (item.category.substring(0, 2) === "GU" || item.category === "ACGB") {
                return item.SalesPrice * 0.90;
            } else {
                return item.SalesPrice;
            }
        case 3:
            return item.SalesPrice * 0.9;
        default:
            return item.SalesPrice; // return the original price if the loyalty value is unexpected.
    }
}

const MoreLessComponent = ({ truncatedText, fullText }) => {
  const [more, setMore] = useState(false);

  return (
    <View>
      <Text>{!more ? `${truncatedText}...` : fullText}</Text>
      <TouchableOpacity onPress={() => setMore(!more)}>
        <Text>{more ? 'less' : 'more'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const MoreInfo = ({ text, linesToTruncate }) => {
  const [clippedText, setClippedText] = useState(null);

  if (clippedText !== null) {
    return (
      <MoreLessComponent truncatedText={clippedText} fullText={text} />
    );
  }

  return (
    <Text
      numberOfLines={linesToTruncate}
      ellipsizeMode={'tail'}
      onTextLayout={(event) => {
        const { lines } = event.nativeEvent;
        if (lines.length > linesToTruncate) {
          let truncated = lines
            .splice(0, linesToTruncate)
            .map((line) => line.text)
            .join('');
          setClippedText(truncated);
        }
      }}
    >
      {text}
    </Text>
  );
};

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let response = await fetch('https://www.guitarguitar.co.uk/hackathon/products');
      let products = await response.json();

      // console.log("Filteredprod: ", products );
      setProducts(products);
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

  useEffect(() => {
    //console.log(data);
}, [data]);




  return (
    <SafeAreaView style={tw`bg-blue-500 h-full`}> 

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          
          <FlatList
            data={data}
            style={styles.FlatList}
            pagingEnabled
            keyExtractor={(item) => item.SKU_ID}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
              <Image source = {require("../assets/logo.png")} style={styles.productLogo} />
              <Image source={{ uri: item.PictureMain }} style={styles.productImage} />
            <View style={styles.insideCard}>
              <Text style={styles.productName}>{item.ItemName}</Text>
              <Text style={styles.brandName}>Brand: {item.BrandName}</Text>
              <Text style={styles.brandName}>Price: £{calculateDiscountedPrice(item)}</Text>
              <Text style={styles.brandName}>In Stock: {item.QtyInStock}</Text>
              <Text style={styles.brandName}>On Order: {item.QtyOnOrder}</Text>
              {item.ColorOption && <Text>Colour: {getColor(item.ColourOption)}</Text>}
              {item.ShapeOption && <Text>Body Shape: {getBodyShape(item.ShapeOption)}</Text>}
              {item.PickupOption && <Text>Pickup: {getPickup(item.PickupOption)}</Text>}
              {item.Description && <Text>Description: {item.Description} </Text> }
            </View>
            <View>
              <Text>Details: </Text>
              <MoreInfo text={htmlToText(item.ProductDetail)} linesToTruncate = {13}/>             
              </View>
            </View>
            )
            } 
          />
          )}
        </View>

    </SafeAreaView>
);
};

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e4fcff',
    alignItems: "center", 
    justifyContent: "center", 
    alignSelf: "center", 
},

    orderItem: {
        backgroundColor: "#e4fcff",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    productCard: {
      flex: 1,
      backgroundColor: '#ffffff',   
      padding: 15,
      borderRadius:20,
      marginBottom: 15,            
      borderColor: '#ddd',         
      borderWidth: 1,              
      shadowColor: '#000',         
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.25,         
      shadowRadius: 3.84,          
      elevation: 5,  
      height:ScreenHeight*0.86,           
      flex: 1,
    
  },

  insideCard: {
    flex: 1,
      backgroundColor: Color.colorLightcyan,   
      padding: 15,
      borderRadius:20,            
      borderColor: '#ddd',         
      borderWidth: 1,              
      shadowColor: '#000',         
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.25,         
      shadowRadius: 3.84,          
      elevation: 3,             
  },
  productLogo: {
    width: 100, 
    height: 100, 
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  brandName: {
    fontSize: 14,
    color: "#777"
  },
  productDescription: {
    fontSize: 13,
    borderWidth: 1,

  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 1,
  },
  stockStatus: {
    fontSize: 14,
    color: '#ff6060',
  },
  container: {
    alignItems: "center", 
    justifyContent: "center", 
    alignSelf: "center", 
    flex: 1,
    padding: 10,
    backgroundColor: '#5fcfe3',
  }
});


export default ProductScreen;
