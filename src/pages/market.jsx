import axios from "axios";
import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { AuthContext } from "../context/contexto";
import { connectEthereum } from "../ethereum";

export const Container = styled.div`
  grid-area: main;
  background-color: #31373f;
  /* height: 100vh calc(100vh - 70px); */
  height: fit-content;
  min-height: calc(100vh - 70px);

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
`;

export default function Market() {
  const { contractCards, setContractCards } = useContext(AuthContext);
  const [plusData, setPlusData] = useState([]);

  useEffect(() => {
    const done = async () => {
      setContractCards([]);
      const { account, soccerContract } = await connectEthereum();

      const val = Number(ethers.utils.parseUnits("0.0000001", "ether"));

      const balance = Number(
        await soccerContract.balanceOf(soccerContract.address)
      );

      // console.log(`balance: ${balance}`);
      // console.log(`total balance: ${balance}`);
      // console.log(account);
      // function tokenOfOwnerByIndex(address owner, uint256 index) public view virtual override returns (uint256) {
      // function tokenByIndex(uint256 index) public view virtual override returns (uint256) {

      for (let i = 0; i < balance; i++) {
        const tokenRealId = Number(
          await soccerContract.tokenOfOwnerByIndex(soccerContract.address, i)
        );

        // console.log(`tokenByIndex: ${tokenRealId}`);

        // const token = Number(await soccerContract.tokenByIndex(tokenRealId));
        // console.log(`token: ${token}`);

        //   const balanceUser = await cards.methods.balanceOf(account).call();
        // console.log(`balance user: ${balanceUser}`);
        // for (let i = 0; i < balanceUser; i++) {
        //   const tokenId = await cards.methods
        //     .tokenOfOwnerByIndex(account, i)
        //     .call();
        //   const token = await cards.methods.tokenByIndex(tokenId).call();
        //   const item = await cards.methods.myCards(account, token).call();

        //   setContractCards((myCards) => [...myCards, item]);
        // }

        const tokenURI = await soccerContract.tokenURI(tokenRealId);

        const { data } = await axios.get(`${tokenURI}`);

        const cardInfo = await soccerContract.cards(tokenRealId);

        const key = Object.keys(cardInfo);
        const values = Object.values(cardInfo);

        //concatenating more data, json data + blockchain data
        for (let j = 6; j <= 11; j++) {
          data[key[j]] = values[j];
        }

        setContractCards((setContractCards) => [...setContractCards, data]);
      }
    };

    done();
  }, []);

  // useEffect(() => {
  //   const done = async () => {
  //     const { account, soccerContract, signer } = await connectEthereum();
  //     const val = Number(ethers.utils.parseUnits("0.0000001", "ether"));
  //   };
  //   done();
  // }, []);

  const buyCard = async (itemId) => {
    const { account, soccerContract } = await connectEthereum();
    const val = Number(ethers.utils.parseUnits("0.0000001", "ether"));

    console.log(`buy card!`);
    console.log(itemId);
    const tx = await soccerContract.buyCardFromMarket(itemId, {
      from: account,
      value: val,
    });

    console.log(tx);
  };

  return (
    <Container>
      {contractCards.map((item, key) => {
        return (
          <Card
            key={key}
            nft={item}
            buyCard={buyCard}
            fromPage={"market"}
          ></Card>
        );
      })}
    </Container>
  );
}
