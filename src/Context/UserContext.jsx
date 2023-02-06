import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

function UserProvider({children}) {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('blogUser')) || {});
  const [data, setData] = useState(JSON.parse(localStorage.getItem('blogData')) || []);
  

  function loginUser(payload) {
    localStorage.setItem('blogUser', JSON.stringify({...payload}))
    setCurrentUser({...payload})
  }

  function updateData(data) {
    localStorage.setItem('blogData', JSON.stringify([data]))
    setData([data])
  }

  return (
    <UserContext.Provider value={{currentUser, data, loginUser, updateData}}>
      {children}
    </UserContext.Provider>
  )
}

export{ UserProvider, UserContext }