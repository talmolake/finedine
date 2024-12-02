import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import RestaurantItem from './Item/resturantitem'; 

const FavoritesScreen = () => {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavoriteRestaurants(parsedFavorites);

      // Show prompt if there are no favorites
      if (parsedFavorites.length === 0) {
        showAddFavoritesPrompt();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load favorites.');
    }
  };

  const showAddFavoritesPrompt = () => {
    Alert.alert(
      'No Favorite Restaurants',
      'You have no favorite restaurants. Would you like to browse and add some?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => navigation.navigate('Home') }, 
      ]
    );
  };

  const confirmRemoveFavorite = (id) => {
    Alert.alert(
      'Remove Favorite',
      'Are you sure you want to remove this restaurant from favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: () => removeFavorite(id) },
      ]
    );
  };

  const removeFavorite = async (id) => {
    try {
      const updatedFavorites = favoriteRestaurants.filter((item) => item.id !== id);
      setFavoriteRestaurants(updatedFavorites); 
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      Alert.alert('Removed', 'Restaurant removed from favorites.');
    } catch (error) {
      Alert.alert('Error', 'Failed to remove from favorites.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Restaurants</Text>
      {favoriteRestaurants.length > 0 ? (
        <FlatList
          data={favoriteRestaurants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RestaurantItem
              restaurant={item}
              onToggleFavorite={() => confirmRemoveFavorite(item.id)}
              isFavorite={true}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="star-outline" size={60} color="#8B0000" />
          <Text style={styles.emptyText}>No favorite restaurants found.</Text>
          <TouchableOpacity onPress={showAddFavoritesPrompt}>
            <Text style={styles.promptText}>Tap here to add favorites</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#F5E8D8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C88B60',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    width: '100%',
    padding: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#95A5A6',
    marginVertical: 20,
  },
  promptText: {
    fontSize: 16,
    color: '#C8A27C',
    marginTop: 10,
  },
});

export default FavoritesScreen;
