import { useState } from 'react';

export default function useToken() {
  const [username, setUsernameToken] = useState(JSON.parse(sessionStorage.getItem('userData'))?.username);
  const [isAdmin, setIsAdminToken] = useState(JSON.parse(sessionStorage.getItem('userData'))?.isAdmin);

  const saveUserToken = userData => {
    sessionStorage.setItem('userData', JSON.stringify(userData));
    setUsernameToken(userData.username);
    setIsAdminToken(userData.isAdmin);
  };

  return {
    setUser: saveUserToken,
    username,
    isAdmin
  }
}