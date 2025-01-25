import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { questions } from "../questions";
import PropTypes from 'prop-types';

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
    QuestionProvider.propTypes = {
        children: PropTypes.node.isRequired
    }

    // States
    const [start, setStart] = useState(false); // start
    const [questionList, setQuestionList] = useState(questions); // questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // questions index
    const [showOptions, setShowOptions] = useState(false); // options
    const [answer, setAnswer] = useState([]); // answer
    const [isQuizFinished, setIsQuizFinished] = useState(false) // last page
    const [timeLeft, setTimeLeft] = useState(30) // timer
    const [correct, setCorrect] = useState(0) // last page correct
    const [wrong, setWrong] = useState(0) // last page  wrong
    const [empty, setEmpty] = useState(0) // last page  empty
    const [results, setResults] = useState([]) // last page results


    // Start Function

    // Start Function and Reset
    const handlestart = () => {
      setStart(true);
      setCurrentQuestionIndex(0);
      setAnswer([]);
      setIsQuizFinished(false);
      setCorrect(0);
      setWrong(0);
      setEmpty(0);
      setResults([]);
      setTimeLeft(30);
      setShowOptions(false);
    }

    // Questions, Options, Timer, Answer, Last Page
    useEffect(() => {
    if (currentQuestionIndex >= questionList.length) {
      setIsQuizFinished(true) // last page
      return
    }

    // Timer and Options
    setTimeLeft(30)
    setShowOptions(false)

    // Options Timer  4 seconds
    const optionTimer = setTimeout(() => {
      setShowOptions(true)
    }, 4000)

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId)
          if (currentQuestionIndex < questionList.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1) // next question page
            setAnswer((prev) => [...prev, null]) // empty answer
          } else {
            setAnswer((prev) => [...prev, null]);
            setIsQuizFinished(true) // last page
          }
          return 0 // timer
        }
        return prevTime - 1 // timer
      })
    }, 1000)

    return () => {
      // clear timers and intervals
      clearTimeout(optionTimer)
      clearInterval(intervalId)
    }
  }, [currentQuestionIndex, questionList.length, setCurrentQuestionIndex, setAnswer, setShowOptions]) // conection with states

  const handleAnswer = (selectedOption) => {
    const selectedAnswer = selectedOption.target.innerText // selected answer
    setAnswer((prev) => [...prev, selectedAnswer]) // answer
    // selectedAnswer === question.answer ? console.log("Doğru") : console.log("Yanlış")
    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1) // next question page
    } else {
      setIsQuizFinished(true) // last page
    }
  }

//  Last Pages Results
useEffect(() => {
  if (isQuizFinished) {
    // veriables
    let correctCount = 0;
    let wrongCount = 0;
    let emptyCount = 0;
    const newResults = [];

    // check answers
    questionList.forEach((item, index) => {
      if (answer[index] === item.answer) {
        correctCount++;
        newResults.push("Doğru");
      } else if (answer[index] === null || answer[index] === undefined) {
        emptyCount++;
        newResults.push("Boş");
      } else {
        wrongCount++;
        newResults.push("Yanlış");
      }
    });

    // set states
    setCorrect(correctCount);
    setWrong(wrongCount);
    setEmpty(emptyCount);
    setResults(newResults);
  }
}, [isQuizFinished, answer, questionList]); // conection with states


  // Data for Context
  const data = {
    setQuestionList,
    start,
    questionList,
    currentQuestionIndex,
    answer,
    showOptions,
    isQuizFinished,
    timeLeft,
    correct,
    wrong,
    empty,
    results,
    handlestart,
    handleAnswer,
  }
  return <QuestionContext.Provider value={data}>{children}</QuestionContext.Provider>;
}

export const useQuestion = () => useContext(QuestionContext);