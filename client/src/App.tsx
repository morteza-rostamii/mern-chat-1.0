import { useEffect, useRef, useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router'
import DefaultLayout from './layouts/DefaultLayout'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import api from './routes/api'
import useAuthStore from './stores/auth.store'
import { DASHBOARD_ROUTE, EVENT_ONLINE_CLIENTS, LOGIN_ROUTE, REGISTER_ROUTE, SERVER_SENT_MSG, USER } from './consts/const'
import useMsgStore from './stores/msgs.store'
import io from 'socket.io-client'
import useChatStore from './stores/chat.store'
import toast, { Toaster } from 'react-hot-toast';
import AuthGuard from './components/guards/AuthGuard'
import GuestGuard from './components/guards/GuestGuard'

function App() {
  const {authUser, setAuthUser, currRecipient, setOnlineClients} = useAuthStore();
  const {setSocket, socketio} = useMsgStore();
  const {addMessageToChatAct, } = useChatStore();

  //const socket_url = import.meta.env.SOCKET_URL || 'ws://localhost:8080';

  const socketRef: any = useRef(null);

  useEffect(() => {
    setAuthUser(localStorage.getItem(USER) ? JSON.parse(localStorage.getItem(USER) as string) : null)

    async function checkTokenExpiry() {
      api.checkExpiry();
    }

    checkTokenExpiry();
  }, []);

  useEffect(() => {
    // socket.io
    if (!authUser) return () => {}; 

    if (socketRef.current) return;

    console.log('opening socket.............')
    socketRef.current = io('http://localhost:3000', {
      withCredentials: true,
      extraHeaders: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
      },
      auth: {
        userId: authUser.id,
      },
      transports : ['websocket'],
      //reconnection: false,
    });

    setSocket(socketRef.current);

    // connection is on
    socketRef.current.on('connect', () => {
      console.log(`connected with id: ${socketRef.current.id}`);

      // send a custom event
      /* socket.emit('msg-sent', {
        msg: `hello from user: ${socket.id}`,
      }); */

      /* socket.emit('msg-private-sent', {
        msg: 'my first message!',
        recipientId: currRecipient.id,
      }); */

      // listen for server event
      socketRef.current.on('server-msg-sent', ({msg}: any) => {
        console.log(msg);
      });

      socketRef.current.on('msg-received', ({msg}: any) => {
        console.log(msg);
    
      });

      // on server shut down -> not working!!
      /* socketRef.current.on('disconnect', () => {
        console.log('Disconnected from the server');
        // Add your logic to handle disconnection here (e.g., showing a message)
        socketRef.current.disconnect();
      }); */

      // server received and created a new message to recipient
      socketRef.current.on(SERVER_SENT_MSG, (msg: any) => {
        console.log('******************************', msg);
      });
    });

    // message to recipient
    socketRef.current.on('msg', (msg: any) => {
      console.log('---', msg)
      addMessageToChatAct(msg.msg);
    });

    socketRef.current.on(EVENT_ONLINE_CLIENTS, ((data: any) => {
      console.log('online clients:: ', data.onlines);
      setOnlineClients(data.onlines);
    }));

    /* socketRef.current.on('love', (data: any) => {
      console.log(data);
    }) */
    
    //socketRef.current.disconnect();

    //socket.open();
    
    

    //return () => socket.close();
  }, []);

  useEffect(() => {
    setSocket(socketRef.current);
  }, [socketRef.current]);

  return (
    <>
    
    <Routes>
      <Route element={<DefaultLayout/>}>

        <Route element={<AuthGuard/>}>
          <Route 
          path='/'
          element={authUser ? <Navigate to={'/dashboard'}/> : <Navigate to={'/register'}/>}        
          >
          </Route>

          <Route path={DASHBOARD_ROUTE} element={<Dashboard/>}>
          </Route>  
        </Route>
      </Route>

      <Route element={<GuestGuard/>}>
        <Route path={REGISTER_ROUTE} element={<Register/>}></Route>
        
        {/* /login : magic-link comes here */}
        <Route path={LOGIN_ROUTE} element={<Login/>}></Route>
      </Route>

    </Routes>
    <Toaster />
    </>
  )
}

export default App
