import { Button, IconButton, Portal } from '@chakra-ui/react'
import React from 'react'
import { BsFillEmojiHeartEyesFill } from 'react-icons/bs'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react'
import EmojiPicker from 'emoji-picker-react'

const EmojiPopup = ({
  setFormData,
}: any) => {

  function handEmojiPick(emojiObj: any) {
    setFormData((c:any) => ({
      ...c, 
      emoji: emojiObj.emoji,
    }))
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <IconButton
          aria-label=''
          icon={<BsFillEmojiHeartEyesFill size={24} color={'gold'}/>}
          variant={'ghost'}
          isRound={true}
          >
          </IconButton>
        </PopoverTrigger>
        <Portal>
          <PopoverContent
          width={'auto'}
          maxWidth={'auto'}
          minWidth={'auto'}
          bgColor={'transparent'}
          //height={0}
          //overflow={'auto'}
          border={'none'}
          shadow={'none'}
          >
            {/* <PopoverArrow /> */}
            {/* <PopoverHeader>Header</PopoverHeader>
            <PopoverCloseButton /> */}
            <PopoverBody
            //overflow={'hidden'}
            width={'auto'}
            maxWidth={'auto'}
            minWidth={'auto'}
            >
              <EmojiPicker
              onEmojiClick={(e:any) => handEmojiPick(e)}
              />
            </PopoverBody>
            {/* <PopoverFooter>This is the footer</PopoverFooter> */}
          </PopoverContent>
        </Portal>
      </Popover>
    </div>
  )
}

export default EmojiPopup