import React, { useEffect } from "react";
import { Tooltip } from 'react-tooltip'
import sound from "../assets/sound.mp3";

const ResultScreen = ({ score, totalQuestions, onRestartQuiz }) => {
  const percentage = ((score / totalQuestions) * 100).toFixed(2);
  let feedbackMessage;

  if (percentage >= 80) {
    feedbackMessage = "Congratulations! You did an excellent job!";
  } else if (percentage >= 60) {
    feedbackMessage = "Well done! You did a good job!";
  } else {
    feedbackMessage = "Keep practicing! You can do better!";
  }


  useEffect(() => {
    const audio = new Audio(sound);
    audio.play();
  }, []);

  return (
    <div className="my-8 bg-gray-100 p-6 rounded-lg shadow-md text-center max-w-md m-auto st">
      <h2 className="text-2xl font-bold mb-4">Quiz Result 🚀</h2>
      <p className="text-lg mb-4">
        You scored {score} out of {totalQuestions} questions.
      </p>
      <p className="text-lg mb-4">
        Your score: {percentage}% ({score}/{totalQuestions})
      </p>
      <p className="text-lg mb-4 text-emerald-800 font-semibold italic">
        {feedbackMessage}
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={onRestartQuiz}
      >
        Restart Quiz
      </button>
      <Tooltip anchorSelect=".st" variant="success" float="true">
        <div className="tooltip-content">
          <p className="text-lg">You can restart the quiz by clicking the Restart button</p>

        </div>
      </Tooltip>
    </div>
  );
};

export default ResultScreen;
