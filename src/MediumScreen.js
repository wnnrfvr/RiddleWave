import { LinearGradient } from 'expo-linear-gradient';
import React, { useState , useEffect} from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const questions = [
  {
    id: 1,
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
    answer: "echo",
    hint: "a sound that reflects off surfaces.",
  },
  {
    id: 2,
    question: "What has keys but can't open locks?",
    answer: "map",
    hint: "It helps you find your way.",
  },
  {
    id: 3,
    question: "The more you take, the more you leave behind. What am I?",
    answer: "footsteps",
    hint: "You create them when you walk.",
  },
  {
    id: 4,
    question: "I can fly without wings. I can cry without eyes. Wherever I go, darkness follows me. What am I?",
    answer: "cloud",
    hint: "A visible mass of water droplets or ice crystals in the atmosphere.",
  },
  {
    id: 5,
    question: "What has a heart that doesn't beat?",
    answer: "artichoke",
    hint: "A vegetable with a heart-shaped center.",
  },
  {
    id: 6,
    question: "What begins and has no end?",
    answer: "circle",
    hint: "A shape with no corners or edges.",
  },
  {
    id: 7,
    question: "I'm tall when I'm young, and I'm short when I'm old. What am I?",
    answer: "candle",
    hint: "It gets shorter as it burns.",
  },
  {
    id: 8,
    question: "What has a neck but no head?",
    answer: "bottle",
    hint: "You might find it containing liquids.",
  },
  {
    id: 9,
    question: "I'm not alive, but I can grow. I don't have lungs, but I need air. What am I?",
    answer: "fire",
    hint: "It consumes oxygen and produces heat and light.",
  },
  {
    id: 10,
    question: "The more you take, the more you leave behind. What am I?",
    answer: "footsteps",
    hint: "You create them when you walk.",
  },
];

const windowHeight = Dimensions.get('window').height;

const CustomKeyboard = ({ onPress }) => {
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ];

  return (
    <View style={styles.keyboard}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((letter, index) => (
            <TouchableOpacity key={index} onPress={() => onPress(letter)}>
              <Text style={styles.key}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};



const MediumScreen = ({ navigation }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState(shuffle(questions));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shouldShowNext, setShouldShowNext] = useState(false);
  const currentQuestion = shuffledQuestions[questionIndex];
  const [showAnswer, setShowAnswer] = useState(false);

  function shuffle(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  useEffect(() => {
    if (questionIndex >= questions.length) {
      setShuffledQuestions(shuffle(questions));
      setQuestionIndex(0);
    }
  }, [questionIndex, questions]);

  const showAnswerButtonHandler = () => {
    setShowAnswer(true);
  };

  const checkAnswer = () => {
    if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setIsCorrect(true);
      setShouldShowNext(true); // Set to true when the answer is correct
      setUserAnswer('');
      setShowHint(false); // Reset hint display
    } else {
      setIsCorrect(false);
    }
  };

  const handleKeyPress = (letter) => {
    setUserAnswer((prevAnswer) => prevAnswer + letter);
  };

  const clearAnswer = () => {
    setUserAnswer('');
  };

  const removeLastLetter = () => {
    setUserAnswer((prevAnswer) => prevAnswer.slice(0, -1));
  };

  const revealHint = () => {
    setShowHint(true);
  };

  useEffect(() => {
    if (shouldShowNext) {
      // Use useEffect to transition to the next question
      const timer = setTimeout(() => {
        setQuestionIndex((prevIndex) => prevIndex + 1);
        setIsCorrect(false);
        setShouldShowNext(false); // Reset shouldShowNext
      }, 3000); // Adjust the timeout as needed
      return () => clearTimeout(timer);
    }
  }, [shouldShowNext]);


  if (questionIndex >= questions.length) {
    return (
      <View style={styles.container}>
        <Text>All questions answered!</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#FDF5E6', '#FFC0A0']} // Adjust the gradient colors
      style={styles.container}
    >
    <View>
      {/* Top Part */}
      <View style={styles.topPart}>
        <TouchableOpacity style={styles.hintButton} onPress={revealHint}>
          <Text style={styles.hintText}>🔍 Hint</Text>
        </TouchableOpacity>
        <Text style={styles.riddle}>{currentQuestion.question}</Text>
        <TouchableOpacity style={styles.showAnswerButton} onPress={showAnswerButtonHandler}>
          <Text style={styles.buttonText}>Show Answer</Text>
        </TouchableOpacity>
      </View>

      {/* Middle Part */}
      <View style={styles.middlePart}>
        <View style={styles.answerContainer}>
          <View
            style={[
              styles.answerBoxContainer
            ]}
          >
            <View style={[styles.answerBox, isCorrect ? styles.correctAnswer : styles.wrongAnswer,]}>
              <Text style={styles.answer}>{userAnswer}</Text>
            </View>
            {isCorrect && (
              <Text style={styles.correctMessage}>
                🎉 Hurray! You are a riddle genius!
              </Text>
            )}
            {showAnswer && (
              <Text style={styles.correctMessage}>
                Answer: {currentQuestion.answer}
              </Text>
            )}
          </View>
        </View>
        {showHint && <Text style={styles.hint}>🔍 {currentQuestion.hint}</Text>}
      </View>

      {/* Lower Part */}
      <View style={styles.lowerPart}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.textButton} onPress={clearAnswer}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.textButton} onPress={removeLastLetter}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>

          {isCorrect ? (
            <TouchableOpacity
              style={[styles.nextButton, styles.correctButton]}
              onPress={() => {
                setShouldShowNext(true);
                setUserAnswer('');
                setShowHint(false);
                setShowAnswer(false); // Reset showAnswer
              }}
            >
              <Text style={styles.buttonText}>Next ➡️</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.checkButton, styles.wrongButton]} onPress={checkAnswer}>
              <Text style={styles.buttonText}>Check Answer</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <CustomKeyboard onPress={handleKeyPress} />
        </View>
      </View>
    </View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF0F5', // Lavender blush background for the whole app
  },
  topPart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDAB9',
    paddingHorizontal: 10,
    top: 30,
    borderRadius: 15,
    margin: 5,
    elevation: 5, // Adding elevation for a slight shadow effect
  },
  middlePart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  lowerPart: {
    flex: 1,
    alignItems: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFDAB9', 
    borderTopWidth: 1,
    borderTopColor: '#87CEEB', // Sky blue border
    paddingHorizontal: 5,
    paddingBottom: windowHeight * 0.005,
    elevation: 5, // Adding elevation for a slight shadow effect
  },
  riddle: {
    fontSize: 22,
    textAlign: 'center',
    color: '#4B0082', // Indigo text for riddles
    fontWeight: 'bold', // Enhancing font weight
    paddingTop: 15,
  },
  answerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  answer: {
    fontSize: 26,
    textAlign: 'center',
    color: '#4B0092', // Steel blue text for answers
    fontWeight: 'bold', // Enhancing font weight
  },

  answerBox: {
    borderWidth: 3,
    borderColor: '#4B0092', // Steel blue border for answer box
    padding: 12,
    width: 280,
    minHeight: 60,
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#FFF8DC', // Cornsilk background for answer box
  },
  keyboard: {
    flexDirection: 'column',
    backgroundColor: '#FFDAB9', // Peachpuff background for keyboard
    borderRadius: 20,
    width: "100%",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    
  },
  key: {
    width: 35,
    height: 35,
    borderRadius: 17,
    backgroundColor: '#FFA07A', // Light salmon key background
    textAlign: 'center',
    lineHeight: 35,
    fontSize: 18,
    margin: 5,
    elevation: 2, // Adding elevation for a slight shadow effect
  },
  showAnswerButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFA07A',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  hintButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFA07A', // Tomato red for hint button
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  hintText: {
    fontSize: 16,
    color: '#FFFFFF', // White text for hints
  },
  hint: {
    marginVertical: 10,
    paddingHorizontal: 20,
    fontStyle: 'italic',
    color: '#008080', // Teal color for hint text
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 56,
  },
  textButton: {
    backgroundColor: '#FFA07A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  checkButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  answerBoxContainer: {
    flexDirection: 'column', // Change to column direction
    alignItems: 'center', // Center items vertically
  },
  correctMessage: {
    color: 'green',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  correctAnswer: {
    backgroundColor: '#8FDC94', // Green background for correct answer
  },
  wrongAnswer: {
    backgroundColor: '#F19090', // Red background for wrong answer
  },
  correctButton: {
    backgroundColor: '#4CAF50', // Green button for correct answer
  },
  wrongButton: {
    backgroundColor: '#F44336', // Red button for wrong answer
  },

});

export default MediumScreen;


