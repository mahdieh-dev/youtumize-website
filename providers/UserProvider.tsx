import React, { createContext, useCallback, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export const UserContext = createContext({
  user: undefined,
  updateUser: (userData) => {},
  clearUser: () => {},
});

export const UserProvider = ({ children }) => {
  // toFix: fix the type later
  const [user, setUser] = useState<any>();
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    if (cookies["user"]) {
      updateUser(cookies["user"]);
    }
  }, [cookies]);

  const updateUser = useCallback((userData) => {
    setUser((prev) => (prev ? { ...prev, ...userData } : userData));
  }, []);

  const clearUser = useCallback(() => {
    setUser(undefined);
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
