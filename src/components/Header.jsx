import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connectEthereum } from "../ethereum";

export const Container = styled.div`
  grid-area: header;
  background-color: #151a22;

  /* border-bottom: 2px solid #0f1318; */
  /* margin-left: 25px; */
  /* background-color: white; */

  position: sticky;
  top: 0;
  /* padding-top: 20px; */
  padding-left: 25px;
  z-index: 99;
  color: white;
  font-family: monospace;

  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 15px;

  p {
    margin: 0;
    padding: 0;
  }
`;

const Header = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const done = async () => {
      const { balance, account } = await connectEthereum();
      setInfo({
        balance: String(balance),
        account,
      });
    };

    done();
  }, []);

  return (
    <Container>
      <p>Account: {info.account}</p>
      <p>Balance: {info.balance}</p>
    </Container>
  );
};

export default Header;
