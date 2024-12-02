import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegistration = async () => {
    if (!name || !surname || !contact.trim() || !location || !password || !confirmPassword) {
      Alert.alert('Validation Failed', 'All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Registration Failed', 'Passwords do not match');
      return;
    }
    const userDetails = {
      name,
      surname,
      contact: contact.trim(), 
      location,
      password,
    };
  
    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
      Alert.alert('Registration Successful', 'Your details have been saved locally!');
      navigation.navigate('bottomTab');
    } catch (error) {
      Alert.alert('Registration Failed', 'Something went wrong, please try again.');
      console.error('AsyncStorage error: ', error);
    }
  };
  
  const goToLogin = () => {
    console.log('Navigating to login...');
    navigation.navigate('login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        testID="input-name"
      />
      <TextInput
        style={styles.input}
        placeholder="Surname"
        value={surname}
        onChangeText={setSurname}
        testID="input-surname"
      />
      <TextInput
        style={styles.input}
        placeholder="Contact"
        value={contact}
        onChangeText={setContact}
        testID="input-contact"
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        testID="input-location"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        testID="input-password"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        testID="input-confirm-password"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
        <View style={styles.loginContainer}>
        <Text style={styles.text}>Already have an account? </Text>
        <TouchableOpacity onPress={goToLogin} testID="link-login">
          <Text style={styles.loginButton}>Login</Text>
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
    backgroundColor: '#F5E8D8',
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: '#6A4F4B',
  },
  loginButton: {
    fontSize: 16,
    color: '#C88B60',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default RegistrationScreen;
