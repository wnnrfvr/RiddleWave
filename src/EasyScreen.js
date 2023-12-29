import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  Button,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';


const questions = [
  {
    id: 1,
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
    options: ["A river", "An echo", "A tree"],
    answer: "An echo",
    hint: "The answer is a sound that reflects off surfaces.",
  },
  {
    id: 2,
    question: "What has keys but can't open locks?",
    options: ["A keyboard", "A book", "A map"],
    answer: "A map",
    hint: "It helps you find your way.",
  },
  {
    id: 3,
    question: "What is always in front of you but can't be seen?",
    options: ["The future", "The present", "The past"],
    answer: "The future",
    hint: "It's the time that is yet to come.",
  },
  {
    id: 4,
    question: "What has a head and a tail but no body?",
    options: ["A coin", "A snake", "A book"],
    answer: "A coin",
    hint: "It's used as money.",
  },
  {
    id: 5,
    question: "What has keys but can't open locks?",
    options: ["A keyboard", "A book", "A map"],
    answer: "A map",
    hint: "It displays roads and locations.",
  },
  {
    id: 6,
    question: "The more you take, the more you leave behind. What am I?",
    options: ["Footsteps", "Breath", "Shadows"],
    answer: "Footsteps",
    hint: "You create them while walking.",
  },
  {
    id: 7,
    question: "I have keys but open no locks. I have space but no room. You can enter, but you can't go inside. What am I?",
    options: ["A computer", "A keyboard", "A piano"],
    answer: "A keyboard",
    hint: "You use it to type.",
  },
  {
    id: 8,
    question: "What has a heart that doesn't beat?",
    options: ["An artichoke", "A tomato", "An apple"],
    answer: "An artichoke",
    hint: "It's a vegetable.",
  },
  {
    id: 9,
    question: "I can be cracked, made, told, and played. What am I?",
    options: ["A joke", "A song", "A puzzle"],
    answer: "A joke",
    hint: "Laughter often follows.",
  },
  {
    id: 10,
    question: "The more you look at me, the less you see. What am I?",
    options: ["Darkness", "A mirror", "Fog"],
    answer: "Darkness",
    hint: "I envelop everything at night.",
  },
  {
    id: 11,
    question: "I have cities but no houses, mountains but no trees, and water but no fish. What am I?",
    options: ["A map", "A globe", "A painting"],
    answer: "A map",
    hint: "It represents geographical features.",
  },
  {
    id: 12,
    question: "I have keys but can't open any locks. I have a space but no room. You can enter, but you can't go inside. What am I?",
    options: ["A keyboard", "A piano", "A book"],
    answer: "A keyboard",
    hint: "You use it to type words.",
  },
  {
    id: 13,
    question: "I'm tall when I'm young, and short when I'm old. What am I?",
    options: ["A candle", "A tree", "A person"],
    answer: "A candle",
    hint: "It provides light as it burns.",
  },
  {
    id: 14,
    question: "The more you take, the more you leave behind. What am I?",
    options: ["Footsteps", "Breath", "Shadows"],
    answer: "Footsteps",
    hint: "You create them while walking.",
  },
  {
    id: 15,
    question: "I have a heart that doesn't beat. What am I?",
    options: ["A painting", "A sculpture", "A vegetable"],
    answer: "A painting",
    hint: "It captures a moment in time.",
  },
  {
    id: 16,
    question: "I have cities but no houses, mountains but no trees, and water but no fish. What am I?",
    options: ["A map", "A globe", "A painting"],
    answer: "A map",
    hint: "It represents geographical features.",
  },
  {
    id: 17,
    question: "I'm always in front of you but can't be seen. What am I?",
    options: ["The past", "The present", "The future"],
    answer: "The future",
    hint: "It's the time that is yet to come.",
  },
  {
    id: 18,
    question: "I have wings but don't fly. I can cry, but I can't shed a tear. What am I?",
    options: ["A bird", "An airplane", "A cloud"],
    answer: "A cloud",
    hint: "I bring rain and shade.",
  },
  {
    id: 19,
    question: "I can be cracked, made, told, and played. What am I?",
    options: ["A joke", "A song", "A puzzle"],
    answer: "A joke",
    hint: "Laughter often follows.",
  },
  {
    id: 20,
    question: "The more you look at me, the less you see. What am I?",
    options: ["Darkness", "A mirror", "Fog"],
    answer: "Darkness",
    hint: "I envelop everything at night.",
  },
  {
    id: 21,
    question: "I have a face but no eyes, hands but no fingers. What am I?",
    options: ["A clock", "A mask", "A doll"],
    answer: "A clock",
    hint: "I help you keep track of time.",
  },
];



const EasyScreen = ({ navigation }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [highlightAnswer, setHighlightAnswer] = useState(false);
  const [fadeIn] = useState(new Animated.Value(0));

  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };
  

  useEffect(() => {
    // Shuffle the questions once they are available
    if (questions.length > 0) {
      const shuffledQuestionsCopy = shuffle(questions);
      setShuffledQuestions(shuffledQuestionsCopy);
    }
  }, [questions, currentQuestionIndex]);


  useEffect(() => {
    fadeIn.setValue(0);
  }, [currentQuestionIndex]);
  

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleAnswer = (option) => {
    setSelectedAnswer(option);

    if (option === currentQuestion.answer) {
      setScore(score + 1);

      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        fadeIn.setValue(0);
      });
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // If all questions are answered, shuffle the questions again for the next round
      setShuffledQuestions(shuffle(...questions));
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const hintButtonHandler = () => {
    setShowHint(true);
    setHighlightAnswer(true);
  };

  const closeModal = () => {
    setShowHint(false);
    setHighlightAnswer(false);
  };

  return (

      <LinearGradient
        colors={['#3498db', '#8e44ad']}
        style={styles.container}
      >
        <TouchableOpacity style={styles.hintButton} onPress={hintButtonHandler}>
          <Text style={styles.hintButtonText}>🔍 Hint</Text>
        </TouchableOpacity>
  
        <Modal visible={showHint} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.hintTitle}>Hint</Text>
              {/* Add a conditional check for currentQuestion before accessing 'hint' */}
              {currentQuestion && <Text style={styles.hintText}>{currentQuestion.hint}</Text>}
              <Button title="Close" onPress={closeModal} />
            </View>
          </View>
        </Modal>
  
        {highlightAnswer && (
          <View style={styles.highlight}>
            {/* Add a conditional check for currentQuestion before accessing 'answer' */}
            {currentQuestion && <Text style={styles.highlightText}>{currentQuestion.answer}</Text>}
          </View>
        )}
  
        {/* Add a conditional check for currentQuestion before rendering */}
        {currentQuestion && (
          <>
            <Text style={styles.question}>{currentQuestion.question}</Text>
  
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === option && styles.selectedOption,
                ]}
                onPress={() => handleAnswer(option)}
                disabled={showResult}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
  
            {showResult && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>
                  {selectedAnswer === currentQuestion.answer ? 'Correct!' : 'Incorrect!'}
                </Text>
                {selectedAnswer === currentQuestion.answer && (
                  <Animated.Text
                    style={[
                      styles.resultText,
                      {
                        opacity: fadeIn,
                      },
                    ]}
                  >
                    🎉 Well done!
                  </Animated.Text>
                )}
                <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                  <Text style={styles.nextButtonText}>Next Question ➡️</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </LinearGradient>
    
  );
}

// Define your initial questions here

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    color: '#fff',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#4D9A5D',
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  nextButton: {
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  hintButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
  },
  hintButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  hintTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  hintText: {
    fontSize: 16,
    color: '#333333',
  },
  highlight: {
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#FFFF00',
    padding: 5,
    borderRadius: 5,
  },
  highlightText: {
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default EasyScreen;