import React from 'react'

const MyAlert = ( { serverity, message }) => {
  const alerts = ['success', 'info', 'warning', 'error-alert']
  const icons = ['task_alt', 'info', 'warning_amber', 'error_outline']
  return (
    <div className='alert-container'>
      <div className={alerts[serverity] + ' alert'}>
        <span className='material-symbols-outlined'> {icons[serverity]} </span>
        <span> {message }</span> 
      </div>
    </div>
  )
}

export default MyAlert