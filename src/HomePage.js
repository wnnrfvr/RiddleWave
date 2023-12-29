import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, BackHandler, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const HomePage = ({ navigation }) => {
  const buttonWidth = width * 0.8;

  // Animation setup
  const animatedValue = new Animated.Value(0);

  const handleExitApp = () => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            BackHandler.exitApp();

            // Remove the event listener here
          },
        },
      ],
      { cancelable: false }
    );
  };


  const handleButtonPress = (screen) => {
    // Animate button press
    Animated.sequence([
      Animated.timing(animatedValue, { toValue: 1, duration: 100, useNativeDriver: false }),
      Animated.timing(animatedValue, { toValue: 0, duration: 100, useNativeDriver: false }),
    ]).start(() => navigation.navigate(screen));
  };

  // Interpolate the animated value for button press animation
  const buttonScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#f9e69f', '#d1feff']} style={styles.gradientBackground}>
        <View style={styles.buttonsContainer}>
          {/* Easy Button */}
          <Animated.View
            style={[
              styles.button,
              { backgroundColor: '#f49366', width: buttonWidth, transform: [{ scale: buttonScale }] },
            ]}
          >
            <TouchableOpacity onPress={() => handleButtonPress('Easy')}>
              <Text style={styles.buttonText}>Easy Mode</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Medium Button */}
          <Animated.View
            style={[
              styles.button,
              { backgroundColor: '#8a4d30', width: buttonWidth, transform: [{ scale: buttonScale }] },
            ]}
          >
            <TouchableOpacity onPress={() => handleButtonPress('Medium')}>
              <Text style={styles.buttonText}>Medium Mode</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Hard Button */}
          <Animated.View
            style={[
              styles.button,
              { backgroundColor: '#7c422b', width: buttonWidth, transform: [{ scale: buttonScale }] },
            ]}
          >
            <TouchableOpacity onPress={() => handleButtonPress('Hard')}>
              <Text style={styles.buttonText}>Hard Mode</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Legend Button */}
          <Animated.View
            style={[
              styles.button,
              { backgroundColor: '#793d26', width: buttonWidth, transform: [{ scale: buttonScale }] },
            ]}
          >
            <TouchableOpacity onPress={() => handleButtonPress('Legend')}>
              <Text style={styles.buttonText}>Emoji Fest😁😝🤩 (Legend Mode)</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Exit Button */}
        <TouchableOpacity
          style={[styles.exitButton, { width: buttonWidth }]}
          onPress={handleExitApp}
        >
          <Text style={styles.exitButtonText}>Exit</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    height: 100,
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 8,
    paddingHorizontal: 15,
    elevation: 3, // Add elevation for shadow on Android
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'monospace'
  },
  exitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
    borderRadius: 8,
    paddingVertical: 15,
    marginTop: 20,
    elevation: 3, // Add elevation for shadow on Android
  },
  exitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomePage;
