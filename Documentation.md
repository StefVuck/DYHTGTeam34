# Documentation Guide:

### Setup:
There are two main types of set up:

##### First Time:
First you need to install [Node.JS](https://nodejs.org/en) inlcuding npm.
Upon installing quickly check your install is fine with
```bash
node -v
npm -v
```
And then proceed as such:
- Locate the directory
- run `npm install -g expo-cli`
- Assuming this works:


##### After Pulling Latest Code:

- `npm install` should install all relevant packages neatly
- `expo start` (If you're on eduroam or some non private network run `expo start --tunnel`)
You should now be presented with a QR code, which you can scan with a QR reader once you've installed the "Expo Go" app, if so:
    - Scan the QR code
    - press r in your terminal to refresh the app
    - it should work!



### Stefan's Code

Okay so I added a lot of stuff, but I'll explain the majority of the more "interesting" stuff:

##### HomeScreen/NavOptions/App:

###### Nav Buttons:
The actual logic behind the pressing of the button to send you to another page is as follows:
```js
const navigation = useNavigation();


<TouchableOpacity onPress={() => navigation.navigate(item.screen)} ... > ... </TouchableOpacity>
```
Where we assign the actual name of the Screen file as a value in the json at the start (item.screen).

###### Swipe Logic:
So something I think is an amazing quality of life feature is being able to swipe back (or exit back), to the page you just came from.
This is achieved using a stack logic with new pages being loaded being added to the stack and then popped when no longer needed, sending us to the page just directly before.

This is acheived as such:

```javascript
<Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false,}} />
        <Stack.Screen name="OrderScreen" component={OrderScreen} options={{headerShown: false,}} />
</Stack.Navigator>
```

Where we obviously have to directly assign each new page to this stack navigator in App.js

##### OrderScreen:

###### FormatDate:
A few notes, our date is passed to us in form "2021-10-12T07:25:00", which isnt very pretty. So I have a helper that parses this into a nice string output:

We hard-code a list of the days, with Sunday being index 0 (This is to do with the built in `date.getDay()`) don't @ me.

The next funky line is a nice trick I saw on geekforgeeks or some similar website
hour returns 0-23, which is debatably fine, however it wouldnt be fine if we got 12:7pm, so we need to add a 0 on for values that are less than 10. But another way to do this is to add a 0 at the start regardless, and then to take the last 2 digits.

###### FetchOrderForCustomer:
Essentially we set the loading value to be true while we do this, and then we run a try catch on first, reading the data from the source, and then parsing said data into JSON.
Finally since this JSON would otherwise be unwieldy large, we only save the JSON where the customerID ordering is set to a (currently) hard coded user ID. 

###### return:
we run a fun condition ? (true):(false) statement to see whether we're to output data yet.

the only other interesting line here is 
```js
{item.Products.map( (product, index) => ( <Text key={index}>   &#x2022; {product.ItemName}</Text> ) ) }
```
where we map the array of products to give us individual products and indexes, which we subsequently use to format output of the products in our order.
