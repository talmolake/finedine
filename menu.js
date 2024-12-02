import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    Image,
    StyleSheet,
} from 'react-native';
import axios from 'axios';

const MenuModal = ({ visible, onClose, restaurantId }) => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            if (!restaurantId) return;

            try {
                const response = await axios.get(`https://api.yelp.com/v3/businesses/${restaurantId}`, {
                    headers: {
                        Authorization: `Bearer 1QCXYUjjHBwu-m1sH0F1kmGHOHhGLpFaB9YHnQP_ov7aHGqSD0NU4U3k97FNXxC2zB2ARj_FfJwJ6yJjt3cjfPwcmSCsypCFGND8Cm1DZyGtm_NHVLjFa3lx_8MoZ3Yx`, // Ensure the API key is valid
                    },
                });
                // Here, we need to check if the menu is available
                if (response.data && response.data.menu) {
                    setMenuItems(response.data.menu);
                } else {
                    setMenuItems([]);  
                    console.log('No menu data available for this restaurant.');
                }
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        if (visible) {
            fetchMenuItems();
        }
    }, [visible, restaurantId]);

    const renderItem = ({ item }) => (
        <View style={styles.menuItem}>
            <Image 
                source={{ uri: item.image || 'https://via.placeholder.com/80' }}  
                style={styles.menuImage} 
            />
            <View style={styles.menuDetails}>
                <Text style={styles.menuText}>{item.name}</Text>
                <Text style={styles.menuPrice}>${item.price ? item.price.toFixed(2) : 'N/A'}</Text>  
            </View>
        </View>
    );

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.modalContainer}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                <FlatList
                    data={menuItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<Text style={styles.emptyMessage}>No menu items available.</Text>}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#FF5722',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    menuImage: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 5,
    },
    menuDetails: {
        flex: 1,
    },
    menuText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    menuPrice: {
        fontSize: 14,
        color: '#888',
    },
    emptyMessage: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
    },
});

export default MenuModal;
