import React, { useState, useEffect } from 'react';
import Score from './Score';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid', 'Rome'],
    answer: 'Paris'
  },
  {
    question: 'What is the capital of Germany?',
    options: ['Paris', 'London', 'Berlin', 'Madrid', 'Rome'],
    answer: 'Berlin'
  },
  {
    question: 'What is the capital of Japan?',
    options: ['Seoul', 'Beijing', 'Tokyo', 'Hanoi', 'Bangkok'],
    answer: 'Tokyo'
  },
  {
    question: 'What is the capital of Canada?',
    options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal', 'Calgary'],
    answer: 'Ottawa'
  },
  {
    question: 'What is the capital of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'incinnati', 'Adelaide'],
    answer: 'Canberra'
  }
];

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const newAnswer = {
      question: questions[currentQuestionIndex].question,
      selectedOption,
      correctAnswer
    };
    
    setUserAnswers((prevAnswers) => [...prevAnswers, newAnswer]);

    if (selectedOption === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setTimeLeft(5);
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= questions.length) {
        setShowResults(true);
        return prevIndex;
      }
      return nextIndex;
    });
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setTimeLeft(5);
    setShowResults(false);
    setUserAnswers([]);
  };

  return (
    <div className="App">
      <div className={`box ${showResults ? 'hidden' : ''}`}>
        <div className="question-cover">
          <h1>{questions[currentQuestionIndex].question}</h1>
        </div>
        <div>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${selectedOption === option ? 'selected' : ''}`}
              onClick={() => handleOptionChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <button className="submit-button" onClick={handleSubmit} disabled={!selectedOption}>
          Submit
        </button>
        <p>Time left: {timeLeft}s</p>
      </div>
      <div className={`box ${showResults ? '' : 'hidden'}`}>
        <Score score={score} totalQuestions={questions.length} userAnswers={userAnswers} onRestart={restartQuiz} />
      </div>
    </div>
  );
}

export default Quiz;
