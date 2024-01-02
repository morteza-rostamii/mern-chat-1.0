import { Button, IconButton, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import React, { useState } from 'react'
import { HiOutlinePlusSm } from "react-icons/hi";
import MessagesTab from './MessagesTab';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineSearch } from "react-icons/hi";
import useAuthStore from '../../../stores/auth.store';
import api from '../../../routes/api';
import SearchItem from './SearchItem';
import LoadScreen from '../../LoadScreen';

const Search = () => {
  const {authUser, users, searchUsersAct} = useAuthStore();
  const [searchedName, setSearchedName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handSearch(e: any) {
    e.preventDefault();

    setLoading(true);

    await searchUsersAct({
      authUserId: authUser.id,
      username: searchedName,
    });

    setLoading(false);
  }

  return (
    <AnimatePresence>
      <motion.div
      className='
      relative
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
          Search
          </h2>

          {/* <IconButton
          aria-label=''
          color={'black'}
          variant={'outline'}
          isRound={true}
          icon={<HiOutlinePlusSm size={24}/>}
          >
          </IconButton> */}
        </div>

        <div>
          <form 
          onSubmit={(e:any) => handSearch(e)}
          >
          <InputGroup>
            <Input 
            type='search' 
            placeholder='search for friends' 
            
            value={searchedName}
            onChange={(e:any) => setSearchedName(e.target.value)}
            />
            <Button
            
            onClick={handSearch}
            >
              <HiOutlineSearch size={24}/>
            </Button>
          </InputGroup>
          </form>

          <ul
          className='
          flex flex-col gap-4 pt-4 overflow-y-auto 
          '
          >
            {
              users && users.length
              ?(
                users.map((el:any,) => (
                  <SearchItem
                  key={el.id}
                  user={el}
                  setLoading={setLoading}
                  searchedName={searchedName}
                  />
                ))
              ): (
                <div
                className='
                mt-20 text-xl p-4 bg-white rounded-md text-gray-600
                '
                >
                  nothing to show!
                </div>
              )
            }
          </ul>
        </div>

        { !!loading && <LoadScreen/> }
      </motion.div>
    </AnimatePresence>
  )
}

export default Search