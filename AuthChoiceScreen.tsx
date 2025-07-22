import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AuthChoiceScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Choose how you want to use the app:</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/SignInScreen?mode=online')}>
        <Text style={styles.buttonText}>Sign In (Online)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/SignUpScreen?mode=online')}>
        <Text style={styles.buttonText}>Sign Up (Online)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/SignInScreen?mode=offline')}>
        <Text style={styles.buttonText}>Use Offline</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7E8FF',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7B2FF2',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#7B2FF2',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#FFB347',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginVertical: 10,
    width: 250,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
