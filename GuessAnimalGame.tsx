import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Example animal data (replace image paths with your own images in assets/images/animals/)
const animalData = [
  { name: 'Cat', emoji: '🐱', category: 'Animals' },
  { name: 'Dog', emoji: '🐶', category: 'Animals' },
  { name: 'Elephant', emoji: '🐘', category: 'Animals' },
  { name: 'Lion', emoji: '🦁', category: 'Animals' },
  { name: 'Tiger', emoji: '🐯', category: 'Animals' },
  { name: 'Monkey', emoji: '🐵', category: 'Animals' },
  { name: 'Giraffe', emoji: '🦒', category: 'Animals' },
  { name: 'Zebra', emoji: '🦓', category: 'Animals' },
  { name: 'Bear', emoji: '🐻', category: 'Animals' },
  { name: 'Horse', emoji: '🐴', category: 'Animals' },
  { name: 'Rabbit', emoji: '🐰', category: 'Animals' },
  { name: 'Frog', emoji: '🐸', category: 'Animals' },
  { name: 'Duck', emoji: '🦆', category: 'Animals' },
  { name: 'Pig', emoji: '🐷', category: 'Animals' },
  { name: 'Sheep', emoji: '🐑', category: 'Animals' },
  { name: 'Cow', emoji: '🐮', category: 'Animals' },
  { name: 'Goat', emoji: '🐐', category: 'Animals' },
  { name: 'Chicken', emoji: '🐔', category: 'Animals' },
  { name: 'Panda', emoji: '🐼', category: 'Animals' },
  { name: 'Kangaroo', emoji: '🦘', category: 'Animals' },
  // Planets
  { name: 'Earth', emoji: '🌍', category: 'Planets' },
  { name: 'Mars', emoji: '🔴', category: 'Planets' },
  { name: 'Saturn', emoji: '🪐', category: 'Planets' },
  { name: 'Moon', emoji: '🌕', category: 'Planets' },
  { name: 'Star', emoji: '⭐', category: 'Planets' },
  // Things
  { name: 'Car', emoji: '🚗', category: 'Things' },
  { name: 'Bicycle', emoji: '🚲', category: 'Things' },
  { name: 'Book', emoji: '📚', category: 'Things' },
  { name: 'Ball', emoji: '⚽', category: 'Things' },
  { name: 'Pencil', emoji: '✏️', category: 'Things' },
  { name: 'Clock', emoji: '⏰', category: 'Things' },
  { name: 'Umbrella', emoji: '☂️', category: 'Things' },
  { name: 'Apple', emoji: '🍎', category: 'Things' },
  { name: 'Chair', emoji: '🪑', category: 'Things' },
];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default function GuessAnimalGame() {
  const [category, setCategory] = useState('Animals');
  const [question, setQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  // Filter data by category
  const filteredData = animalData.filter(item => item.category === category);

  function getChoices(correctIndex: number, difficulty: number) {
    // Increase number of choices as difficulty increases
    const numChoices = Math.min(2 + Math.floor(difficulty / 5), 6); // 2 to 6 choices
    const choices = new Set([correctIndex]);
    while (choices.size < numChoices) {
      const idx = getRandomInt(filteredData.length);
      choices.add(idx);
    }
    // Shuffle choices
    return Array.from(choices).sort(() => Math.random() - 0.5);
  }

  if (question >= 20) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Game Over!</Text>
        <Text style={styles.score}>Your Score: {score} / 20</Text>
        <TouchableOpacity style={styles.button} onPress={() => {
          setQuestion(0);
          setScore(0);
          setShowResult(false);
          setSelected(null);
        }}>
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Difficulty increases as score increases
  const difficulty = score;
  const correctIndex = getRandomInt(filteredData.length);
  const choices = getChoices(correctIndex, difficulty);
  const correctAnimal = filteredData[correctIndex];

  const handleGuess = (idx: number) => {
    setSelected(idx);
    if (idx === correctIndex) {
      setScore(score + 1);
      setShowResult(true);
      setTimeout(() => {
        setQuestion(question + 1);
        setShowResult(false);
        setSelected(null);
      }, 800);
    } else {
      setShowResult(true);
      setTimeout(() => {
        setQuestion(question + 1);
        setShowResult(false);
        setSelected(null);
      }, 800);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16, gap: 8 }}>
        {['Animals', 'Planets', 'Things'].map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.button, category === cat && { backgroundColor: '#FF9800' }]}
            onPress={() => {
              setCategory(cat);
              setQuestion(0);
              setScore(0);
              setShowResult(false);
              setSelected(null);
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.title}>Guess the {category.slice(0, -1)}!</Text>
      <Text style={styles.score}>Score: {score} / 20</Text>
      <Text style={styles.question}>Question {question + 1} of 20</Text>
      <Text style={styles.emoji}>{correctAnimal.emoji}</Text>
      <View style={styles.choicesContainer}>
        {choices.map((idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.choice,
              selected === idx && (idx === correctIndex ? styles.correct : styles.incorrect),
            ]}
            onPress={() => handleGuess(idx)}
            disabled={showResult}
          >
            <Text style={styles.choiceText}>{filteredData[idx].name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {showResult && (
        <Text style={selected === correctIndex ? styles.correctText : styles.incorrectText}>
          {selected === correctIndex ? 'Correct!' : `Oops! It's a ${correctAnimal.name}`}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 12,
    textAlign: 'center',
    backgroundColor: '#FFECB3',
    borderRadius: 12,
    padding: 8,
    borderWidth: 2,
    borderColor: '#FFB300',
    overflow: 'hidden',
  },
  score: {
    fontSize: 20,
    color: '#4CAF50',
    marginBottom: 8,
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  emoji: {
    fontSize: 110,
    marginBottom: 16,
    textAlign: 'center',
  },
  choicesContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  choice: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    margin: 6,
    minWidth: 120,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD54F',
    elevation: 2,
    shadowColor: '#FFB300',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
  },
  choiceText: {
    fontSize: 20,
    color: '#2196F3',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  correct: {
    borderColor: '#4CAF50',
    backgroundColor: '#C8E6C9',
  },
  incorrect: {
    borderColor: '#F44336',
    backgroundColor: '#FFCDD2',
  },
  correctText: {
    color: '#4CAF50',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
  },
  incorrectText: {
    color: '#F44336',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#FF9800',
    paddingVertical: 16,
    paddingHorizontal: 32,
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
