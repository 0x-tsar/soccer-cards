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
      console.log(`total balance: ${balance}`);
      console.log(account);

      for (let i = 0; i < balance; i++) {
        const tokenRealId = Number(
          await soccerContract.tokenOfOwnerByIndex(account, i)
        );
        // const token = await card3.tokenByIndex(tokenRealId);
        const tokenURI = await soccerContract.tokenURI(tokenRealId);

        const { data } = await axios.get(`${tokenURI}`);
        // console.log(data);

        let u = i + 1;
        const cardInfo = await soccerContract.cards(u);

        const key = Object.keys(cardInfo);
        const values = Object.values(cardInfo);

        //concatenating more data, json data + blockchain data
        for (let j = 5; j < 10; j++) {
          data[key[j]] = values[j];
        }

        //works//
        setMyCards((setMyCards) => [...setMyCards, data]);
      }
    };

    done();
  }, []);

  return (
    <Container>
      {myCards.map((item, key) => {
        return <Card key={key} nft={item}></Card>;
      })}
    </Container>
  );
};

export default Main;
