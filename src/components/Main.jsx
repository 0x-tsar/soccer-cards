import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import axios from "axios";
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

const Main = () => {
  const { myCards, setMyCards } = useContext(AuthContext);

  useEffect(() => {
    const done = async () => {
      const { account, soccerContract } = await connectEthereum();

      const balance = Number(await soccerContract.balanceOf(account));
      setMyCards([]);

      for (let i = 0; i < balance; i++) {
        const tokenRealId = Number(
          await soccerContract.tokenOfOwnerByIndex(account, i)
        );
        // const token = await soccerContract.tokenByIndex(tokenRealId);
        const tokenURI = await soccerContract.tokenURI(tokenRealId);

        const { data } = await axios.get(`${tokenURI}`);

        setMyCards((contractCards) => [...contractCards, data]);
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
