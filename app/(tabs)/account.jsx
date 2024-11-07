import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Lorreg from '../(account)/lorreg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Account = () => {
  const nav = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('isLoggedIn'); // Retrieve value from AsyncStorage
      if (value !== null) {
        setIsLoggedIn(JSON.parse(value)); // Parse and set the login status
      } else {
        setIsLoggedIn(false); // Default to false if value is null
      }
    } catch (error) {
      console.error('Error retrieving login status:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true); // Set loading to true before checking
      checkLoginStatus(); // Call the function to check login status
    }, [])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn'); // Remove login status from AsyncStorage
      setIsLoggedIn(false); // Update state to reflect logged out status
     nav.navigate('index');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
  }

  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
        <Lorreg />
      ) : (
        <>
          <Text>this is main account page</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
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