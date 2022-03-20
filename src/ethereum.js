import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Soccer from "./artifacts/contracts/Soccer.sol/Soccer.json";

export const connectEthereum = async () => {
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const soccerContract = new ethers.Contract(
    "0xBfC2570dE08ab45614252e9863548DFBcC499454",
    Soccer.abi,
    signer
  );

  const balance = await provider.getBalance(account);

  return { provider, balance, account, soccerContract, signer };
};
