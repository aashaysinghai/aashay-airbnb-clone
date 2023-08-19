import { createContext, useEffect } from "react";
export const UserContext = createContext({});
import { useState } from "react";
import axios from "axios";

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios.get("/auth/profile").then((resp) => {
        setUser(resp.data);
        setReady(true);
      });
    }
  });
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
