import './App.css';
import Chat from './components/Chat';
import SignIn from './components/SignIn';
import React from 'react';
// import {useAuthState} from 'react-firebase-hooks'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from './firebase';
// import { auth } from './firebase.js';


function App() {
  const [user] = useAuthState(auth)
  return (
    <>
      {user ? <Chat /> : <SignIn />}
    </>
  );
}

export default App;
