import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View, ActivityIndicator, SafeAreaView , Image, Button} from 'react-native';
import { TextInput, } from 'react-native-gesture-handler';
import tw from "tailwind-react-native-classnames";
import { Color } from '../GlobalStyles';

const OrderScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [customerID, setCustomerID] = useState(6890);  
    const [text, setText] = useState(6890);

    const getOrderStatus = (statusEnum) => {
        const orderStatusMap = {
            1: 'Placed',
            2: 'Dispatched',
            3: 'Delivering',
            4: 'Delivered',
            5: 'Completed',
            6: 'Cancelled'
        };
        return orderStatusMap[statusEnum];
    };

    const formatDate = (dateInput) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateInput);
      
        const day = daysOfWeek[date.getDay()];
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        return `${day}, ${hours}:${minutes}`;
      }

    const fetchOrdersForCustomer = async () => {
        setLoading(true);
        try {
            let response = await fetch('https://www.guitarguitar.co.uk/hackathon/orders/');
            let jsonData = await response.json();
            let customerOrders = jsonData.filter(order => order.CustomerId.toString() === customerID.toString());
            setData(customerOrders);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    const filterOrders = async () => {
        setCustomerID(text);
        fetchOrdersForCustomer();
    }

    useEffect(() => {
        fetchOrdersForCustomer();
    }, []);

    return (
        <SafeAreaView style={tw`bg-white h-full`}> 
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View>
                    <View style={[styles.searchContainer,{marginTop:50, height: 100}]}>
                        <Text style={[styles.searchItem, {alignItems:'center', justifyContent:'center'}]}> ORDERS </Text>
                        <TextInput style={[styles.searchItem, {backgroundColor:'white'}]} placeholder="Enter customer ID" onChangeText={newText=>setText(newText.toString())} defaultValue={text} />
                        <Button style={styles.searchItem} title="Search" onPress={filterOrders}/>
                    </View>
                        <FlatList
                        data={data}
                        keyExtractor={(item) => item.Id.toString()}
                        renderItem={({ item }) => (
                            <View>
                                {JSON.stringify(item) === '{}' ? (
                                    <Text> Loading... </Text>
                                ) : (
                                <View>
                                    <View style={styles.orderItem}>
                                        <View style={styles.productInfo}>
                                            { item.Products.map((product) => (
                                                <View style={styles.productInfo}>
                                                    {product.PictureMain &&
                                                    <Image source={{url: product.PictureMain}} />
                                                                    }
                                                    <Text> &#x2022; {product.ItemName}</Text>
                                                    <Text style={{paddingLeft:20}}>Link</Text>
                                                </View>
                                              ))}
                                        </View>
                                        <View style={styles.dateInfo}>
                                            <Text style={{flexDirection: 'column'}}>{'\n'}Purchased on {formatDate(item.DateCreated)}{'\n'}</Text>
                                        </View>
                                        <View style={styles.mainInfo}>
                                            <Text style={styles.important}>Order {getOrderStatus(item.OrderStatus)}</Text>
                                            <Text style={{paddingLeft: 20}}>£{item.OrderTotal}</Text>
                                        </View>
                                    </View>
                                </View>
                                )}
                            </View>
                    )}
                    />
                </View>
            )}
        </View>
        </SafeAreaView> 
    );
};


// Change Later
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Color.colorLightcyan,
    },
    orderItem: {
        flex: 1, 
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
      backgroundColor: '#5fcfe3',
    },
    searchContainer: {
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#5fcfe3',
        padding: 10,
        marginBottom: 30,
        
    },
    searchItem: {
        padding: 1,

    },
    important: {
        fontWeight: 'bold',
    },
    mainInfo: {
        color: 'grey',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 10,
        marginLeft: 0,
    },

    productInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 10,
        marginLeft: 0,
    }



});

export default OrderScreen;
