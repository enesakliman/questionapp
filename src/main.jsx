import { createRoot } from 'react-dom/client'
import { QuestionProvider } from './context/QuestionContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <QuestionProvider>
        <App />
    </QuestionProvider>
)
