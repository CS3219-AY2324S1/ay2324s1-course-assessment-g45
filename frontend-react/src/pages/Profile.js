import React, { useEffect, useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'

const Profile = () => {
  const { user, dispatch } = useUserContext()

  return (
    <div> {user} </div>
  )
}

export default Profile