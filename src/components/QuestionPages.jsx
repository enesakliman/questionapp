import LastPage from "./LastPage"
import { useQuestion } from "../context/QuestionContext"

function QuestionPages() {
  const {
    questionList,
    currentQuestionIndex,
    showOptions,
    isQuizFinished,
    timeLeft,
    handleAnswer
  } = useQuestion()

  
  const question = questionList[currentQuestionIndex]
  
  if (isQuizFinished) {
    return <LastPage /> // last page
  }

  return (
    <div className="question-area">
      <div className="question">
         <div className="timer">Kalan Süre: {timeLeft} saniye</div> {/*time left */}
        <img src={question.media} alt="Soru görseli" /> {/*question image */}
        <p>{question.question}</p> {/*question */}
        {showOptions && ( // options
          <div className="options">
            {question.options.map((option, index) => ( 
              <button key={index} onClick={handleAnswer}>
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionPages

