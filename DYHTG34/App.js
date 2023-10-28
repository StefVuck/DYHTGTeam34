import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from "./store";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from "./screens/HomeScreen";
import OrderScreen from "./screens/OrderScreen"
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function App() {
  const Stack = createStackNavigator();

  return ( 
    <Provider store={store}>
      <NavigationContainer>
      <SafeAreaProvider> {/* This is a wrapper for react-native-safe-area */}
      
      {/* Okay so fundamentally we have a stack that stores our
       pages visited and upon "returning/exiting" a page pops that
       page off the stack and returns to the last page visited before */}
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false,}} />
        <Stack.Screen name="OrderScreen" component={OrderScreen} options={{headerShown: false,}} />
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
