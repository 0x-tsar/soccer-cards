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
    "0xd2a70AE3B0bb0ba7cEF5C095Fe46cF5eE1935451",
    Soccer.abi,
    signer
  );

  //value paid 0.0000001
  // %5 percent of value paid goes to the card creator
  // 4746366562936166654
  // 4746366567936166654

  const balance = await provider.getBalance(account);

  return { provider, balance, account, soccerContract, signer };
};
