import React, { useEffect, useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { updateUser } from '../apis/UserProfileApi'
import { useNavigate } from 'react-router-dom'

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
  const [ isEditUsername, setIsEditUsername] = useState(false)
  const [ isEditEmail, setIsEditEmail ] = useState(false)
  const [ isChangePassword, setIsChangePassword] = useState(false)
  const navigate = useNavigate()

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
      email: email
    }

    const response = await updateUser(user._id, updatedUser)
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
      navigate('/')
    }  
  }

  return (
    <div className='profile-container'>
      <h3> Profile </h3>
      { (!isEdit && !isChangePassword) &&
        <div className='profile-card'>
          <div className='row mb-3'> 
            <b className='col-4'>Username:</b>
            <div className='col'>{ username }</div> 
            {/* { 
              !isEditUsername && 
              <div className='col-8 row'>
                <div className='col'>{ username }</div> 
                <div className='col-2' onClick={()=>setIsEditUsername(true)}>
                  <span class="material-symbols-outlined small-icons">edit</span>
                </div>
              </div>
            } */}
          </div>
          <div className='row mb-3'> 
            <b className='col-4'>Email: </b> 
            <div className='col'> { user.email } </div>
          </div>

          <button className='secondary-btn' onClick={() => setIsEdit(!isEdit)}> Edit profile </button>
          <button className='secondary-btn' onClick={handleDelete}> Delete profile </button>
          <button className='secondary-btn mt-3' onClick={() => setIsChangePassword(true)}> Change password </button>
        </div>
      }

        {/* {
          isEditUsername &&
          <div className='row'>
            <input
              className='col-10'
              type='text' value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="material-symbols-outlined small-icons col-1">save</span>
            <span className="material-symbols-outlined small-icons col-1">cancel</span>
          </div>
        } */}
        
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
          <button className='secondary-btn' onClick={()=>setIsEdit(false)}> Cancel </button>
          <button className='secondary-btn' onClick={handleEditSubmit}> Save changes </button>
        </div>
      }

      {
        isChangePassword &&
        <div className='profile-card'>
          {/* TODO: check for correct password */}
          { wrongPwError && <div> {wrongPwError} </div>}
          <label> <b>Password :</b> </label>
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
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button className='secondary-btn' onClick={()=>setIsEdit(false)}> Cancel </button>
          <button className='secondary-btn' onClick={handleEditSubmit}> Save changes </button>

        </div>
      }

    </div>
  )
}

export default Profile