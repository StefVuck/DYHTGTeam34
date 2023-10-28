import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { Padding, Color } from "../GlobalStyles";



const StartScreen = () => {
    const navigation = useNavigation();
    useEffect(navigation);

    return(
        <SafeAreaView style={tw`bg-white h-full`}> 
            <View style={styles.home}>
                <View style={[styles.logo, styles.logoFlexBox]}>
                    <View style={[styles.logoWrapper, styles.logoFlexBox]}>
                <Image
                    style={styles.logoIcon}
                    contentFit="cover"
                    source={require("../assets/logo.png")} 
                    />
                </View>
            </View>
        </View>
        </SafeAreaView>
    );

};


useEffect = (navigation) => {
    setTimeout(() => {
        navigation.navigate("HomeScreen");
    }, 2000);
}, [];


const styles = StyleSheet.create({
    logoFlexBox: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    logoIcon: {
      alignSelf: "stretch",
      maxWidth: "100%",
      maxHeight: "100%",
      overflow: "hidden",
      width: "100%",
      flex: 1,
    },
    logoWrapper: {
      width: 200,
      height: 200,
      padding: Padding.p_10xs,
    },
    logo: {
      padding: Padding.p_3xs,
    },
    home: {
      backgroundColor: Color.colorLightcyan,
      height: 800,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      width: "100%",
      flex: 1,
    },
  });
  
  export default StartScreen;