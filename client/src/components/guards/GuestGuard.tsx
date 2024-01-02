import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { DASHBOARD_ROUTE, SIGNUP, USER } from '../../consts/const';

const GuestGuard = () => {
  const authUser = localStorage.getItem(USER);

  if (authUser) return <Navigate to={DASHBOARD_ROUTE}/>

  return (
    <>
      <Outlet/>
    </>
  )
}

export default GuestGuard