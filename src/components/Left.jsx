import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/contexto";

export const Container = styled.div`
  grid-area: left;
  /* background-color: rgb(21, 26, 34); */
  background-color: rgb(21, 26, 34);

  position: sticky;
  top: 70px;

  color: white;
  font-size: 20px;

  text-align: center;
  display: flex;
  cursor: pointer;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;

  a {
    width: 100%;
    height: min-content;
    margin-top: 10px;
    :hover {
      color: gray;
    }
  }
`;

const Left = () => {
  const { setContractCards } = useContext(AuthContext);

  return (
    <Container>
      <Link href={"/"}>
        <a>
          <div>Home</div>
        </a>
      </Link>
      <Link href={"/market"}>
        <a>
          <div>Market</div>
        </a>
      </Link>
    </Container>
  );
};

export default Left;
