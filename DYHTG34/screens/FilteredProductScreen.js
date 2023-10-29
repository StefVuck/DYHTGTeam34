import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button, SafeAreaView, Image, TouchableOpacity, Text } from "react-native";
import ProductScreen from './ProductScreen';
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";

const FilteredProductScreen = () => {
  const [selectedQuery, setSelectedQuery] = useState('');  // changed default value to null for better clarity

  return (
    <SafeAreaView style={styles.screenContainer}> 
      <View style={styles.headerContainer}> 
        <Image 
          style={styles.logo}
          source={{ uri: "https://images.guitarguitar.co.uk/cdn/small/global/logos/secondary.png" }} 
        />
      </View>
      <View style={styles.optionsContainer}>
        <FilterOption title="All" onPress={() => setSelectedQuery("")} />
        <FilterOption title="Guitars" onPress={() => setSelectedQuery("GU")} />
        <FilterOption title="Synths" onPress={() => setSelectedQuery("AZ")} />
        <FilterOption title="Accessories" onPress={() => setSelectedQuery("AC")} />
      </View>
      <ProductScreen query={selectedQuery} />
    </SafeAreaView>
  );
};

const FilterOption = ({ title, onPress }) => (
  <TouchableOpacity style={styles.filterButton} onPress={onPress}>
    <Text style={tw`text-lg font-semibold`}>{title}</Text>
    <Icon name="arrowright" color="black" type="antdesign" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#ECECEC",
    padding: 20,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 150,
    resizeMode: "contain",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#5fcfe3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default FilteredProductScreen;
