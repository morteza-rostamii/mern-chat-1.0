import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Tooltip } from '@chakra-ui/react'
import { TSideTabStates } from '../../../types/types'
import {motion} from 'framer-motion'

type TSideNavItemProps = {
  handTabChange: (state: TSideTabStates) => void,
  active: boolean,
  icon: any,
  tip: TSideTabStates,
}

const SideNavItem = ({
  handTabChange,
  active,
  icon,
  tip,
}: TSideNavItemProps) => {
  const [hover, setHover] = useState(false);

  return (
    <Tooltip 
    hasArrow 
    label={tip} 
    bg='gray.300' 
    color='black'
    placement='right'
    >
      <div
      className={`
      ${active ? 'text-sky-500 border-r-2 border-r-sky-500' : ''}
      flex items-center justify-center cursor-pointer
      bg-gray-50 w-full #border-white p-4
      hover:bg-gray-100
      `}
      style={{
        transition: 'all .3s'
      }}
      onClick={() => handTabChange(tip)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      >
        <motion.div
        initial={{
          scale: 1,
        }}
        animate={{
          scale: hover ? 1.2 : 1,
        }}
        >
        {icon}
        </motion.div>
      </div>
    </Tooltip>
  )
}

export default SideNavItem