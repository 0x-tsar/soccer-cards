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

      soccerContract.on("cardSold", async (data) => {
        console.log(data);
        console.log(`ev called!`);
        window.location.reload();
      });

      //on chain changed
      ethereum.on("chainChanged", (_chainId) => window.location.reload());

      //on accounts changed
      ethereum.on("accountsChanged", (accounts) => {
        // Handle the new accounts, or lack thereof.
        // "accounts" will always be an array, but it can be empty.
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
