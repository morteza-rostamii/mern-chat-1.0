import { IconButton } from '@chakra-ui/react'
import React from 'react'
import { HiOutlinePlusSm } from "react-icons/hi";
import MessagesTab from './MessagesTab';
import { AnimatePresence, motion } from 'framer-motion';
import FriendsTab from './FriendsTab';

const Friends = () => {
  return (
    <AnimatePresence>
      <motion.div
      className='
      flex flex-col gap-4
      #bg-red-50 h-full p-4 w-full
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
        {/* head */}
        <div
        className='
        flex items-center justify-between
        '
        >
          <h2
          className='
          text-lg font-bold
          '
          >
          Friends
          </h2>

          <IconButton
          aria-label=''
          color={'black'}
          variant={'outline'}
          isRound={true}
          icon={<HiOutlinePlusSm size={24}/>}
          >
          </IconButton>
        </div>

        {/* tab and lists */}
        <FriendsTab/>
      </motion.div>
    </AnimatePresence>
  )
}

export default Friends