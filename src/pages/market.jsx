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
      const { account, soccerContract, signer } = await connectEthereum();

      const val = Number(ethers.utils.parseUnits("0.0000001", "ether"));

      // function buyCardFromMarket(uint256 id) public payable {
      //WORKING
      // const tx = await soccerContract.buyCardFromMarket(2, {
      //   from: account,
      //   value: val,
      // });

      // console.log(tx);

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
        setContractCards((contractCards) => [...contractCards, data]);
      }

      // second loop
      // for (let i = 1; i < balance; i++) {
      //   const cardInfo = await soccerContract.cards(i);
      //   console.log(cardInfo);
      // }
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
