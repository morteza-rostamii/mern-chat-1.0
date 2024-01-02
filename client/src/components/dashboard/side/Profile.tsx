import { Avatar, IconButton, Image } from '@chakra-ui/react'
import React from 'react'
import getOneImage from '../../../utils/getImage'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AnimatePresence, motion } from 'framer-motion';
import useAuthStore from '../../../stores/auth.store';

const Profile = () => {
  const {authUser,} = useAuthStore();

  return (
    <AnimatePresence>
      <motion.div
      className='
      #p-4 w-full #bg-red-50
      '

      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: .5,
      }}
      >
        {/* top image */}
        <div
        className='
        relative max-h-40 overflow-hidden w-full
        min-h-28 bg-white
        '
        >
          <Image
          className='
          w-full object-cover object-center
          '
          src={getOneImage()}
          alt='profile'
          />

          {/* overlay */}
          <div
          className='
          absolute top-3 left-0 right-2
          flex items-center justify-end
          #bg-red-50 p-2
          '
          >
            <IconButton
            aria-label=''
            variant={'solid'}
            isRound={true}
            icon={<HiOutlineDotsVertical size={24}/>}
            >
            </IconButton>
          </div>
        </div>

        {/* avatar */}
        <div
        className=''
        >

          <Avatar
          className='
          -mt-14 z-10 border-2 border-solid cursor-pointer
          mb-4
          '
          src={getOneImage('lightblue')}
          size={'xl'}
          borderColor={'blue.300'}
          />

          <h2
          className='
          font-bold text-lg text-gray-700 capitalize
          '
          >
            {authUser.username}
          </h2>
          <p
          className='
          text-gray-600
          '
          >
            user's bio...
          </p>
        </div>
        
      </motion.div>
    </AnimatePresence>
  )
}

export default Profile