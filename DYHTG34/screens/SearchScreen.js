import * as React from "react";
import { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, FlatList, Image, SafeAreaView, Dimensions, TextInput } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { getLoyaltyLevel } from "../components/CustomerID";
import { htmlToText } from 'html-to-text';

const SearchScreen = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
  const MoreLessComponent = ({ truncatedText, fullText }) => {
    const [more, setMore] = React.useState(false);
    return (
      <Text>
        {!more ? `${truncatedText}...` : fullText}
        <TouchableOpacity onPress={() => setMore(!more)}>
          <Text>{more ? 'less' : 'more'}</Text>
        </TouchableOpacity>
      </Text>
    );
  };
  const MoreInfo = ({text, linesToTruncate}) => {
    const [clippedText, setClippedText] = React.useState(false);
    return clippedText ? (
      <MoreLessComponent truncatedText={clippedText} fullText={text} />
    ) : (
      <Text
        numberOfLines={linesToTruncate}
        ellipsizeMode={'tail'}
        onTextLayout={(event) => {
          const { lines } = event.nativeEvent;
          let text = lines
            .splice(0, linesToTruncate)
            .map((line) => line.text)
            .join('');
          setClippedText(text.substr(0, text.length - 9));
        }}>
        {text}
      </Text>
    );
  };
  const calculateDiscountedPrice = (item) => {
    const loyalty = getLoyaltyLevel();

    switch (loyalty) {
        case 0:
            return item.price;
        case 1:
            if (item.category.substring(0, 2) === "GU") {
                return item.price * 0.95;
            } else {
                return item.price;
            }
        case 2:
            if (item.category.substring(0, 2) === "GU" || item.category === "ACGB") {
                return item.price * 0.90;
            } else {
                return item.price;
            }
        case 3:
            return item.price * 0.9;
        default:
            return item.price; // return the original price if the loyalty value is unexpected.
    }
}

  const filterData = (term) => {
    if (!term) {
      setFilteredData(data);
      return;
    }

    const results = data.filter(item => item.ItemName.toLowerCase().includes(term.toLowerCase())); // PUT THIS IN THE USERNAME LOGN
    setFilteredData(results);
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    filterData(text);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let response = await fetch('https://www.guitarguitar.co.uk/hackathon/products');
        let products = await response.json();
        setData(products);
        setFilteredData(products);
      }
      catch(error) {
        console.error("Error fetching data: ", error);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={tw`bg-blue-500 h-full`}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
          value={searchTerm}
          onChangeText={handleSearch}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={filteredData}
            style={styles.FlatList}
            pagingEnabled
            keyExtractor={(item) => item.SKU_ID}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
              <Image source = {require("../assets/logo.png")} style={styles.productLogo} />
              <Image source={{ uri: item.PictureMain }} style={styles.productImage} />
              <Text style={styles.brandName}>Name: {item.ItemName}</Text>
              {item.Title && <Text style={styles.brandName}>Title: {item.Title}</Text>}
              <Text>Brand: {item.BrandName}</Text>
              <Text>Price: £{calculateDiscountedPrice(item)}</Text>
              <Text>In Stock: {item.QtyInStock}</Text>
              <Text>On Order: {item.QtyOnOrder}</Text>
              {item.ColorOption && <Text>Colour: {getColor(item.ColourOption)}</Text>}
              {item.ShapeOption && <Text>Body Shape: {getBodyShape(item.ShapeOption)}</Text>}
              {item.PickupOption && <Text>Pickup: {getPickup(item.PickupOption)}</Text>}
              {item.Description && <MoreLessComponent text={item.Description} linesToTruncate = {8}/> }
              <Text style={styles.productDescription}>Description: {item.Description}</Text> 
              <Text>Details: </Text>
              {item.ProductDetail.length <= 200 ? (
                <Text>{htmlToText(item.ProductDetail)}</Text>
              ) : (
                <Text>{htmlToText(item.ProductDetail).substring(0, 200) + "..."}</Text>
              )}
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
  fontSize: 18,
  borderWidth: 1,
  fontWeight: 'bold',
},
brandName: {
  fontSize: 16,
  borderWidth: 1,
  color: '#777',
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
},
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    width: ScreenWidth * 0.9
  }
});

export default SearchScreen;
