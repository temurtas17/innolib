import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(null);

  const updateUser = (users) => {
    setUsers(users);
  };

  return (
    <UserContext.Provider value={{ users, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};