import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from "./store";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from "./screens/HomeScreen";
import OrderScreen from "./screens/OrderScreen"
import LoginScreen from "./screens/LoginScreen"
import ProductScreen from './screens/ProductScreen';
import StartScreen from './screens/StartScreen';
import IndividualProductScreen from './screens/IndividualProductScreen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfileScreen from './screens/UserProfileScreen';
import SearchScreen from './screens/SearchScreen';
import FilteredProductScreen from './screens/FilteredProductScreen';


export default function App() {
  const Stack = createStackNavigator();

  return ( 
    <Provider store={store}>
      <NavigationContainer>
      <SafeAreaProvider> 
      
      <Stack.Navigator>
        <Stack.Screen name="StartScreen" component={StartScreen} options={{headerShown: false,}} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false,}} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false, } } />
        <Stack.Screen name="OrderScreen" component={OrderScreen} options={{headerShown: false,}} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{headerShown: false,}} />
        <Stack.Screen name='FilteredProductScreen' component={FilteredProductScreen} options={{headerShown: false,}} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} options={{headerShown: false,}} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{headerShown: false,}} />
        <Stack.Screen name="IndividualProductScreen" component={IndividualProductScreen} options={{ headerShown: false, }} />
      </Stack.Navigator>


      </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
