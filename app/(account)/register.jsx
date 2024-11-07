import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import ToastManager, { Toast } from 'toastify-react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { FontAwesome as FA } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import RDim from '@/hooks/useDimensions';


import bikeLogo from '../../assets/images/bikeLogo.png';

export default function Register() {

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${month}/${day}/${year}`; // Format as MM/DD/YYYY
  };


  const [date, setDate] = useState(new Date());

  const [fName, setFName] = useState('');
  const [mName, setMName] = useState('');
  const [lName, setLName] = useState('');

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bdate, setBdate] = useState(formatDate(date));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const clearInputs = () => {
    setUsername('');
    setPassword('');
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    setDate(selectedDate); // Update the date state
    setBdate(formatDate(selectedDate)); // Format the date and update bdate
  };

  return (
    <View style={styles.container}>
      <ToastManager
        position="top"
        height={45}
        width={RDim.width * 0.8}
        textStyle={{ fontSize: 12 }}
        duration={2000}
        showCloseIcon={false}
        showProgressBar={false}
      />
      <View style={{ alignItems: 'center', marginTop: 35 }}>
        <Text style={{ fontFamily: 'mplusb', fontSize: RDim.width * 0.07 }}>Create Your Account</Text>
      </View>
      <ScrollView>
        <View style={styles.form}>
          {/* User Information */}
          <View style={{ alignItems: 'flex-start', marginLeft: 20, marginBottom: 10 }}>
            <Text style={{ fontFamily: 'mplus', fontSize: RDim.width * 0.05, color: 'gray' }}>User Information</Text>
          </View>
          <View style={styles.inputCon}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.input}
              value={fName}
              onChangeText={setFName}
              keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
              returnKeyType="done" // Change the return key type
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputCon}>
            <Text style={styles.inputLabel}>Middle Name</Text>
            <TextInput
              style={styles.input}
              value={mName}
              onChangeText={setMName}
              keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
              returnKeyType="done" // Change the return key type
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputCon}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lName}
              onChangeText={setLName}
              keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
              returnKeyType="done" // Change the return key type
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputCon}>
            <Text style={styles.inputLabel}>Age</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge} // Update the state when the text changes
              // Other optional props
              keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
              returnKeyType="done" // Change the return key type
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputCon}>
            <Text style={styles.inputLabel}>Date of birth</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={styles.input}
                value={bdate}
                onChangeText={setBdate} // Update the state when the text changes
                // Other optional props
                keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
                returnKeyType="done" // Change the return key type
                autoCapitalize="none"
              />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  date={date}
                />
              <TouchableOpacity onPress={() => showDatePicker()} style={{ position: 'absolute', right: 0, top: 0, padding: 10 }}>
                <FA name='calendar-o' size={RDim.scale * 7} color={'#355E3B'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputCon}>
            <Text style={styles.inputLabel}>Gender</Text>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)} // Update the state when the value changes
              style={styles.input} // Use the same styles as the TextInput
            >
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>
          <View style={styles.inputCon}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
              returnKeyType="done" // Change the return key type
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputCon}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[styles.input, { paddingRight: 40 }]}
                value={password}
                onChangeText={setPassword} // Update the state when the text changes
                secureTextEntry={!showPassword} // Toggle secure text entry
                keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
                returnKeyType="done" // Change the return key type
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 0, top: 0, padding: 10 }}>
                <FA name={showPassword ? 'eye' : 'eye-slash'} size={RDim.scale * 8} color={'#355E3B'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputCon}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[styles.input, { paddingRight: 40 }]}
                value={cpassword}
                onChangeText={setCPassword} // Update the state when the text changes
                secureTextEntry={!showCPassword} // Toggle secure text entry
                keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
                returnKeyType="done" // Change the return key type
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowCPassword(!showCPassword)} style={{ position: 'absolute', right: 0, top: 0, padding: 10 }}>
                <FA name={showCPassword ? 'eye' : 'eye-slash'} size={RDim.scale * 8} color={'#355E3B'} />
              </TouchableOpacity>
            </View>
          </View>
          {/* Address */}
          <View style={{ alignItems: 'flex-start', marginLeft: 20, marginBottom: 10, marginTop: 20 }}>
            <Text style={{ fontFamily: 'mplus', fontSize: RDim.width * 0.05, color: 'gray' }}>Address</Text>
          </View>
          <View style={styles.inputCon}>
            <Text style={styles.inputLabel}>City</Text>
            <TextInput
              style={styles.input}
              value={fName}
              onChangeText={setFName}
              keyboardType="default" // Options: 'default', 'numeric', 'email-address', etc.
              returnKeyType="done" // Change the return key type
              autoCapitalize="none"
            />
          </View>


          {/* Signin Button */}
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: RDim.height * 0.02 }}>
            <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6D6CA'
  },
  image: {
    width: RDim.width * 0.5,
    height: RDim.height * 0.25,
    alignSelf: 'center',
    marginTop: 65
  },
  googleImage: {
    width: RDim.width * 0.065, // Set the desired width
    height: RDim.height * 0.065, // Set the desired height
    objectFit: 'contain',
  },
  btnCon: {
    alignItems: 'center',
    gap: 20,
    marginTop: 100
  },
  btns: {
    display: 'flex',
    backgroundColor: '#355E3B',
    width: RDim.width * 0.9,
    height: RDim.height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    gap: 10
  },
  btnText: {
    color: 'white',
    fontFamily: 'mplus',
    fontSize: RDim.height * 0.024,
  },
  form: {
    marginTop: RDim.height * 0.05
  },
  aha: {
    position: 'relative',
    alignSelf: 'center',
    marginTop: RDim.height * 0.25
  },
  inputCon: {
    width: RDim.width * 0.80,
    alignSelf: 'center'
  },
  inputLabel: {
    fontSize: RDim.width * 0.05,
    fontFamily: 'mplus',
  },
  input: {
    height: RDim.height * 0.05,
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: '#FFF',
    fontFamily: 'mplus',
    fontSize: RDim.scale * 8
  },
  button: {
    backgroundColor: '#355E3B',
    width: RDim.width * 0.5,
    height: RDim.height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RDim.scale * 50
  },
  buttonText: {
    fontFamily: 'mplus',
    fontSize: RDim.width * 0.055,
    color: 'white',
  }
})