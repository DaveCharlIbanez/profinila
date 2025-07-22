import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const alphabetData = [
  { letter: 'A', word: 'Apple', emoji: '🍎' },
  { letter: 'B', word: 'Ball', emoji: '⚽' },
  { letter: 'C', word: 'Cat', emoji: '🐱' },
  { letter: 'D', word: 'Dog', emoji: '🐶' },
  { letter: 'E', word: 'Elephant', emoji: '🐘' },
  { letter: 'F', word: 'Frog', emoji: '🐸' },
  { letter: 'G', word: 'Giraffe', emoji: '🦒' },
  { letter: 'H', word: 'Hat', emoji: '🎩' },
  { letter: 'I', word: 'Ice Cream', emoji: '🍦' },
  { letter: 'J', word: 'Juice', emoji: '🧃' },
  { letter: 'K', word: 'Kangaroo', emoji: '🦘' },
  { letter: 'L', word: 'Lion', emoji: '🦁' },
  { letter: 'M', word: 'Monkey', emoji: '🐵' },
  { letter: 'N', word: 'Nest', emoji: '🪺' },
  { letter: 'O', word: 'Orange', emoji: '🍊' },
  { letter: 'P', word: 'Panda', emoji: '🐼' },
  { letter: 'Q', word: 'Queen', emoji: '👸' },
  { letter: 'R', word: 'Rabbit', emoji: '🐰' },
  { letter: 'S', word: 'Star', emoji: '⭐' },
  { letter: 'T', word: 'Tiger', emoji: '🐯' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️' },
  { letter: 'V', word: 'Violin', emoji: '🎻' },
  { letter: 'W', word: 'Whale', emoji: '🐋' },
  { letter: 'X', word: 'Xylophone', emoji: '🎶' },
  { letter: 'Y', word: 'Yacht', emoji: '🛥️' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓' },
];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default function AlphabetGame() {
  const [question, setQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  // Pick a random letter
  const correctIndex = getRandomInt(alphabetData.length);
  const correct = alphabetData[correctIndex];

  // Generate choices (letters)
  function getChoices() {
    const choices = new Set([correctIndex]);
    while (choices.size < 4) {
      const idx = getRandomInt(alphabetData.length);
      choices.add(idx);
    }
    return Array.from(choices).sort(() => Math.random() - 0.5);
  }
  const choices = getChoices();

  const handleGuess = (idx: number) => {
    setSelected(idx);
    if (idx === correctIndex) {
      setScore(score + 1);
      setShowResult(true);
      setTimeout(() => {
        setQuestion(question + 1);
        setShowResult(false);
        setSelected(null);
      }, 900);
    } else {
      setShowResult(true);
      setTimeout(() => {
        setQuestion(question + 1);
        setShowResult(false);
        setSelected(null);
      }, 900);
    }
  };

  if (question >= 10) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Game Over!</Text>
        <Text style={styles.score}>Your Score: {score} / 10</Text>
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess the Letter!</Text>
      <Text style={styles.score}>Score: {score} / 10</Text>
      <Text style={styles.question}>Question {question + 1} of 10</Text>
      <Text style={styles.emoji}>{correct.emoji}</Text>
      <Text style={styles.wordHint}>Which letter starts the word "{correct.word}"?</Text>
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
            <Text style={styles.choiceText}>{alphabetData[idx].letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {showResult && (
        <Text style={selected === correctIndex ? styles.correctText : styles.incorrectText}>
          {selected === correctIndex ? 'Correct!' : `Oops! It's "${correct.letter}" for ${correct.word}`}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12,
    textAlign: 'center',
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
    fontSize: width < 400 ? 80 : 110,
    marginBottom: 16,
    textAlign: 'center',
  },
  wordHint: {
    fontSize: 20,
    color: '#FF9800',
    fontWeight: 'bold',
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
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    margin: 6,
    minWidth: 80,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  choiceText: {
    fontSize: 28,
    color: '#1976D2',
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
    backgroundColor: '#1976D2',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 2,
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 2 },
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
