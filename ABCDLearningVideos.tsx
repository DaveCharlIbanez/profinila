import React from 'react';
import { FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const abcdVideos = [
  {
    id: '1',
    title: 'ABC Song for Kids',
    url: 'https://www.youtube.com/watch?v=75p-N9YKqNo',
  },
  {
    id: '2',
    title: 'Phonics Song with TWO Words',
    url: 'https://www.youtube.com/watch?v=BELlZKpi1Zs',
  },
  {
    id: '3',
    title: 'Learn ABC Alphabet',
    url: 'https://www.youtube.com/watch?v=36IBDpTRVNE',
  },
  // Add more ABCD learning videos as needed
];

export default function ABCDLearningVideos() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔤 ABCD Learning Videos</Text>
      <FlatList
        data={abcdVideos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => Linking.openURL(item.url)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.link}>Watch on YouTube</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
    padding: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E65100',
    marginBottom: 8,
  },
  link: {
    fontSize: 16,
    color: '#FF9800',
    textDecorationLine: 'underline',
  },
});
