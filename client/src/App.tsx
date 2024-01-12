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
import { DASHBOARD_ROUTE, DEVELOPMENT, LOGIN_ROUTE, NEW_MSG, REGISTER_ROUTE, SOCKET_URL, USER } from './consts/const'
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
  
  const CLIENT = import.meta.env.VITE_NODE_ENV === DEVELOPMENT ? 'http://localhost:3002' : import.meta.env.VITE_CLIENT_URL_PRO;
  const location = useLocation();

  //const socket_url = import.meta.env.SOCKET_URL || 'ws://localhost:8080';

  const socketRef: any = useRef(null);

  function handNewMessage(event: any): void {
    //console.log(event.data);
    const dataStr: string = event.data;
    const data: any = JSON.parse(dataStr);
    console.log(data);

    // set online clients
    if ('onlines' in data) setOnlineClients(data.onlines);

    // get new message to recipient
    if ('message' in data) {
      console.log('recipient message: ', data);
      addMessageToChatAct(data.message);
    } 
  }

  useEffect(() => {
    setAuthUser(localStorage.getItem(USER) ? JSON.parse(localStorage.getItem(USER) as string) : null)

    async function checkTokenExpiry() {
      api.checkExpiry();
    }

    checkTokenExpiry();
  }, []);

  useEffect(() => {

    // if: not authUser and there is a socket -: remove socket
    /* if (!authUser) {
      if (socketRef.current) {
        socketRef.current.close();
        setSocket(null);
      }

      return;
    } */

    if (socketRef?.current) return;

    socketRef.current = new WebSocket(SOCKET_URL);
    setSocket(socketRef.current);

    console.log(socketRef.current);

    //return () => socketRef.current.close();
  }, [location, authUser]);

  useEffect(() => {
    if (socketio) {
      console.log(authUser.id);
      // name has to be message
      socketio.addEventListener('open', () => {
        console.log('connection is open!!');

        // message to: SERVER
        socketRef.current.send(JSON.stringify({msg: 'hello from client'}));
      });

      // message from: SERVER
      socketRef.current.addEventListener('message', handNewMessage);
    
      socketio.addEventListener('error', (error: any) => {
        console.error('WebSocket Error:', error?.message || error);
        // Your code for handling errors
      });

      socketio.addEventListener('close', (event: any) => {
        console.log('WebSocket Connection is closed:', event.code, event.reason);
        // Your code for handling connection closure
      });
    }
  }, [socketio]);

  /* useEffect(() => {
    setSocket(socketRef.current);
  }, [socketRef.current]);
 */
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
