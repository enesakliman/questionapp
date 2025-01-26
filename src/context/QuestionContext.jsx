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



    // Start Function and Reset
    useEffect(() => {
      if (!start || currentQuestionIndex >= questionList.length) {
        // Eğer quiz başlamamışsa veya son soruya ulaşılmışsa, hiçbir işlem yapma
        return;
      }
    
      // Yeni soru için timer'ları sıfırla
      setTimeLeft(30);
      setShowOptions(false);
    
      // Şıkları 4 saniye sonra göster
      const optionTimer = setTimeout(() => {
        setShowOptions(true);
      }, 4000);
    
      // Geri sayım timer'ı
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            clearTimeout(optionTimer);
    
            // Süre bittiğinde boş cevap ekle ve bir sonraki soruya geç
            if (currentQuestionIndex < questionList.length - 1) {
              setCurrentQuestionIndex((prev) => prev + 1);
              setAnswer((prev) => [...prev, null]);
            } else {
              setIsQuizFinished(true);
            }
    
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    
      // Timer'ları temizle
      return () => {
        clearTimeout(optionTimer);
        clearInterval(intervalId);
      };
    }, [currentQuestionIndex, questionList.length, start]);
    
    // Start Function
    const handlestart = () => {
      // Quiz'i başlat
      setStart(true);
      setCurrentQuestionIndex(0);
      setAnswer([]);
      setIsQuizFinished(false);
      setCorrect(0);
      setWrong(0);
      setEmpty(0);
      setResults([]);
      setTimeLeft(30); // İlk soruya hazırlık
    };

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
      } else if (answer[index] === null) {
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