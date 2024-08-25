import React from 'react';


const Score = ({ score, totalQuestions, userAnswers, onRestart }) => {
 
  const percentage = ((score / totalQuestions) * 100).toFixed(2);


  const getGrade = (percentage) => {
    if (percentage >= 90) return 'O 😃';
    if (percentage >= 80) return 'A 😄';
    if (percentage >= 70) return 'B 😉';
    if (percentage >= 60) return 'C 🙃';
    if (percentage >= 50) return 'D 😔';
    return 'F 😭';
  };

  const grade = getGrade(percentage);

  console.log(`Score: ${score}, Total Questions: ${totalQuestions}, Percentage: ${percentage}, Grade: ${grade}`);

  return (
    <div className="score-container">
      <h2>Quiz Completed!</h2>
      <p>Your score: {score} out of {totalQuestions}</p>
      <p>Your percentage: {percentage}%</p>
      <p>Your grade: {grade}</p>
      
      <div className="answers-summary">
        <h3>Answers Summary:</h3>
        <ul>
          {userAnswers.map((answer, index) => (
            <li key={index}>
              <strong>Question:</strong> {answer.question}<br />
              <strong>Your Answer:</strong> {answer.selectedOption}<br />
              <strong>Correct Answer:</strong> {answer.correctAnswer}
            </li>
          ))}
        </ul>
      </div>

      <button className="restart-button" onClick={onRestart}>
        Restart Quiz
      </button>
    </div>
  );
};


export default Score;
