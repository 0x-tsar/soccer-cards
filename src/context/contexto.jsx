import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import { connectEthereum } from "../ethereum";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [myCards, setMyCards] = useState([]);
  const [contractCards, setContractCards] = useState([]);
  const [accountBalance, setAccountBalance] = useState("0");
  const [currentAccount, setCurrentAccount] = useState("0x0");

  useEffect(() => {
    const done = async () => {
      const { account, soccerContract, provider } = await connectEthereum();

      const balance = await provider.getBalance(account);

      setAccountBalance(Number(balance));

      soccerContract.on("cardSold", (ev) => {
        console.log(ev);
        console.log(`ev called!`);
        window.location.reload();
      });
    };
    done();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        myCards,
        setMyCards,
        contractCards,
        setContractCards,
        accountBalance,
        setAccountBalance,
        currentAccount,
        setCurrentAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
