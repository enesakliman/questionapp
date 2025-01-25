import { useQuestion } from './context/QuestionContext'
import StartPage from './components/StartPage';
import QuestionPages from './components/QuestionPages';
import './App.css'

function App() {
    const { start } = useQuestion();

  return (
    <>
      {start ? <QuestionPages /> : <StartPage />}
    </>
  )
}

export default App
