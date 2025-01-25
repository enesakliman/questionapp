import { useQuestion } from "../context/QuestionContext"

function LastPage() {
  const { answer, questionList, correct, wrong, empty, results } = useQuestion()
  
  
  return (
    <div className="results">
      <div className="results-container">
        <h1>Test Sonuçlarınız</h1>
        <h2>
          Doğru sayısı: {correct} Yanlış sayısı: {wrong} Boş sayısı: {empty} {/* results */}
        </h2>
        <div className="results-details">
          <div>
            <h3>Kullanıcı cevapları</h3>
            <hr />
            <ul>
              {/* User Answer */}
              {answer.map((item, index) => (
                <li key={index}>{item === null ? "Boş" : item}</li>
              ))}
            </ul>
          </div>
          <div>
            {/* Answer Key */}
            <h3>Cevap Anahtarı</h3>
            <hr />
            <ul>
              {questionList.map((question, index) => (
                <li key={index}>{question.answer}</li>
              ))}
            </ul>
          </div>
          <div>
            {/* Results */}
            <h3>Sonuçlar</h3>
            <hr />
            <ul>
              {results.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <span>Katıldığınız için teşekkür ederiz.</span>
      </div>
    </div>
  )
}

export default LastPage

