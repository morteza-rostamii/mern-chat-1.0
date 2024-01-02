import React, { useEffect, useState } from 'react'
import Chat from './Chat'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import LoadScreen from '../../LoadScreen'
import FriendCard from './FriendCard'
import FriendRequestCard from './FriendRequestCard'

const FriendsTab = () => {
  const [loading, setLoading] = useState(true);

  function handTestLoading() {
    setLoading(true);
    setLoadDelay();
  }

  function setLoadDelay() {
    const unsub = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return unsub;
  }

  useEffect(() => {

    const unsub = setLoadDelay();

    return () => clearTimeout(unsub);
  }, []);

  return (
    <Tabs
    height={'100%'}
    onChange={() => handTestLoading()}
    >
      <TabList>
        <Tab>Friends</Tab>
        <Tab>Requests</Tab>
      </TabList>

      <div
      className='
      relative h-full 
      '
      >
        <TabPanels>
          <TabPanel
          display={'flex'}
          gap={'10px'}
          flexDir={'column'}
          >
          {
            Array.from(new Array(4)).map((el:any, i:number) => (
              <FriendCard
              key={i}
              />
            ))
          }
          </TabPanel>
          <TabPanel
          display={'flex'}
          gap={'10px'}
          flexDir={'column'}
          >
          {
            Array.from(new Array(2)).map((el:any, i:number) => (
              <FriendRequestCard
              key={i}
              />
            ))
          }
          </TabPanel>
        </TabPanels>

        {/* overlay load */}
        { !!loading && <LoadScreen/> }
      </div>
    </Tabs>
  )
}

export default FriendsTab