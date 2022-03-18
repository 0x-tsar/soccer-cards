import { ethers } from "ethers";
import Soccer from "./artifacts/contracts/Soccer.sol/Soccer.json";

export const connectEthereum = async () => {
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const soccerContract = new ethers.Contract(
    "0xFca0ef65bD3C02af5813bEe4267c1Baa6C38adF0",
    Soccer.abi,
    signer
  );

  const balance = await provider.getBalance(account);

  return { provider, balance, account, soccerContract };
};
