import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { Padding, Color } from "../GlobalStyles";

import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { ScreenHeight } from "react-native-elements/dist/helpers";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.home}> 
      <View style={styles.home}> 
        <Image style={{
          width:200,
          height:150,
          resizeMode: "contain",
        }}
        source = {{uri: "https://images.guitarguitar.co.uk/cdn/small/global/logos/secondary.png"}} />
      <NavOptions />  
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen; 

const styles = StyleSheet.create({
  text: {
    color: 'blue',
  },
  home: {
    backgroundColor: Color.colorLightcyan,
    height: ScreenHeight,
    padding: 20,
  }
});
