import { createStackNavigator } from '@react-navigation/stack';
import RestaurantItem from './resturantitem'; // Adjust the path as necessary
import MenuModal from '../menu';
import React from 'react';

const Stack = createStackNavigator();

function AppNavigator() {
    return (
            <Stack.Navigator>
                <Stack.Screen name="resturantitem" component={RestaurantItem} />
                <Stack.Screen name="menu" component={MenuModal} options={{ title: 'menu' }} />
            </Stack.Navigator>
    );
}

export default AppNavigator;
