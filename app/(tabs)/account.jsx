import { StyleSheet, Text, View, ActivityIndicator, Button, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Lorreg from '../(account)/lorreg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import RDim from '../../hooks/useDimensions'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const HorizontalLine = ({ color = 'gray', thickness = 1, mv = 5, style }) => {
  return <View style={[styles.line, { backgroundColor: color, height: thickness, marginVertical: mv }, style]} />;
};

const getData = async () => {
  try {
    const id = await AsyncStorage.getItem('id');
    const name = await AsyncStorage.getItem('name');
    const address = await AsyncStorage.getItem('address');
    const phone = await AsyncStorage.getItem('phone');
    const bday = await AsyncStorage.getItem('bday');
    const email = await AsyncStorage.getItem('email');

    if (id !== null && name !== null && address !== null && phone !== null && bday !== null && email !== null) {

      return { id, name, address, phone, bday, email };

    } else {
      return 'undefined';
    }
  } catch (e) {
    console.error('Failed to fetch data', e);
  }
};


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

  const [userInfo, setUserInfo] = useState({});
  const getUserInfo = async () => {
    setUserInfo(await getData())
  }
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true); // Set loading to true before checking
      checkLoginStatus(); // Call the function to check login status
      getUserInfo();

      // console.log(userInfo);
    }, [])
  );

  const handleLogout = async () => {
    setLoading(true);
    await delay(2000);
    try {
      await AsyncStorage.removeItem('isLoggedIn'); // Remove login status from AsyncStorage
      setIsLoggedIn(false); // Update state to reflect logged out status
      nav.navigate('index');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
        <Lorreg />
      ) : (
        <>
          <LinearGradient
            colors={["#355E3B", "#D6D6CA"]} // Define your gradient colors here
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.35 }}
            style={{ flex: 1, position: "relative" }}
          >
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10, marginVertical: 10, marginTop: 30, backgroundColor: "#D6D6CA", width: RDim.width * .9, alignSelf: 'center', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 5 }}>
              <MaterialCommunityIcons name="account-circle" size={30} color="#355E3B" />
              <Text style={{ fontSize: RDim.width * 0.06, color: 'black', fontFamily: 'mplus' }} numberOfLines={1}>Hi, {userInfo.name}</Text>
            </View>
            <View style={styles.asCon}>
              <View>
                <Text style={styles.title}>Account Security</Text>
              </View>
              <View>
                <View style={styles.eTitleCon}>
                  <MaterialCommunityIcons name="email" size={24} color="#355E3B" />
                  <Text style={styles.default}>Linked Email</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: RDim.width * 0.04 }}>{userInfo.email}</Text>
                </View>
              </View>
              <HorizontalLine />
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={styles.eTitleCon}>
                  <MaterialCommunityIcons name="lock" size={24} color="#355E3B" />
                  <Text style={styles.default}>Reset Password</Text>
                </View>
                <View style={{ paddingRight: 10 }}>
                  <TouchableOpacity>
                    <View style={{ backgroundColor: '#099654', width: RDim.width * 0.08, alignItems: 'center' }}>
                      <Text style={{ color: 'white' }}>SET</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.asCon2}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={styles.asCon2T}>
                    <MaterialCommunityIcons name="account-outline" size={24} color="#355E3B" />
                    <Text style={styles.default}>Name</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: RDim.width * 0.04 }}>{userInfo.name}</Text>
                  </View>
                </View>
                <HorizontalLine />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={styles.asCon2T}>
                    <MaterialIcons name="location-on" size={24} color="#355E3B" />
                    <Text style={styles.default}>Address</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: RDim.width * 0.04 }}>{userInfo.address}</Text>
                  </View>
                </View>
                <HorizontalLine />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={styles.asCon2T}>
                    <MaterialIcons name="calendar-today" size={24} color="#355E3B" />
                    <Text style={styles.default}>Birthdate</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: RDim.width * 0.04 }}>{userInfo.bday}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              {loading ? (
                <ActivityIndicator size="large" color="#355E3B" />
              ) : (
                <TouchableOpacity onPress={handleLogout}>
                  <View style={styles.logout}>
                    <Text style={{ color: 'white', fontFamily: 'mplusb' }}>Sign Out</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <View style={{ alignItems: 'center', marginTop: 20, paddingHorizontal: 10 }}>
              <TouchableOpacity  >
                <View style={styles.deleteAcc}>
                  <Text style={{ color: '#AB0505', fontFamily: 'mplusb', fontSize: RDim.width * .05, textAlign: 'center' }}>Delete Account</Text>
                </View>
              </TouchableOpacity>
              <View>
                <Text style={[{ textAlign: 'center' }]}>Once deleted, all account information will be removed. You will not be able to recover this information</Text>
              </View>
            </View>
            <HorizontalLine style={{ marginTop: RDim.height * .25 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25 }}>
              <View>
                <TouchableOpacity>
                  <Text style={{ color: 'black', fontSize: RDim.width * .04 }}>Terms & Condition</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{ color: 'black', fontSize: RDim.width * .04 }}>&#169; 2024 (RBMS)</Text>
              </View>
            </View>
          </LinearGradient>
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
  },
  asCon: {
    width: RDim.width * 0.9,
    height: RDim.height * 0.17,
    backgroundColor: '#D6D6CA',
    elevation: 20,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10
  },
  asCon2: {
    width: RDim.width * 0.9,
    height: RDim.height * 0.14,
    backgroundColor: '#D6D6CA',
    elevation: 20,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10
  },
  title: {
    fontSize: RDim.width * 0.055,
    fontFamily: 'mplusb'
  },
  default: {
    fontSize: RDim.width * 0.04,
    fontFamily: 'mplus',
  },
  eTitleCon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  asCon2T: {
    fontSize: RDim.width * 0.07,
    fontFamily: 'mplus',
    flexDirection: 'row',
    alignItems: 'center'
  },
  logout: {
    fontSize: RDim.width * 0.04,
    fontFamily: 'mplus',
    backgroundColor: '#355E3B',
    width: RDim.width * 0.4,
    height: RDim.height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  }
})