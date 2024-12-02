import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuModal from '../menu';

const RestaurantItem = ({ restaurant, onToggleFavorite, isFavorite, navigation }) => {
  
  const [modalVisible, setModalVisible] = useState(false);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

    const handlePress = (restaurantId) => {
        setSelectedRestaurantId(restaurantId); 
        setModalVisible(true);
    };
    return (
        <View style={styles.container}>
            {restaurant.image_url && (
                <Image source={{ uri: restaurant.image_url }} style={styles.image} />
            )}
            <View style={styles.details}>
                <View style={styles.align}>
                    <Text style={styles.name}>{restaurant.name}</Text>
                    <TouchableOpacity
                    testID="favorite-button"
                        style={styles.favoriteButton}
                        onPress={() => onToggleFavorite(restaurant)}
                    >
                        <Icon
                            name="star"
                            size={24}
                            color={isFavorite ? '#FFD700' : '#ccc'}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.address}>
                    {restaurant.location.address1}, {restaurant.location.city}
                </Text>
                <View style={styles.ratingContainer}>
                    <View style={styles.rnr}>
                        <Text style={styles.rating}>Rating: {restaurant.rating}</Text>
                        <Text style={styles.reviews}>Reviews: {restaurant.review_count}</Text>
                    </View>
                    <TouchableOpacity style={styles.menuButton} onPress={handlePress}>
                <Text style={styles.menuButtonText}>View Menu</Text>
            </TouchableOpacity>
            <MenuModal visible={modalVisible} onClose={() => setModalVisible(false)} 
                              restaurantId={selectedRestaurantId} 
                              />
                </View>
            </View>
        </View>
    );
};

// Add your styles here...
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'red',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
        width: '100%',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 10,
    },
    align: {
        flexDirection: 'row',
    },
    details: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    favoriteButton: {
        marginLeft: 'auto',
        alignSelf: 'flex-start',
    },
    rnr: {
        flexDirection: 'column',
        marginRight: 60,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    menuButton: {
        backgroundColor: '#6D4C41',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 25,
        marginLeft: 10,
        alignItems: 'center',
    },
    menuButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    address: {
        fontSize: 14,
        color: '#666',
    },
    rating: {
        fontSize: 14,
        marginTop: 5,
    },
    reviews: {
        fontSize: 14,
        marginTop: 5,
    },
});

export default RestaurantItem;
