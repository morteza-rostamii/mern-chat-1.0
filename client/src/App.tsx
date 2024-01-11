import { useEffect, useRef, useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@chakra-ui/react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import DefaultLayout from './layouts/DefaultLayout'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import api from './routes/api'
import useAuthStore from './stores/auth.store'
import { DASHBOARD_ROUTE, DEVELOPMENT, EVENT_ONLINE_CLIENTS, LOGIN_ROUTE, REGISTER_ROUTE, SEND_MSG_TO_RECIPIENT, SERVER_SENT_MSG, USER } from './consts/const'
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
  const BASE = import.meta.env.VITE_NODE_ENV === DEVELOPMENT ? import.meta.env.VITE_API_URL || 'http://localhost:3001/' : import.meta.env.VITE_API_URL_PRO;
  const CLIENT = import.meta.env.VITE_NODE_ENV === DEVELOPMENT ? 'http://localhost:3002' : import.meta.env.VITE_CLIENT_URL_PRO;
  const location = useLocation();

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
    if (!authUser) {
      if (socketRef?.current) {
        // once logged out => remove the socket
        socketRef.current.close();
        setSocket(null);
      }
      return;
    }

    if (socketRef.current) return;

    socketRef.current = io(BASE, {
      withCredentials: true,
      extraHeaders: {
        'Access-Control-Allow-Origin': CLIENT,
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
      console.log(`connected with id: ${socketRef.current.id} : ${authUser.id}`);


      // server received and created a new message to recipient
      /* socketRef.current.on(SERVER_SENT_MSG, (msg: any) => {
        console.log('******************************', msg);
      }); */
      // message to recipient
      socketRef.current.on(SEND_MSG_TO_RECIPIENT, (msg: any) => {
        console.log('---', msg)
        addMessageToChatAct(msg.msg);
      });
  
      socketRef.current.on(EVENT_ONLINE_CLIENTS, ((data: any) => {
        console.log('online clients:: ', data.onlines);
        setOnlineClients(data.onlines);
      }));
    });

    //socket.open();
    //return () => socket.close();
  }, [location, authUser]);

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
