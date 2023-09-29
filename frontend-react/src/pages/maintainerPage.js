import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { useUserContext } from "../hooks/useUserContext"
import { useMaintainerContext } from "../hooks/useMaintainerContext"
import { getAllQuestions, deleteQuestion, patch, post, updateUser, getAllUsers } from '../apis/UserProfileApi';
import UserList from "../components/user/UserList"

const MaintainerPage = () => {
  const { user, dispatch } = useUserContext()
  const { userList, dispatch: userListDispatch } = useMaintainerContext()
  const [ error, setError ] = useState('')
  const [refetchUsers, setRefetchUsers] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user) {
        setError('Please login to view users')  
        return
      }
      const response = await getAllUsers()
      const json = await response.json()
      console.log(response)

      if (response.ok) {
        userListDispatch({ type: 'GET_ALL_USERS', payload: json })
      }
    }

    fetchUsers()
  }, [refetchUsers])

  const handleRoleChange = async (user, newRole) => {
    if (newRole === '') {
      setError('Invalid role')
      return
    }
    const updatedUser = {
      username: user.username,
      email: user.email,
      password : user.password,
      role: newRole
    }
    console.log(updatedUser)
    const response = await updateUser(user._id, updatedUser)
    const json = await response.json()
    if (response.ok) {
      // userListDispatch({ type : 'UPDATE_ROLE'})
      setError('')
      setRefetchUsers(prevState => !prevState); 
    }
    if (!response.ok) {
      setError(json.error)
    }
  };

  return (
    <div className="container mt-5">
    <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
            <h2>Maintainer's Dashboard</h2>
        </div>
        <div className="card-body">
            <UserList users={userList} onRoleChange={handleRoleChange} />
        </div>
    </div>
</div>
);
}

export default MaintainerPage