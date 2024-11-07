import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import ToastManager, { Toast } from 'toastify-react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { FontAwesome as FA } from '@expo/vector-icons';


import RDim from '@/hooks/useDimensions';


import bikeLogo from '../../assets/images/bikeLogo.png';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const clearInputs = () => {
        setUsername('');
        setPassword('');
    }



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
            <View>
                <Image source={bikeLogo} style={styles.image} />
            </View>
            <View style={styles.form}>
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
                            style={[styles.input, {paddingRight: 40}]}
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
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: RDim.height * 0.02 }}>
                    <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.aha}>
                <Link href={{ pathname: '/login' }}>
                    <Text style={{ fontFamily: 'mplusb', fontSize: RDim.width * 0.04 }}>forgot password</Text>
                </Link>
            </View>
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