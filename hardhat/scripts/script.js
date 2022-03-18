require("dotenv").config();
const { ethers } = require("ethers");
const hh = require("hardhat");
const SoccerContract = require("../artifacts/contracts/Soccer.sol/Soccer.json");

async function main() {
  // const SoccerContract = await hh.ethers.getContractFactory("Soccer");

  // const soccerContract = await SoccerContract.deploy();
  // await soccerContract.deployed();
  // console.log("Soccer Contract deployed to:", soccerContract.address);

  const provider = new ethers.providers.getDefaultProvider(process.env.mumbai);
  const signer = new ethers.Wallet(process.env.account, provider);

  const soccerContract = new ethers.Contract(
    "0xC8EA39aec9D50a04cc7d57644cebD5Ab8135effF",
    SoccerContract.abi,
    signer
  );

  console.log(await soccerContract);

  // const tx1 = await soccerContract.mint(
  //   "https://gateway.pinata.cloud/ipfs/QmaAKjJKhwUgwBnNfyyEFn2uFnYrHFjQfyrfufczKpJ6gk/hernanes.json"
  // );

  // console.log(tx1);
  // const tx2 = await soccerContract.mint(
  //   "https://gateway.pinata.cloud/ipfs/QmaAKjJKhwUgwBnNfyyEFn2uFnYrHFjQfyrfufczKpJ6gk/luciano.json"
  // );
  // console.log(tx2);

  // const tx3 = await soccerContract.mint(
  //   "https://gateway.pinata.cloud/ipfs/QmaAKjJKhwUgwBnNfyyEFn2uFnYrHFjQfyrfufczKpJ6gk/reinaldo.json"
  // );
  // console.log(tx3);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
