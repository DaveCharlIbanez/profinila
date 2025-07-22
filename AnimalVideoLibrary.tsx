import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

const videos = [
  {
    id: '1',
    title: 'Amazing Animal Facts for Kids',
    url: 'https://www.youtube.com/watch?v=5Qk6G8hQ2BU',
  },
  {
    id: '2',
    title: 'Wildlife for Kids: Learn About Animals',
    url: 'https://www.youtube.com/watch?v=3xI1xkLkK8c',
  },
  {
    id: '3',
    title: 'Animals and Their Sounds',
    url: 'https://www.youtube.com/watch?v=1nYqDrLr7bM',
  },
  // Add more kid-friendly animal videos as needed
];

const { width } = Dimensions.get('window');

function getYouTubeEmbedUrl(url: string) {
  const match = url.match(/v=([\w-]+)/);
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}

export default function AnimalVideoLibrary() {
  const router = useRouter();

  const renderVideo = (item: typeof videos[0]) => {
    if (Platform.OS === 'web') {
      return (
        <TouchableOpacity
          style={styles.webCard}
          onPress={() => window.open(item.url, '_blank')}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.link}>Watch on YouTube</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <WebView
          source={{ uri: getYouTubeEmbedUrl(item.url) }}
          style={{ width: width - 56, height: (width - 56) * 0.56, borderRadius: 12, marginBottom: 8 }}
          allowsFullscreenVideo
          javaScriptEnabled
          domStorageEnabled
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎬 Animal Video Library</Text>
      <FlatList
        data={videos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => renderVideo(item)}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  webCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
    cursor: 'pointer',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0D47A1',
    marginBottom: 8,
  },
  link: {
    fontSize: 16,
    color: '#1976D2',
    textDecorationLine: 'underline',
  },
});
