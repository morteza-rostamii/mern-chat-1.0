import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { TFollowBtnStates } from '../../../types/types';
import { ADD, ADDED, PENDING } from '../../../consts/const';
import { HiOutlineUserAdd } from "react-icons/hi";
import {motion} from 'framer-motion'

const FollowBtn = () => {
  const [followState, setFollowState] = useState<TFollowBtnStates>(ADDED);
  const [hoverAdded, setHoverAdded] = useState(false);

  const handleHoverStart = () => setHoverAdded(true);
  const handleHoverEnd = () => setHoverAdded(false);

  return (
    <div
    className='
    inline-block relative overflow-hidden
    '
    onMouseEnter={handleHoverStart}
    onMouseLeave={handleHoverEnd}
    >
      <Button
      variant={'outline'}
      colorScheme='cyan'
      borderRadius={'9999px'}
      size={'sm'}
      >
        {(followState === ADD) ? <span>Add</span> : ''}
        {(followState === PENDING ? <span>Pending</span> : '')}
        {(followState === ADDED ? <span className='flex items-center gap-2'>Friend <HiOutlineUserAdd size={20} color={'lightgreen'}/></span> : '')}

      </Button>

      {/* overlay for unfollow */}
      <motion.div
      className='
      #bg-red-400
      '
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
        //background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        borderRadius: '9999px',
      }}

      initial={{ opacity: 0, y: '100%' }}
      animate={{ 
        opacity: hoverAdded ? 1 : 0, 
        y: hoverAdded ? 0 : '100%', 
      }}
      transition={{ 
        duration: 0.2, 
        //ease: 'easeInOut' 
      }}
      >
        <Button
        variant={'outline'}
        colorScheme='red'
        borderRadius={'9999px'}
        width={'100%'}
        size={'sm'}
        >
        Unfriend
        </Button>
      </motion.div>
    </div>
  )
}

export default FollowBtn