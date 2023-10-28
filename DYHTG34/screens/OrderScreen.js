import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View, ActivityIndicator } from 'react-native';

const OrderScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const DUMMY_CUSTOMER_ID = 6890;  

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
      
        return '${day}, ${hours}:${minutes}';
      }

    const fetchOrdersForCustomer = async () => {
        setLoading(true);
        try {
            let response = await fetch('https://www.guitarguitar.co.uk/hackathon/orders/');
            let jsonData = await response.json();

        
            let customerOrders = jsonData.filter(order => order.CustomerId === DUMMY_CUSTOMER_ID);
            setData(customerOrders);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrdersForCustomer();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.Id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.orderItem}>
                            <Text>Order ID: {item.Id}</Text>
                            <Text>Order Date: {formatDate(item.DateCreated)}</Text>
                            <Text>Order Total: £{item.OrderTotal}</Text>
                            <Text>Products:</Text>
                            {item.Products.map( (product, index) => ( <Text key={index}>   &#x2022; {product.ItemName}</Text> ) ) }
                            <Text>Shipping Address: </Text>
                            <Text>   &#x2022; {item.ShippingAddress.street_address},</Text>
                            <Text>   &#x2022; {item.ShippingAddress.street_name},</Text>
                            <Text>   &#x2022; {item.ShippingAddress.city},</Text>
                            <Text>   &#x2022; {item.ShippingAddress.zip_code},</Text>
                            <Text>   &#x2022; {item.ShippingAddress.country}</Text>
                            <Text></Text>
                            <Text>Status: {getOrderStatus(item.OrderStatus)}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};


// Change Later
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5'
    },
    orderItem: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    }
});

export default OrderScreen;
