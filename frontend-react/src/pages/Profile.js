import React, { useEffect, useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { updateUser } from '../apis/UserProfileApi'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { user, dispatch } = useUserContext()

  const [ username, setUsername ] = useState(user.username)
  const [ email, setEmail ] = useState(user.email)
  const [ password, setPassword ] = useState('')
  const [ newPassword, setNewPassword ] = useState('')
  const [ confirmNewPasword, setConfirmNewPassword ] = useState('')
  const [ passwordError, setPasswordError ] = useState('')
  const [ error, setError ] = useState('')
  const [ isEdit, setIsEdit ] = useState(false)
  const [ isChangePassword, setIsChangePassword] = useState(false)
  const navigate = useNavigate()

  const checkPassword = (pw) => {
    setPassword(pw)
    // if (!(pw === user.password)) {
    //   setPasswordError('Wrong password')
    // } else {
    //   setPasswordError(null)
    // }
  }

  const checkConfirmNewPassword = (pw) => {
    setConfirmNewPassword(pw)
    if (!(pw === newPassword)) {
      setPasswordError('New password must match')
    } else {
      setPasswordError(null)
    }
  }

  const cancelChangePw = () => {
    setPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
    setIsChangePassword(false)
    setPasswordError('')
  }

  const handleChangePw = async () => {
    if (password === '') {
      setPasswordError('Please key in your password')
      return
    }

    // if (password !== user.password) {
    //   setPasswordError('Wrong current password, please try again')
    //   return
    // }
    if (newPassword === '' || confirmNewPasword === '') {
      setPasswordError('Please key in your new password')
      return
    }
    const updatedUser = {
      username: username,
      email: email,
      currentPassword: password,
      newPassword : newPassword
    }
    console.log(user)
    console.log(updatedUser)
    const response = await updateUser(user.token, user.id, updatedUser)
    const json = await response.json()
    if (response.ok) {
      dispatch({ type : 'EDIT_USER', payload : json})
      setPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
      setIsChangePassword(false)
      setPasswordError('')
    }
    if (!response.ok) {
      setError(json.error)
    }
  }

  const cancelEdit = () => {
    setUsername(user.username)
    setEmail(user.email)
    setError('')
    setIsEdit(false)
  }

  const handleEditSubmit = async () => {
    if (username === '' || email === '') {
      setError('User name or email cannot be empty')
      return
    }
    const updatedUser = {
      username: username,
      email: email,
      password: username.password
    }

    const response = await updateUser(user.token, user.id, updatedUser)
    const json = await response.json()
    if (response.ok) {
      dispatch({ type : 'EDIT_USER', payload : json})
      setIsEdit(!isEdit)
      console.log(user)
      setUsername(user.username)
      setEmail(user.email)
      setError('')
    }
    if (!response.ok) {
      setError(json.error)
    }
  }

  const handleDelete = async() => {
    const response = await fetch('/api/userProfiles/' + user._id , {
      method: 'DELETE'
    })

    const json = await response.json()
    if (response.ok) {
      dispatch({ type : 'LOGOUT', payload : json })
      navigate('/')
    }
    if (!response.ok) {
      setError(json.error)
    }
  }

  return (
    <div className='profile-container'>
      <h3> Profile </h3>
      { user.username }
      { (!isEdit && !isChangePassword) &&
        <div className='profile-card'>
          <div className='row mb-3'> 
            <b className='col-4'>Username:</b>
            <div className='col'>{ user.username }</div> 
          </div>
          <div className='row mb-3'> 
            <b className='col-4'>Email: </b> 
            <div className='col'> { user.email } </div>
          </div>

          <button className='secondary-btn' onClick={() => setIsEdit(true)}> Edit profile </button>
          <button className='secondary-btn' onClick={handleDelete}> Delete profile </button>
          <button className='secondary-btn mt-3' onClick={() => setIsChangePassword(true)}> Change password </button>
        </div>
      }
        
      {
        isEdit &&
        <div className='profile-card'>
          <div className='error'> {error}</div>
          <label><b>Username:</b></label>
          <input type='text' value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label><b> Email:</b></label>
          <input type='text' value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className='secondary-btn' onClick={cancelEdit}> Cancel </button>
          <button className='secondary-btn' onClick={handleEditSubmit}> Save changes </button>
        </div>
      }

      {
        isChangePassword &&
        <div className='profile-card'>
          {/* TODO: check for correct password */}
          { passwordError && <div className='error'> {passwordError} </div>}
          <label> Password </label>
          <input 
            type='password'
            value={password}
            onChange={(e) => checkPassword(e.target.value)}
          />

          <label> New Password: </label>
          <input 
            type='password' 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label> Confirm New Password: </label>
          <input 
            type='password' 
            value={confirmNewPasword}
            onChange={(e) => checkConfirmNewPassword(e.target.value)}
          />

          <button className='secondary-btn' onClick={cancelChangePw}> Cancel </button>
          <button className='secondary-btn' onClick={handleChangePw}> Save changes </button>

        </div>
      }

    </div>
  )
}

export default Profile