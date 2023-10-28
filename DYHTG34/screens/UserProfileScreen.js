import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { getCustomer } from '../components/CustomerID';

const UserProfileScreen = () => {

    let userPr = getCustomer();

    if(!userPr) {
        return (
        <SafeAreaView style={tw`bg-blue-500 h-full`}> 
        <View style={styles.container}>
        <Text>You do not have access to view this page.</Text>
        </View>
        </SafeAreaView>
        )
    }

  const [user, setUser] = useState({
    id: userPr.id,
    name: userPr.first_name,
    email: userPr.email,
    profilePicture: userPr.avatar, // If you have an image to use
    loyaltyLevel: userPr.LoyaltyLevel,
    bio: 'A short bio about John Doe. John loves programming, photography, and hiking. He is a software engineer and has worked on numerous projects...'
  });

  const MoreLessComponent = ({ truncatedText, fullText }) => {
    const [more, setMore] = useState(false);
    return (
      <Text>
        {!more ? `${truncatedText}...` : fullText}
        <TouchableOpacity onPress={() => setMore(!more)}>
          <Text>{more ? 'less' : 'more'}</Text>
        </TouchableOpacity>
      </Text>
    );
  };

  return (
    <SafeAreaView style={tw`bg-blue-500 h-full`}> 
      <View style={styles.container}>
      <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.dateJoined}>Loyalty Level: {user.loyaltyLevel}</Text>
        <MoreLessComponent truncatedText={user.bio.substring(0, 100)} fullText={user.bio} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // half of the width and height
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  dateJoined: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 20,
  }
});

export default UserProfileScreen;
