import React, { useEffect, useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { updateUser, deleteUser} from '../apis/UserProfileApi'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Row, Form, Card, Button } from 'react-bootstrap';
import { useLogout } from "../hooks/useLogout"
import ConfirmationPopup from '../components/ConfirmationPopup';

const Profile = () => {
  const { user, dispatch } = useUserContext()

  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ newPassword, setNewPassword ] = useState('')
  const [ confirmNewPasword, setConfirmNewPassword ] = useState('')
  const [ passwordError, setPasswordError ] = useState('')
  const [ usernameError, setUsernameError ] = useState('')
  const [ emailError, setEmailError] = useState('')
  const [ error, setError ] = useState('')
  const [ isEdit, setIsEdit ] = useState(false)
  const [ isChangePassword, setIsChangePassword] = useState(false)
  const [deleteCurrentUser, setDeleteUser] = useState(false)
  const { logout } = useLogout()
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

  const handleChangePw = async (e) => {
    e.preventDefault();
    console.log(newPassword)
    console.log(confirmNewPasword)

    if (newPassword !== confirmNewPasword) {
      setPasswordError('The new password and confirm new password do not match.')
      return
    }

    const updatedUser = {
      username: username,
      email: email,
      currentPassword: password,
      newPassword : newPassword
    }
 
    const response = await updateUser(user.token, user.id, updatedUser)
    const json = await response.json()
    if (response.ok) {
      dispatch({ type : 'EDIT_USER', payload : json})
      setPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
      // setIsChangePassword(false)
      setPasswordError('')
    }
    if (!response.ok) {
      setPasswordError(json.error)
    }
  }

  const cancelEdit = () => {
    setUsername(user.username)
    setEmail(user.email)
    setError('')
    setIsEdit(false)
  }

  const handleEditSubmit = async () => {
    // if (username === '' || email === '') {
    //   setError('User name or email cannot be empty')
    //   return
    // }
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
      setUsername(user.username)
      setEmail(user.email)
      setError('')
    }
    if (!response.ok) {
      setError(json.error)

    }
  }

  const handleUsernameEdit = async (e) => {
    e.preventDefault();

    if (username === user.username ) {
      setUsernameError('The username is the same as the current one.')
      return
    }

    const updatedUser = {
      username: username,
    }

    const response = await updateUser(user.token, user.id, updatedUser)
    const json = await response.json()
    console.log(json)
    if (response.ok) {
      dispatch({ type : 'EDIT_USER', payload : json})
      setUsername('')
      setUsernameError('')
    }
    if (!response.ok) {
      setUsernameError(json.error)
    }
  }

  const handleEmailEdit = async (e) => {
    e.preventDefault();

    if (email === user.email ) {
      setEmailError('The email is the same as the current one.')
      return
    }

    const updatedUser = {
      email: email,
    }

    const response = await updateUser(user.token, user.id, updatedUser)
    const json = await response.json()
    console.log(json)
    if (response.ok) {
      dispatch({ type : 'EDIT_USER', payload : json})
      setEmail('')
      setEmailError('')
    }
    if (!response.ok) {
      setEmailError(json.error)
    }
  }


  const handleDelete = async(userId) => {
   
    const response = await deleteUser(user.token, userId)

    const json = await response.json()
    if (response.ok) {
      dispatch({ type : 'LOGOUT', payload : json })
      logout()
    }
    if (!response.ok) {
      setError(json.error)
    }
  }


  const showDeleteConfirmation = (userId) => { 
    setDeleteUser(true)
    console.log("showDeleteConfirmation")
  }

  return (
    // <div className='profile-container'>
    //   <h3> Profile </h3>
    //   { user.username }
    //   { (!isEdit && !isChangePassword) &&
    //     <div className='profile-card'>
    //       <div className='row mb-3'> 
    //         <b className='col-4'>Username:</b>
    //         <div className='col'>{ user.username }</div> 
    //       </div>
    //       <div className='row mb-3'> 
    //         <b className='col-4'>Email: </b> 
    //         <div className='col'> { user.email } </div>
    //       </div>

    //       <button className='secondary-btn' onClick={() => setIsEdit(true)}> Edit profile </button>
    //       <button className='secondary-btn' onClick={handleDelete}> Delete profile </button>
    //       <button className='secondary-btn mt-3' onClick={() => setIsChangePassword(true)}> Change password </button>
    //     </div>
    //   }
        
    //   {
    //     isEdit &&
    //     <div className='profile-card'>
    //       <div className='error'> {error}</div>
    //       <label><b>Username:</b></label>
    //       <input type='text' value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //       />
    //       <label><b> Email:</b></label>
    //       <input type='text' value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //       <button className='secondary-btn' onClick={cancelEdit}> Cancel </button>
    //       <button className='secondary-btn' onClick={handleEditSubmit}> Save changes </button>
    //     </div>
    //   }

    //   {
    //     isChangePassword &&
    //     <div className='profile-card'>
    //       {/* TODO: check for correct password */}
    //       { passwordError && <div className='error'> {passwordError} </div>}
    //       <label> Password </label>
    //       <input 
    //         type='password'
    //         value={password}
    //         onChange={(e) => checkPassword(e.target.value)}
    //       />

    //       <label> New Password: </label>
    //       <input 
    //         type='password' 
    //         value={newPassword}
    //         onChange={(e) => setNewPassword(e.target.value)}
    //       />

    //       <label> Confirm New Password: </label>
    //       <input 
    //         type='password' 
    //         value={confirmNewPasword}
    //         onChange={(e) => checkConfirmNewPassword(e.target.value)}
    //       />

    //       <button className='secondary-btn' onClick={cancelChangePw}> Cancel </button>
    //       <button className='secondary-btn' onClick={handleChangePw}> Save changes </button>

    //     </div>
    //   }

    

    <div className='profile-container'>
      {
        deleteCurrentUser &&
        <ConfirmationPopup
          title={'Delete User'}
          message={'Are you sure to proceed? This action cannot be undone.'}
          handleClose={() => setDeleteUser(null)}
          handleSubmit={() => handleDelete(user.id)}
        />
      }
      <Row className="mb-8  align-items-center justify-content-center">
        <Col xl={2} lg={4} md={12} xs={12}>
              <div className="mb-4 mb-lg-0">
                <h4 className="mb-1">General Setting</h4>
              </div>
            </Col>
            <Col xl={6} lg={8} md={12} xs={12}>
              {/* card */}
              <Card id="edit">
                {/* card body */}
                <Card.Body>
                <div className="mb-6 profileHeader">
                    <h4 className="mb-1">Username</h4>
                    <div>
                        <h4 className="mb-1">{user.username}</h4>
                    </div>
                  </div>
                  <Form autoComplete="off" onSubmit={handleUsernameEdit} className="profileForm">
                    {/* New email */}
                    <Row className="mb-3">
                   
                      <Form.Label className="col-sm-4" htmlFor="newEmailAddress">New Username</Form.Label>
                      <Col md={8} xs={12}>
                        <Form.Control type="text" placeholder="Enter your new username" id="newUsername" 
                             value={username} onChange={(e) => setUsername(e.target.value)}  required/>
                      </Col>
                      <Col  md={{ offset: 4, span: 8 }} xs={12}> 
                        {usernameError && <div className='error'> {usernameError}</div>}
                      </Col>
                      <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-3">
                        <Button variant="primary" type="submit">
                          Save Changes
                        </Button>
                      </Col>
                    </Row>
                  </Form>

                  <div className="mb-6 profileHeader">
                    <h4 className="mb-1">Email</h4>
                    <div>
                        <h4 className="mb-1">{user.email}</h4>
                    </div>
                  </div>
                  <Form autoComplete="off" onSubmit={handleEmailEdit} className="profileForm">
                    {/* New email */}
                    <Row className="mb-3">
                      <Form.Label className="col-sm-4" htmlFor="newEmailAddress">New email</Form.Label>
                      <Col md={8} xs={12}>
                        <Form.Control type="email" placeholder="Enter your new email address" id="newEmailAddress" 
                          value={email}  onChange={(e) => setEmail(e.target.value)} required />
                      </Col>
                      <Col  md={{ offset: 4, span: 8 }} xs={12}> 
                        { emailError && <div className='error'> {emailError}</div>}
                      </Col>
                      <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-3">
                        <Button variant="primary" type="submit">
                          Save Changes
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  <div className="mb-6 mt-6">
                    <h4 className="mb-1">Change your password</h4>
                  </div>
                  <Form autoComplete="off" onSubmit={handleChangePw} className="profileForm">
                    {/* Current password */}
                    <Row className="mb-3">
                      <Form.Label className="col-sm-4" htmlFor="currentPassword">Current password</Form.Label>
                      <Col md={8} xs={12}>
                        <Form.Control type="password" placeholder="Enter Current password" id="currentPassword"  autoComplete="current-password" 
                         value={password} onChange={(e) => checkPassword(e.target.value)} required />
                      </Col>
                    </Row>

                    {/* New password */}
                    <Row className="mb-3">
                      <Form.Label className="col-sm-4" htmlFor="newPassword">New password</Form.Label>
                      <Col md={8} xs={12}>
                        <Form.Control type="password" placeholder="Enter New password" id="newPassword"  autoComplete="new-password" 
                                 value={newPassword}   onChange={(e) => setNewPassword(e.target.value)} required />
                      </Col>
                    </Row>

                    {/* Confirm new password */}
                    <Row className="align-items-center">
                      <Form.Label className="col-sm-4" htmlFor="confirmNewpassword">Confirm new password</Form.Label>
                      <Col md={8} xs={12}>
                        <Form.Control type="password" placeholder="Confirm new password" id="confirmNewpassword" autoComplete="new-password" 
                                value={confirmNewPasword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
                      </Col>
                      {/* list */}
                      <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                       { passwordError && <div className='error'> {passwordError} </div>}
                      </Col>
                      <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                        <h6 className="mb-1">Password requirements:</h6>
                        <p>Ensure that these requirements are met:</p>
                        <ul>
                          <li> Minimum 8 characters long</li>
                          <li>At least one lowercase character and one uppercase character</li>
                          <li>At least one number and symbol
                          </li>
                        </ul>
                        <Button variant="primary" type="submit">
                          Save Changes
                        </Button>
                      </Col>
                    </Row>
                    
                  </Form>

                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-8 mt-5 align-items-center justify-content-center">
          <Col xl={2} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h4 className="mb-1">Delete Account</h4>
            </div>
          </Col>
          <Col xl={6} lg={8} md={12} xs={12}>
            <Card className="mb-6">
              <Card.Body>
                <div className="mb-6">
                  <h4 className="mb-1">Danger Zone </h4>
                </div>
                <div>
                  <p>WARNING! This will permanently delete your account.</p>
                  <Button className="btn btn-danger" onClick={() => showDeleteConfirmation(user.id)}>Delete Account</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
          
    </div>

    



  )
}

export default Profile