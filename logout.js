// LogoutScreen.js
import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogout = async () => {

        try {
             //Remove user and restaurant details from AsyncStorage
           await AsyncStorage.removeItem('userDetails'); 
            await AsyncStorage.removeItem('favorites'); 

        navigation.navigate('login'); 
        setModalVisible(false); 
    } catch (error) {
        console.error('Error during logout:', error);
    }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.modalTitle}>Click her to Logout!</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} testID="logoutButton">
                <Text style={styles.logoutButton}>Logout</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Logging out will delete Restaurant Details and User details, Are you sure you want to logout?</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Cancel" onPress={() => setModalVisible(false)} testID="cancelButton" />
                            <Button title="Logout" onPress={handleLogout} testID="confirmLogoutButton"/>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// Styles for the modal
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    logoutButton: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#C88B60',
        textAlign: 'center',
      },
});

export default LogoutScreen;
