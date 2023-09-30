import React from 'react'
import MyCodeEditor from '../components/MyCodeEditor'

const CodingPage = () => {
  return (
    <div className='row'>
      <div className='col-6'>
        question description
      </div>
      <div className='col-6'>
        <MyCodeEditor/>
      </div>
    </div>
  )
}

export default CodingPage