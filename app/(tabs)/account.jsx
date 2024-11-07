import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import Lorreg from '../(account)/lorreg';
import Login from '../(account)/login';

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
        <Lorreg />
      ) : (
        <Text>this is main account page</Text>
      )}
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6D6CA'
  }
})







import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to save data
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_key', value);
  } catch (e) {
    // saving error
    console.error(e);
  }
};

// Function to retrieve data
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_key');
    if(value !== null) {
      console.log(value); // This will log the stored value
    }
  } catch (e) {
    // error reading value
    console.error(e);
  }
};