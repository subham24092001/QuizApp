import React, { useState, useEffect } from "react";
import questions from "./data/questions";
import QuestionDisplay from "./components/QuestionDisplay";
import ResultScreen from "./components/ResultScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import { Tooltip } from 'react-tooltip'

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const storedQuestionIndex = JSON.parse(
      localStorage.getItem("currentQuestionIndex")
    );
    return storedQuestionIndex !== null ? storedQuestionIndex : 0;
  });

  const [userAnswers, setUserAnswers] = useState(() => {
    const storedAnswers = JSON.parse(localStorage.getItem("userAnswers"));
    return storedAnswers !== null ? storedAnswers : [];
  });

  useEffect(() => {
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    localStorage.setItem(
      "currentQuestionIndex",
      JSON.stringify(currentQuestionIndex)
    );
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answerId) => {
    setUserAnswers((prevAnswers) => {
      
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = answerId;
      return updatedAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentQuestionIndex(questions.length);
    }
  };

  const calculateScore = () => {
    let score = 0;
    userAnswers.forEach((userAnswer, index) => {
      if (userAnswer === questions[index].correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
  };

  return (
    <div className="container mx-auto min-h-screen flex flex-col justify-center items-center bg-gray-200">
      {currentQuestionIndex === 0 ? (
        <WelcomeScreen onStartQuiz={handleNextQuestion} />
      ) : (
        <>
          {currentQuestionIndex < questions.length ? (
            <QuestionDisplay
              question={questions[currentQuestionIndex - 1]}
              onAnswerSelect={handleAnswerSelect}
              onNextQuestion={handleNextQuestion}
              userAnswer={userAnswers[currentQuestionIndex]}
            />
          ) : (
            <ResultScreen
              score={calculateScore()}
              totalQuestions={questions.length}
              onRestartQuiz={handleRestartQuiz}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
