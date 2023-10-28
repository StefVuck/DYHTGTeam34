import React from "react";
import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import tw from 'tailwind-react-native-classnames';
import { Icon } from "react-native-elements";

const data = [
    {
        id: "123",
        title: "Orders",
        screen: "OrderScreen",
    },
    {
        id: "456",
        title: "Extra",
        //image: ...
        screen: "ExtraScreen",
    },
];

const NavOptions = () => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem = {({item}) => (
                <TouchableOpacity
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

// const styles = StyleSheet.create();