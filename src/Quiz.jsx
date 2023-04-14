import { useState } from "react";
import { resultInitialState } from "./services/static-data";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);

  const { question, choices, correctAnswer } = questions[currentQuestion];

  const onAnswerClick = (choice, index) => {
    setAnswerIdx(index);
    if (choice === correctAnswer) setAnswer(true);
    else {
      setAnswer(false);
    }
  };

  const onClickNext = () => {
    setAnswerIdx(null);
    setResult((prev) =>
      answer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswer: prev.correctAnswer + 1,
          }
        : {
            ...prev,
            wrongAnswer: prev.wrongAnswer + 1,
          }
    );

    if (currentQuestion !== questions.length - 1)
      setCurrentQuestion((prev) => prev + 1);
    else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };

  const onClickTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
  };
  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span>
          <h2>{question}</h2>
          <ul>
            {choices.map((choice, index) => (
              <li
                onClick={() => onAnswerClick(choice, index)}
                key={choice}
                className={answerIdx === index ? "selected-answer" : null}
              >
                {choice}
              </li>
            ))}
          </ul>
          <div className="footer">
            <button onClick={onClickNext} disabled={answerIdx === null}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Questions : <span>{questions.length}</span>
          </p>
          <p>
            Total Score : <span>{result.score}</span>
          </p>
          <p>
            Correct Answer : <span>{result.correctAnswer}</span>
          </p>
          <p>
            Wrong Answer : <span>{result.wrongAnswer}</span>
          </p>
          <button onClick={onClickTryAgain}>Try Again</button>
        </div>
      )}
    </div>
  );
};
export default Quiz;
