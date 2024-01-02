import React, { useState } from 'react'
import SideBar from '../components/dashboard/side/SideBar'
import Main from '../components/dashboard/main/Main'

const Dashboard = () => {
  const [sideOpen, setSideOpen] = useState(true);
  
  const toggleSide = () => setSideOpen((c:any) => !c); 

  const closeSide = () => setSideOpen(false);
  const openSide = () => setSideOpen(true);

  return (
    <div
    className='
    relative h-full 
    flex
    '
    >
      <SideBar
      sideOpen={sideOpen}
      closeSide={closeSide}
      openSide={openSide}
      />
      <Main
      toggleSide={toggleSide}
      />
    </div>
  )
}

export default Dashboard