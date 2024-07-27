import React, { useState } from "react";
import { Tooltip } from 'react-tooltip'

const QuestionDisplay = ({ question, onAnswerSelect, onNextQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
    onAnswerSelect(answerId, question.correctAnswer);
  };

  const clearSelectedAnswer = () => {
    setSelectedAnswer(null);
  };

  return (
    <div className="my-8 bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto w-full">
      <h2 className="text-xl font-bold mb-4">Question {question.id}</h2>
      <div className="mb-6 overflow-y-auto">
        <p className="text-lg">{question.title}</p>
        <p className="text-sm text-gray-600">{question.description}</p>
      </div>
      <div className="space-y-4">
        {question.options.map((option) => (
          <div
            key={option.id}
            className={`flex items-center p-2 rounded-lg ${
              selectedAnswer === option.id
                ? option.id === question.correctAnswer
                  ? "bg-green-100 border-green-500"
                  : "bg-red-100 border-red-500"
                : "bg-gray-200"
            }`}
          >
            <input
              type="radio"
              id={option.id}
              name="answer"
              value={option.id}
              className="mr-2"
              onChange={() => handleAnswerSelect(option.id)}
              checked={selectedAnswer === option.id}
            />
            <label htmlFor={option.id} className="text-base">
              {option.text}
            </label>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8 float-right st"
        onClick={() => {
          clearSelectedAnswer();
          onNextQuestion();
        }}
      >
        Next Question
        <Tooltip anchorSelect=".st" variant="success" clickable>
          <button onClick={() => {
          clearSelectedAnswer();
          onNextQuestion();
        }}>Click..</button>
        </Tooltip>
      </button>
    </div>
  );
};

export default QuestionDisplay;
