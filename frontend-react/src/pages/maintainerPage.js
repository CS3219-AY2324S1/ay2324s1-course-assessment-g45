import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { useUserContext } from "../hooks/useUserContext"
import { useMaintainerContext } from "../hooks/useMaintainerContext"
import { getAllQuestions, deleteQuestion, patch, post, updateUser, getAllUsers } from '../apis/UserProfileApi';
import UserList from "../components/user/UserList"


const MaintainerPage = () => {
  const { user, dispatch } = useUserContext()
  const { userList, dispatch: userListDispatch } = useMaintainerContext()
  const [error, setError] = useState('')
  const [refetchUsers, setRefetchUsers] = useState(false);
  const navigate = useNavigate()


  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [startingPageNumber, setStartingPageNumber] = useState(1);
  const MAX_PAGE_NUMS = 4;
  const usersPerPage = 8;
  const totalPages = userList ? Math.ceil(userList.length / usersPerPage) : 0;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userList ? userList.slice(indexOfFirstUser, indexOfLastUser) : [];

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user) {
        setError('Please login to view users')
        return
      }
      const response = await getAllUsers(user.token)
      const json = await response.json()
      console.log(response)

      if (response.ok) {
        userListDispatch({ type: 'GET_ALL_USERS', payload: json })
      }
    }

    fetchUsers()
  }, [refetchUsers])

  const handleRoleChange = async (selectedUser, newRole) => {
    if (newRole === '') {
      setError('Invalid role')
      return
    }
    const updatedUser = {
      username: selectedUser.username,
      email: selectedUser.email,
      password : selectedUser.password,
      role: newRole
    }
    console.log(updatedUser)
    const response = await updateUser(user.token, selectedUser._id, updatedUser)
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

  const handleLeftClick = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
    if (currentPage === startingPageNumber) {
      setStartingPageNumber(prevStart => prevStart - 1);
    }
  };

  const handleRightClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
    if (currentPage === startingPageNumber + MAX_PAGE_NUMS - 1) {
      setStartingPageNumber(prevStart => prevStart + 1);
    }
  };

  const renderPageNumbers = [];
  for (let i = startingPageNumber; i < startingPageNumber + MAX_PAGE_NUMS; i++) {
    if (i > totalPages) break;
    renderPageNumbers.push(
      <span
        key={i}
        className={`page-number ${currentPage === i ? 'active' : ''}`}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </span>
    );
  }

  const showLeftArrow = startingPageNumber > 1;
  const showRightArrow = startingPageNumber + MAX_PAGE_NUMS - 1 < totalPages;

  return (
    <div className="container mt-3 mb-3">
      <div className="card shadow-lg">
        <div className="card-header">
          <h2>Maintainer's Dashboard</h2>
        </div>
        <div className="card-body">
          <UserList users={currentUsers} onRoleChange={handleRoleChange} />
          <div className="pagination-wrapper">
            {showLeftArrow && <button className="pagination-arrow" onClick={handleLeftClick}>←</button>}
            {renderPageNumbers}
            {showRightArrow && <button className="pagination-arrow" onClick={handleRightClick}>→</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaintainerPage