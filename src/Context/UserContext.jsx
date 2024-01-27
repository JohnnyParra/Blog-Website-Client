// Libraries
import React, { createContext, useState } from "react";

// Api Services
import { clearJwt } from "../ApiServices/JwtService";

const UserContext = createContext();

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("blogUser")) || {}
  );
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("blogData")) || []
  );

  function loginUser(payload) {
    localStorage.setItem("blogUser", JSON.stringify({ ...payload }));
    setCurrentUser({ ...payload });
  }

  function updateData(data) {
    localStorage.setItem("blogData", JSON.stringify([data]));
    setData([data]);
  }

  function logoutUser() {
    localStorage.removeItem("blogUser");
    localStorage.removeItem("blogData");
    clearJwt();
  }

  return (
    <UserContext.Provider
      value={{ currentUser, data, loginUser, updateData, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
