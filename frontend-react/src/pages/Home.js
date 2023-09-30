// import { useNavigate } from "react-router-dom"
// import { useUserContext } from "../hooks/useUserContext"
// import QuestionTable from "../components/question/QuestionTable"

// const Home = () => {
//   const { user, dispatch } = useUserContext()
//   const navigate = useNavigate()
//   return (
//     <div>
//       <QuestionTable/>
//     </div>
//   )
// }

// export default Home

import { useNavigate } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"
import CollabEditor from "../components/CollabEditor"

const CollabPage = () => {
  const { user, dispatch } = useUserContext()
  const navigate = useNavigate()
  return (
    <div>
      <CollabEditor/>
    </div>
  )
}

export default CollabPage