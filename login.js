import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!contact.trim() || !password) {
      Alert.alert('Validation Failed', 'Please enter both contact and password.');
      return;
    }
  
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      if (userDetails !== null) {
        const { contact: storedContact, password: storedPassword } = JSON.parse(userDetails);
        if (storedContact === contact.trim() && storedPassword === password) {
          Alert.alert('Login Successful', 'Welcome back!');
          navigation.navigate('bottomTab');
        } else {
          Alert.alert('Login Failed', 'Invalid contact or password.');
        }
      } else {
        Alert.alert('Login Failed', 'No account found. Please register first.');
      }
    } catch (error) {
      Alert.alert('Login Failed', 'Something went wrong, please try again.');
      console.error('AsyncStorage error: ', error);
    }
  };
  
  const goToRegistration = () => {
    navigation.navigate('Register'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Contact"
        value={contact}
        onChangeText={setContact}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
          <View style={styles.registerContainer}>
        <Text style={styles.text}>Don't have an account? </Text>
        <TouchableOpacity onPress={goToRegistration}>
          <Text style={styles.registerButton}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F5E3D3',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#BFAA9C',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6D4C41',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    height: 50,
    backgroundColor: '#C8A27C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 200,
    alignSelf: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: '#6A4F4B',
  },
  registerButton: {
    fontSize: 16,
    color: '#C88B60',
    marginLeft: 5,
    fontWeight: 'bold',  },
});

export default LoginScreen;
