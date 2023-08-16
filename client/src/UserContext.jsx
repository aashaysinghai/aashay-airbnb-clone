import { createContext } from "react";
const UserContext = createContext({});
import { useState } from "react";

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
