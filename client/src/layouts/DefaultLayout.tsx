import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'

const DefaultLayout = () => {
  return (
    <main
    className='
    #bg-red-50 h-screen container mx-auto
    '
    >
      {/* <Header/> */}
      <Outlet/>
    </main>
  )
}

export default DefaultLayout