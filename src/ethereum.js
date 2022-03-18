import { ethers } from "ethers";
import Soccer from "./artifacts/contracts/Soccer.sol/Soccer.json";

export const connectEthereum = async () => {
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const soccerContract = new ethers.Contract(
    "0xC8EA39aec9D50a04cc7d57644cebD5Ab8135effF",
    Soccer.abi,
    signer
  );

  const balance = await provider.getBalance(account);

  return { provider, balance, account, soccerContract };
};
