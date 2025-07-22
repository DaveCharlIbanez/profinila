import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeMenu() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animal Learn & Play</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/GuessAnimalGame')}>
        <Text style={styles.buttonText}>Guess the Animal Game</Text>
      </TouchableOpacity>
      {/* Add more buttons for other features later */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FFECB3',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    width: 260,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6D4C41',
  },
});
