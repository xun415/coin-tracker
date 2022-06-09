import styled from "styled-components";
import {Link} from "react-router-dom";
import {fetchCoins} from "../api/coin";
import { useQuery } from "react-query";
import {Helmet} from "react-helmet";
import React from "react";
import DarkModeButton from "../component/DarkModeButton";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul`

`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${props => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 20px;
  border: 1px solid white;
  
  a {
    padding: 20px;
    transition: color .2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

interface ICoin {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    is_new : boolean;
    is_active : boolean;
    type : string;
}

function Coins() {

    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

    return (
        <Container>
            <Helmet>
                <Title>코인</Title>
            </Helmet>
            <Header>
                <Title>코인</Title>
                <DarkModeButton/>


            </Header>
            {isLoading? (
                    <Loader>
                        "Loading..."
                    </Loader>
                )
                :
                (
                    <CoinList>
                        {data?.slice(0,100).map((coin) =>
                            <Coin key={coin.id}>
                                <Link to={`${process.env.PUBLIC_URL}/${coin.id}`}
                                      state={{ name: coin.name }}
                                >
                                    <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} alt=""></Img>
                                    {coin.name} &rarr;
                                </Link>
                            </Coin>
                        )}
                    </CoinList>
                )
            }

        </Container>
    )
}

export default Coins