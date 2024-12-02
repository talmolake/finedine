import { StatusBar } from 'expo-status-bar';
import { Text, View } from "react-native";
import React, {useState} from "react";
import { TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
       <Image 
        source={require('./assets/finedine.jpeg')} 
        style={styles.logo}
        resizeMode="contain"
      />
<Text style={styles.title}>Welcome to Fine Dine!</Text>
      <Text style={styles.subtitle}>Your Best Dining App.</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Register</Text>
        </TouchableOpacity>
      </View>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E3D3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 250,  
    height: 250, 
    marginBottom: 25, 
    borderRadius: 75,
  },

title: {
  fontSize: 32,
  fontWeight: 'bold',
  color: '#6D4C41',
  marginBottom: 16,
},
subtitle: {
  fontSize: 18,
  marginBottom: 32,
  color: '#8D6E63',
},
button: {
  backgroundColor: '#6D4C41', 
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 24, 
  width: 200,
  alignItems: 'center',
  marginBottom: 16,
  elevation: 3, 
},
buttonText: {
  color: '#FFF', 
  fontSize: 16,
  fontWeight: '600',
},
secondaryButton: {
  backgroundColor: '#D7CCC8', 
},
secondaryButtonText: {
  color: '#6D4C41', 
},
});

