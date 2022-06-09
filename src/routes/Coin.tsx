import {Link, useLocation, useMatch, useParams, Outlet, useNavigate } from "react-router-dom";
import {Routes, Route} from "react-router"
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import {fetchCoinInfo, fetchCoinTickers} from "../api/coin";
import React from "react";
import DarkModeButton from "../component/DarkModeButton";
import {RiArrowGoBackLine} from "react-icons/ri";
import {useRecoilValue} from "recoil";
import {isDarkAtom} from "../atoms";


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
const SubHeader = styled.div`
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface BackBtnProp {
    isDark: boolean;
}
const BackBtn = styled.div<BackBtnProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: ${props => props.isDark? 'black':'white'};
  background-color: ${props => props.isDark? 'white':'black'};
  border-radius: 10px;
  transition: color 0.2s;

  &:hover {
    color: ${props => props.theme.accentColor};
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface RouteState {
    state:{
        name:string;
    };
}
interface ITag {
    coin_counter: number;
    ico_counter: number;
    id: string;
    name: string;
}
interface ITeam {
    id: string;
    name: string;
    position: string;
}
interface ILinkExtended {
    type: string;
    url: string;

}
interface ILink {
    explorer: string[];
    facebook: string[];
    reddit: string[];
    source_code: string[];
    website: string[];
    youtube: string[];
}
interface IWhitepaper {
    link: string;
    thumbnail: string;
}
interface InfoData {
    description: string;
    development_status: string;
    first_data_at: string;
    hardware_wallet: boolean;
    hash_algorithm: string;
    id: string;
    is_active: boolean;
    is_new: boolean;
    last_data_at: string;
    links: ILink;
    links_extended: ILinkExtended[];
    message: string;
    name: string;
    open_source: boolean;
    org_structure: string;
    proof_type: string;
    rank: number;
    started_at: string;
    symbol: string;
    tags: ITag[];
    team: ITeam[];
    type: string;
    whitepaper: IWhitepaper;
}

interface PriceData {
    beta_value: number;
    circulating_supply: number;
    first_data_at: string;
    id: string;
    last_updated: string;
    max_supply: number;
    name: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
    rank: number;
    symbol: string;
    total_supply: number;
}


function Coin() {
    const { coinId } = useParams()
    const isDarkMode = useRecoilValue(isDarkAtom);
    const { isLoading: isInfoLoading, data: infoData } = useQuery<InfoData>(
        ["info", coinId],
        ()=> fetchCoinInfo(coinId!));

    const { isLoading: isTickersLoading, data: tickersData} = useQuery<PriceData>(
        ["tickers", coinId],
        ()=> fetchCoinTickers(coinId!));
    const isLoading = isInfoLoading || isTickersLoading;

    const { state } = useLocation() as RouteState;
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const navigate = useNavigate();
    const onBackBtnClick = () => {
        navigate('/');
    }

    return (
        <Container>
            <Helmet>
                <title>
                    { state?.name || "Loading..." }
                </title>
            </Helmet>
            <Header>
                <Title>
                    { state?.name? state.name : isLoading? "Loading..." : infoData?.name}
                </Title>
            </Header>
            <SubHeader>
                <BackBtn onClick={onBackBtnClick} isDark={isDarkMode}>
                    <RiArrowGoBackLine />
                </BackBtn>
                <DarkModeButton />

            </SubHeader>

            {isLoading ? (
                    <Loader>
                        "Loading..."
                    </Loader>
                )
                : (
                    <>
                        <Overview>
                            <OverviewItem>
                                <span>Rank:</span>
                                <span>{infoData?.rank}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>Symbol:</span>
                                <span>${infoData?.symbol}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>Price:</span>
                                <span>{tickersData?.quotes?.USD?.price}</span>
                            </OverviewItem>
                        </Overview>
                        <Description>{infoData?.description}</Description>
                        <Overview>
                            <OverviewItem>
                                <span>Total Suply:</span>
                                <span>{tickersData?.total_supply}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>Max Supply:</span>
                                <span>{tickersData?.max_supply}</span>
                            </OverviewItem>
                        </Overview>
                        <Tabs>
                            <Tab isActive={chartMatch !== null}>
                                <Link to={`/${coinId}/chart`}>Chart</Link>
                            </Tab>
                            <Tab isActive={priceMatch !== null}>
                                <Link to={`/${coinId}/price`}>Price</Link>
                            </Tab>
                        </Tabs>
                        <Routes>
                            <Route
                                path="price"
                                element={
                                    <Price coinId={coinId!} />
                                }
                            />
                            <Route
                                path="chart"
                                element={
                                    <Chart coinId={coinId!} />
                                }
                            />
                        </Routes>
                        <Outlet />
                    </>
                )
            }
        </Container>
    )
}

export default Coin;