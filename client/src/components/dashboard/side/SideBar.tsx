import { Avatar, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import SideNavItem from './SideNavItem';
import getOneImage from '../../../utils/getImage';
import { TSideTabStates } from '../../../types/types';
import { CHATS, FRIENDS, PROFILE, SEARCH } from '../../../consts/const';
import Chats from './Chats';
import Profile from './Profile';
import { HiOutlineUserAdd } from "react-icons/hi";
import Friends from './Friends';
import ProfilePop from './ProfilePop';
import Search from './Search';
import { HiOutlineSearch } from "react-icons/hi";

type TSideBarProps = {
  sideOpen: boolean,
  closeSide: () => void, 
  openSide: () => void, 
};

const SideBar = ({
  sideOpen,
  closeSide,
  openSide,
}: TSideBarProps) => {
  const [sideTabState, setSideTabState] = useState<TSideTabStates>(CHATS);

  const handTabChange:any = (state: TSideTabStates) => {
    setSideTabState(state);
    openSide();
  }

 /*  useEffect(() => {
    console.log(sideTabState)
  }, [sideTabState]) */
  return (
    <aside
    className='
    flex min-h-full
    bg-slate-100
    '

    style={{
      //flexGrow: sideOpen ? .6 : 0,
      flexGrow: 0,
      //flexShrink: 1,
      flexShrink: 0,
      //flexBasis: 0,
      flexBasis: sideOpen ? '40%' : 0,
      transition: 'all .3s',
    }}
    >
      
      {/* icons */}
      <div
      className='
      flex flex-col gap-3 items-center justify-between
      bg-slate-50 text-gray-500 h-full w-auto flex-auto self-auto font-bold
      #p-4
      '

      style={{
        flexGrow: 0,
      }}
      >
        {/* top */}
        <div>
          <Link 
          className='block p-4 #bg-red-50'
          to={'/'}>
          <FaInstagram size={32}/>
          </Link>

          <nav
          className='
          flex flex-col gap-3 #p-4
          '
          >
            <SideNavItem 
            active={sideTabState === PROFILE ? true : false}
            tip={PROFILE}
            icon={<HiOutlineUser size={28}/>}
            
            handTabChange={handTabChange}
            />
            <SideNavItem 
            active={sideTabState === CHATS ? true : false}
            tip={CHATS}
            icon={<HiOutlineChatAlt2 size={28}/>}
            handTabChange={handTabChange}
            />
            {/* <SideNavItem 
            active={sideTabState === FRIENDS ? true : false}
            tip={FRIENDS}
            icon={<HiOutlineUserAdd size={28}/>}
            handTabChange={handTabChange}
            /> */}

            <SideNavItem 
            active={sideTabState === SEARCH ? true : false}
            tip={SEARCH}
            icon={<HiOutlineSearch size={28}/>}
            handTabChange={handTabChange}
            />
          </nav>
        </div>

        {/* bottom */}
        <div
        className='
        p-2
        '
        >

          <ProfilePop/>
        </div>
      </div>
      
      {/* sections */}
      <section 
      className='
      flex-1
      '

      style={{
        display: sideOpen ? 'flex' : 'none',
        transition: 'all .3s'
      }}
      >
        {!!(sideTabState === PROFILE) && (
          <Profile/>
        )}
        {!!(sideTabState === CHATS) && (
          <Chats/>
        )}
        {/* {!!(sideTabState === FRIENDS) && (
        <Friends/>
        )} */}
        {!!(sideTabState === SEARCH) && (
        <Search/>
        )}
      </section>
      
    </aside>
  )
}

export default SideBar

{/* <Button
      variant={'outline'}
      colorScheme='red'

      onClick={closeSide}
      >
        close
      </Button> */}