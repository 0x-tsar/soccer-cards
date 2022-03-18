import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [myCards, setMyCards] = useState([]);
  const [contractCards, setContractCards] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        myCards,
        setMyCards,
        contractCards,
        setContractCards,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
