import React from 'react'
// import MyCodeEditor from '../components/MyCodeEditor'
import MonacoCodeEditor from '../components/MonacoCodeEditor'

const CodingPage = () => {
  return (
    <div className='row'>
      <div className='col-6'>
        question description
      </div>
      <div className='col-6'>
        <MonacoCodeEditor/>
      </div>
    </div>
  )
}

export default CodingPage