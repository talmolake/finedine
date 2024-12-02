import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import RestaurantItem from './Item/resturantitem'; // Import the RestaurantItem component
import FavoritesScreen from './favourites'; // Import the FavoritesScreen component
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure this is included
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('Singapore');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]); 
  const [noRestaurantsFound, setNoRestaurantsFound] = useState(false); 
  const [locationInput, setLocationInput] = useState(''); 

    const fetchRestaurants = async (searchLocation) => {
      setLoading(true);
      setNoRestaurantsFound(false); 
      try {
        console.log('Fetching restaurants for location:', searchLocation);
        const response = await axios.get(`https://api.yelp.com/v3/businesses/search?location=${searchLocation}`, {
           headers: {
            Authorization: `Bearer 1QCXYUjjHBwu-m1sH0F1kmGHOHhGLpFaB9YHnQP_ov7aHGqSD0NU4U3k97FNXxC2zB2ARj_FfJwJ6yJjt3cjfPwcmSCsypCFGND8Cm1DZyGtm_NHVLjFa3lx_8MoZ3Yx`, // Ensure the API key is valid
      },
    });
  
    if (response.data.businesses.length === 0) {
      setNoRestaurantsFound(true); 
      Alert.alert('No Restaurants Found', 'No restaurants found in this area. Please try searching for a different location.');
    } else {
      // Sort restaurants by rating (highest to lowest)
      const sortedRestaurants = response.data.businesses.sort((a, b) => {
        if (b.rating === a.rating) {
          return b.review_count - a.review_count; 
        }
        return b.rating - a.rating;
      });
      setRestaurants(sortedRestaurants);
    }
  } catch (err) {
    // Handle error fetching restaurants
    Alert.alert('Error', 'Error fetching restaurants. Please try again.');
    setNoRestaurantsFound(true); // Indicate no restaurants found due to error
  } finally {
    setLoading(false);
  }
};
  
  // Fetch default restaurants when component mounts
  useEffect(() => {
    fetchRestaurants(location); 
  }, []); 

  // Function to load favorites from AsyncStorage
  const loadFavorites = async () => {
    const storedFavorites = await AsyncStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
      fetchRestaurants(location); 
    }, [location])
  );
  // Handle search button press
  const handleSearch = () => {
    if (locationInput.trim()) {
      setLocation(locationInput.trim()); 
      fetchRestaurants(locationInput.trim()); // Fetch restaurants based on input location
    } else {
      Alert.alert('Error', 'Please enter a location to search.');
    }
  };

  const clearSearch = () => {
    setLocation('Singapore');
    setSearchQuery('');
    setLocationInput(''); 
    fetchRestaurants('Singapore');
  };

  // Filter restaurants based on the search query
  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onToggleFavorite = async (restaurant) => {
    const isFavorite = favorites.some(fav => fav.id === restaurant.id);

    if (isFavorite) {
      Alert.alert(
        'Remove Favorite',
        'Are you sure you want to remove this restaurant from favorites?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            onPress: async () => {
              const updatedFavorites = favorites.filter(fav => fav.id !== restaurant.id);
              setFavorites(updatedFavorites);
              await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
              Alert.alert('Removed!', 'The restaurant has been removed from your favorites.');
            },
          },
        ]
      );
    } else {
      Alert.alert(
        'Add to Favorites',
        'Do you want to add this restaurant to your favorites?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Add',
            onPress: async () => {
              const updatedFavorites = [...favorites, restaurant];
              setFavorites(updatedFavorites);
              await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
              Alert.alert(
                'Added!',
                'The restaurant has been added to your favorites.',
                [
                  { 
                    text: 'View Favorites', 
                    onPress: () => navigation.navigate('Favorites') 
                  },
                ]
              );
            },
          },
        ]
      );
    }
  };

  const isFavorite = (restaurant) => {
    return favorites.some(fav => fav.id === restaurant.id);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Message for no restaurants found
  const noRestaurantsMessage = noRestaurantsFound ? (
    <View style={styles.noRestaurantsContainer}>
      <Text style={styles.noRestaurantsText}>No restaurants found in this location.</Text>
      <TouchableOpacity onPress={clearSearch} style={styles.searchAgainButton}>
        <Text style={styles.buttonText}>Search Again</Text>
      </TouchableOpacity>
    </View>
  ) : null;
  
  return (
    <View style={styles.container}>
      <View style={styles.topstyle}>
      <Text style={styles.title}>🍽️ Welcome to Fine Dine!</Text>  
        <View style={styles.searchfunction}>
          <TextInput
            style={styles.input}
            placeholder={`Search restaurants by location, eg: ${location}`} 
            value={locationInput}
            onChangeText={setLocationInput} 
          />  
  
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
  
        <TextInput
          style={styles.input}
          placeholder="Search by restaurant name"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {noRestaurantsMessage}

      <FlatList
        data={filteredRestaurants} // Use the filtered restaurants
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RestaurantItem
            restaurant={item}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite(item)} // Pass favorite status
            navigation={navigation} 
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5E8D8',
  },
  topstyle: {
    paddingTop: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C88B60',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    paddingHorizontal: 10,
  },
  searchfunction: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#6D4C41', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',

  },
  listContainer: {
    width: '100%',
    padding: 10,
  },
  noRestaurantsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noRestaurantsText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  searchAgainButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
});

export default HomeScreen;