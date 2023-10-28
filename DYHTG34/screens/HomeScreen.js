import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}> {/* This is safe area wrapper*/}
      <View style={tw`p-5`}> {/* Views are akin to Divs*/ }
        <Text> Hello! </Text>

        <Image style={{
          width:100,
          height:100,
          resizeMode: "contain",
        }}
        source = {{uri: "https://images.guitarguitar.co.uk/cdn/small/global/logos/secondary.png"}} />
        {/* Guitar Guitar Logo */}
      <NavOptions />  {/* This calls the NavOptions and adds to page */}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;  {/*Please Include export default for all anon functions so theyre visible */}

{/* for now ignore */}
const styles = StyleSheet.create({
  text: {
    color: 'blue',
  },
});
