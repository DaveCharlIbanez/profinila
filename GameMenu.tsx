import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function GameMenu() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require('@/assets/images/game-bg.png')} // Add a playful background image to assets/images/
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>AWESOME{width > 350 ? '\n' : ' '}GAME</Text>
        <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/GuessAnimalGame')}>
          <Text style={styles.menuButtonText}>PLAY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/(tabs)/explore')}>
          <Text style={styles.menuButtonText}>OPTIONS</Text>
        </TouchableOpacity>
        
      </View>
      <View style={styles.iconBar}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.icon}>🛒</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.icon}>🏆</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: height * 0.08,
  },
  title: {
    fontSize: width < 400 ? 36 : 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    marginBottom: 32,
    letterSpacing: 2,
    backgroundColor: 'rgba(255, 200, 0, 0.7)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  menuButton: {
    backgroundColor: '#FFB347',
    borderColor: '#FF9800',
    borderWidth: 3,
    borderRadius: 32,
    marginVertical: 12,
    width: width < 400 ? 220 : 320,
    paddingVertical: width < 400 ? 16 : 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: width < 400 ? 22 : 28,
    fontWeight: 'bold',
    letterSpacing: 2,
    textShadowColor: '#FF9800',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  iconBar: {
    position: 'absolute',
    right: 16,
    bottom: 32,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 10,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    fontSize: 28,
  },
});
