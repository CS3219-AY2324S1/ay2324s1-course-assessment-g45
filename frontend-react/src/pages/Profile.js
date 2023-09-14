import React, { useEffect, useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'

const Profile = () => {
  const { user, dispatch } = useUserContext()
  // const user = {
  //   username: 'test',
  //   password: 1234,
  //   email: 'test@gmail.com'
  // }

  const [ username, setUsername ] = useState(user.username)
  const [ email, setEmail ] = useState(user.email)
  const [ password, setPassword ] = useState('')
  const [ wrongPwError, setWrongPwError ] = useState('')
  const [ newPassword, setNewPassword ] = useState('')
  const [ isEdit, setIsEdit ] = useState(false)

  const checkPassword = (pw) => {
    if (!(pw === user.password)) {
      setWrongPwError('Password does not match')
    } else {
      setWrongPwError(null)
    }
  }

  const handleEditSubmit = async () => {
    const updatedUser = {
      username: username,
      email: email,
      password : newPassword,
    }
    const response = await fetch('/api/UserProfiles/' + user._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedUser),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({ type : 'EDIT_USER', payload : json})
      setIsEdit(!isEdit)
    }    
  }

  const handleDelete = async() => {
    const response = await fetch('/api/userProfiles/' + user._id , {
      method: 'DELETE'
    })

    const json = await response.json()
    if (response.ok) {
      dispatch({ type : 'LOGOUT', payload : json })
    }  
  }

  return (
    <div className='profile-container'>
      <h3> Profile </h3>

      {
        !isEdit &&
        <div className='profile-card'>
          <div className='user-detail'> <b>Username:</b> { user.username } </div>
          <div className='user-detail'> <b>Email: </b> { user.email }</div>
          <button className='secondary-btn' onClick={() => setIsEdit(!isEdit)}> Edit profile </button>
          <button className='secondary-btn' onClick={handleDelete}> Delete profile </button>
        </div>
      }

      {
        isEdit &&
        <div className='profile-card'>
          <label><b>Username:</b></label>
          <input type='text' value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label><b> Email:</b></label>
          <input type='text' value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button> Change password</button>


          {/* TODO: check for correct password */}
          {/* { wrongPwError && <div> {wrongPwError} </div>}
          <label> Password: </label>
          <input type='password' value={password}
          onChange={(e) => checkPassword(e.target.value)}/> */}
          
          <label> New Password: </label>
          <input type='password' value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button className='secondary-btn' onClick={handleEditSubmit}> Save changes </button>
        </div>
      }

    </div>
  )
}

export default Profile