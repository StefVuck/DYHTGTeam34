import React from "react";
import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import tw from 'tailwind-react-native-classnames';
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";


const data = [
    {
        id: "123",
        title: "Orders",
        screen: "OrderScreen",
    },
    {
        id: "456",
        title: "Profile",
        screen: "UserProfileScreen",
    },

    {
        id: "789",
        title: "Login",
        screen: "LoginScreen",
    },
    {
        id: "912",
        title: "Products",
        screen: "ProductScreen",
    },
    {
        id: "6969",
        title: "Search",
        screen: "SearchScreen",
    }
];

const NavOptions = () => {
    const navigation = useNavigation();

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem = {({item}) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate(item.screen)} 
                    style={tw`p-3 bg-gray-200 m-2`}
                >
                    <Text style={tw` text-lg font-semibold`}> {item.title} </Text>
                    <Icon name="arrowright" color="black" type="antdesign" />
                </TouchableOpacity>
            )}
        />
    );
};

export default NavOptions;
