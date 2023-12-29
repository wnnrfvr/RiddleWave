import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';

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
    options: ["Footsteps", "Breath", "Time"],
    answer: "Footsteps",
    hint: "It's a trace of where you've been.",
  },
  {
    id: 7,
    question: "I'm tall when I'm young, and short when I'm old. What am I?",
    options: ["A giraffe", "A tree", "A candle"],
    answer: "A candle",
    hint: "It gets shorter as it burns.",
  },
  {
    id: 8,
    question: "The person who makes it, sells it. The person who buys it never uses it. What is it?",
    options: ["A coffin", "A hat", "A chair"],
    answer: "A coffin",
    hint: "It's associated with the end of life.",
  },
  {
    id: 9,
    question: "I have keys but no locks. I have space but no room. You can enter, but you can't go inside. What am I?",
    options: ["A keyboard", "A computer", "A piano"],
    answer: "A keyboard",
    hint: "It's an input device for computers.",
  },
  {
    id: 10,
    question: "The more you take, the more you leave behind. What am I?",
    options: ["Footsteps", "Breath", "Time"],
    answer: "Footsteps",
    hint: "It's a mark left on the ground.",
  },
  {
    id: 11,
    question: "The more you take, the more you leave behind. What am I?",
    options: ["Footsteps", "Breath", "Time"],
    answer: "Footsteps",
    hint: "It's a mark left on the ground.",
  },
  {
    id: 12,
    question: "What has a heart that doesn't beat?",
    options: ["A robot", "An artichoke", "An artichoke"],
    answer: "An artichoke",
    hint: "It's a vegetable, not a living organism.",
  },
  {
    id: 13,
    question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
    options: ["The letter M", "An event", "A second"],
    answer: "The letter M",
    hint: "It's a written symbol.",
  },
  {
    id: 14,
    question: "I'm not alive, but I can grow; I don't have lungs, but I need air. What am I?",
    options: ["A cloud", "A fire", "A balloon"],
    answer: "A fire",
    hint: "It needs oxygen to sustain combustion.",
  },
  {
    id: 15,
    question: "The more you take, the more you leave behind. What am I?",
    options: ["Footsteps", "Breath", "Time"],
    answer: "Footsteps",
    hint: "It's a trace of where you've been.",
  },

];

const EndScreen = ({ score, restart }) => {
  return (
    <View style={styles.endScreenContainer}>
      <Text style={styles.endScreenText}>Riddle Session Completed!</Text>
      <Text style={styles.endScreenText}>Your score: {score} out of 10</Text>
      <TouchableOpacity style={styles.restartButton} onPress={restart}>
        <Text style={styles.restartButtonText}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
};



const shuffleQuestions = (questions) => {
  for (let i = questions.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[randomIndex]] = [questions[randomIndex], questions[i]];
  }
  return questions;
};


const HardScreen = ({ navigation }) => {
  const [allQuestions, setAllQuestions] = useState(shuffleQuestions(questions.slice(0, 10))); // Shuffle and select the first 10 questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(allQuestions[currentQuestionIndex]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [highlightAnswer, setHighlightAnswer] = useState(false);
  const [timer, setTimer] = useState(20); // Initial time limit in seconds
  const [isRiddleCompleted, setIsRiddleCompleted] = useState(false);
  const [questionsState, setQuestionsState] = useState([]);

  useEffect(() => {
    let timerInterval;

    if (!showResult && !isRiddleCompleted) {
      timerInterval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [showResult, isRiddleCompleted]);

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
    }
  }, [timer]);

  useEffect(() => {
    // Shuffle questions and options only once during initialization
    const shuffledQuestions = shuffleQuestions([...questions]);
    setQuestionsState(shuffledQuestions);
  }, []);
  

  const handleAnswer = (option) => {
    setSelectedAnswer(option);

    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < allQuestions.length) {
      setCurrentQuestion(allQuestions[nextQuestionIndex]);
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimer(20); // Reset the timer for the next question
    } else {
      setIsRiddleCompleted(true);
    }
  };


  const hintButtonHandler = () => {
    setShowHint(true);
    setHighlightAnswer(true); // Highlight the correct answer on hint button press
  };

  const closeModal = () => {
    setShowHint(false);
    setHighlightAnswer(false); // Reset highlighting when closing hint modal
  };

  const restartRiddle = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(allQuestions[0]);
    setIsRiddleCompleted(false);
    setTimer(20);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (isRiddleCompleted) {
    return <EndScreen score={score} restart={restartRiddle} />;
  }

  return (
    <View style={styles.container}>
      {/* Top Part */}
      <View style={styles.topPart}>
        <Text style={styles.timerText}>{timer} seconds</Text>
        <TouchableOpacity style={styles.hintButton} onPress={hintButtonHandler}>
          <Text style={styles.hintButtonText}>Hint</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showHint} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.hintTitle}>Hint</Text>
          <Text style={styles.hintText}>{currentQuestion.hint}</Text>
          <Button title="Close" onPress={closeModal} />
        </View>
      </View>
      </Modal>

     

      {highlightAnswer && (
      <View style={styles.highlight}>
        <Text style={styles.highlightText}>{currentQuestion.answer}</Text>
      </View>
    )}
     <View style={styles.middlePart}>

      <Text style={styles.question}>{currentQuestion.question}</Text>

      </View>

      {/* Lower Part */}
      <View style={styles.lowerPart}>
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
          <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
            <Text style={styles.nextButtonText}>Next Question</Text>
          </TouchableOpacity>
        </View>
      )}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDEBD0', // Cream
    padding: 20,
  },
  topPart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  middlePart: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0B27A', // Light Brown
    marginVertical: 10,
    borderRadius: 15,
    padding: 20,
  },
  lowerPart: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(193, 123, 123, 0.1)', // Lavender
    marginVertical: 10,
    borderRadius: 15,
    padding: 20,
    width: '100%'
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E74C3C', // Alizarin Crimson
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3498DB', // Belize Hole
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#2ECC71', // Emerald Green
  },
  selectedOption: {
    backgroundColor: '#27AE60', // Nephritis
  },
  optionText: {
    fontSize: 16,
    color: '#ffffff', // White
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#F39C12', // Orange
  },
  nextButton: {
    backgroundColor: '#9B59B6', // Amethyst
    padding: 10,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  hintButton: {
    backgroundColor: '#E67E22', // Carrot
    padding: 10,
    borderRadius: 8,
  },
  hintButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  hintTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E74C3C', // Alizarin Crimson
  },
  hintText: {
    fontSize: 16,
    color: '#000000', // Black
  },
  highlight: {
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#F1C40F', // Sunflower
    padding: 5,
    borderRadius: 5,
  },
  highlightText: {
    fontWeight: 'bold',
  },
  endScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDEBD0', // Cream
  },
  endScreenText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#3498DB', // Belize Hole
  },
  restartButton: {
    backgroundColor: '#9B59B6', // Amethyst
    padding: 10,
    borderRadius: 8,
  },
  restartButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default HardScreen;

