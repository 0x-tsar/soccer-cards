import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Card from "./Card";
import axios from "axios";
import { AuthContext } from "../context/contexto";
import { connectEthereum } from "../ethereum";
import { ethers } from "ethers";

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

const Main = () => {
  const { myCards, setMyCards } = useContext(AuthContext);

  useEffect(() => {
    const done = async () => {
      setMyCards([]);
      const { account, soccerContract, signer } = await connectEthereum();

      const val = Number(ethers.utils.parseUnits("0.0000001", "ether"));

      const balance = Number(await soccerContract.balanceOf(account));
      // console.log(`total balance: ${balance}`);
      // console.log(account);
      // function tokenOfOwnerByIndex(address owner, uint256 index) public view virtual override returns (uint256) {
      // function tokenByIndex(uint256 index) public view virtual override returns (uint256) {

      for (let i = 0; i < balance; i++) {
        const tokenRealId = Number(
          await soccerContract.tokenOfOwnerByIndex(account, i)
        );

        const token = Number(await soccerContract.tokenByIndex(tokenRealId));
        console.log(token);

        //   const balanceUser = await cards.methods.balanceOf(account).call();
        // console.log(`balance user: ${balanceUser}`);
        // for (let i = 0; i < balanceUser; i++) {
        //   const tokenId = await cards.methods
        //     .tokenOfOwnerByIndex(account, i)
        //     .call();
        //   const token = await cards.methods.tokenByIndex(tokenId).call();
        //   const item = await cards.methods.myCards(account, token).call();

        //   setMyCards((myCards) => [...myCards, item]);
        // }

        const tokenURI = await soccerContract.tokenURI(token);

        const { data } = await axios.get(`${tokenURI}`);
        // console.log(data);

        //THE PROBLEM IS HERE
        //THE PROBLEM IS HERE
        //THE PROBLEM IS HERE
        // let u = i + 1;
        const cardInfo = await soccerContract.cards(token);
        console.log(cardInfo);

        const key = Object.keys(cardInfo);
        const values = Object.values(cardInfo);

        //concatenating more data, json data + blockchain data
        for (let j = 5; j < 10; j++) {
          data[key[j]] = values[j];
        }

        setMyCards((setMyCards) => [...setMyCards, data]);
      }
    };

    done();
  }, []);

  return (
    <Container>
      {myCards.map((item, key) => {
        // return <div key={key}>Q</div>;
        return <Card key={key} nft={item}></Card>;
      })}
    </Container>
  );
};

export default Main;
