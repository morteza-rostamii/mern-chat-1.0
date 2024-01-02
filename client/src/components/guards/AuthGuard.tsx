import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { REGISTER_ROUTE, USER } from '../../consts/const';

const AuthGuard = () => {
  const authUser = localStorage.getItem(USER);

  if (!authUser) return <Navigate to={REGISTER_ROUTE}/>

  return (
    <>
      <Outlet/>
    </>
  )
}

export default AuthGuard