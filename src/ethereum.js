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
    "0x7d2DF792509A2D9f9ef9A247924FDd288D156810",
    Soccer.abi,
    signer
  );

  const balance = await provider.getBalance(account);

  return { provider, balance, account, soccerContract, signer };
};
