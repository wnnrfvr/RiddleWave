import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, View, StyleSheet } from 'react-native';
import HardScreen from './src/HardScreen';
import HomePage from './src/HomePage';
import MediumScreen from './src/MediumScreen';
import Sigma from './src/SigmaLevelsScreen';
import EasyScreen from './src/EasyScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const getHeaderImage = (route) => {
    switch (route.name) {
      case 'Easy':
        return { image: require('./assets/easy.png'), title: 'Easy Riddles' };
      case 'Medium':
        return { image: require('./assets/medium.png'), title: 'Medium Riddles' };
      case 'Hard':
        return { image: require('./assets/hard.png'), title: 'Hard Riddles' };
      case 'Legend':
        return { image: require('./assets/sigma.png'), title: 'Legend' };
      default:
        return { image: require('./assets/easy.png'), title: 'Riddle App' };
    }
  };

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name === 'Home', // Show header only for the home screen
        headerStyle: {
          backgroundColor: '#f9e69f',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerTitle: () => (
          <View style={styles.headerContainer}>
            <Image
              source={getHeaderImage(route).image}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        ),
        title: getHeaderImage(route).title,
      })}
    >
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Easy" component={EasyScreen} />
      <Stack.Screen name="Medium" component={MediumScreen} />
      <Stack.Screen name="Hard" component={HardScreen} />
      <Stack.Screen name="Legend" component={Sigma} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 40,
  },
});

export default AppNavigator;

