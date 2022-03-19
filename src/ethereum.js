import { ethers } from "ethers";
import Soccer from "./artifacts/contracts/Soccer.sol/Soccer.json";

export const connectEthereum = async () => {
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const soccerContract = new ethers.Contract(
    "0x5f4709Ae93ccda191fc7d7DE7dC4BBedAeF4aF30",
    Soccer.abi,
    signer
  );

  const balance = await provider.getBalance(account);

  return { provider, balance, account, soccerContract, signer };
};
