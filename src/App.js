import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/Main';
import Login from './components/auth/LoginComponent';
import useToken from './components/auth/useToken';

function App() {
  const { username, isAdmin, setUser } = useToken();

  if(!username) {
    return <Login setUser={setUser} />
  }

  return (
    <BrowserRouter>
      <Main isAdmin={isAdmin} username={username} setUser={setUser} />
    </BrowserRouter>
  )
}
export default App;
