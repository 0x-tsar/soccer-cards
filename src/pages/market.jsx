import axios from "axios";
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

  useEffect(() => {
    const done = async () => {
      setContractCards([]);
      const { account, soccerContract } = await connectEthereum();

      const balance = Number(
        await soccerContract.balanceOf(soccerContract.address)
      );
      console.log(`total balance: ${balance}`);
      console.log(soccerContract.address);

      for (let i = 0; i < balance; i++) {
        const tokenRealId = Number(
          await soccerContract.tokenOfOwnerByIndex(soccerContract.address, i)
        );
        // const token = await card3.tokenByIndex(tokenRealId);
        const tokenURI = await soccerContract.tokenURI(tokenRealId);

        const { data } = await axios.get(`${tokenURI}`);
        console.log(data);

        setContractCards((contractCards) => [...contractCards, data]);
        // setCards((cards) => ({ ...cards, tokenURI }));
        // setCards((cards) => [...cards, tokenURI]);
      }

      // second loop
      for (let i = 1; i < balance; i++) {
        const cardInfo = await soccerContract.cards(i);
        console.log(cardInfo);
      }
      //
    };
    done();
  }, []);

  return (
    <Container>
      {contractCards.map((item, key) => {
        return <Card key={key} nft={item}></Card>;
      })}
    </Container>
  );
}
