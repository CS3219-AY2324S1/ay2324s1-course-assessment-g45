import { QuestionsContext } from "../contexts/QuestionContext"
import { useContext} from 'react'

export const useQuestionsContext = () => {
  const context = useContext(QuestionsContext)

  if (!context) {
    throw Error('useQuestionsContext must be used inside a QuestionsContextProvicer')
  }

  return context
}