import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api/coin";
import {useRecoilValue} from "recoil";
import {isDarkAtom} from "../atoms";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface PriceProps {
    coinId: string;
}

function Price({coinId}: PriceProps) {
    const isDark = useRecoilValue(isDarkAtom)
    const { isLoading, data: historicalData } = useQuery<IHistorical[]>(["priceTab", coinId], () => fetchCoinHistory(coinId))

        const dataArr = historicalData?.map((price) => {
            return {
                x: price.time_open,
                y: [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)],
            }
        });

    return (
        <Container>
            {isLoading?
                "Loading..."
                    :
                    (
                        <ReactApexChart
                            series={[{ data: [...dataArr!] }]}
                            options={{
                                theme: {
                                    mode: isDark? "dark" : "light",
                                },
                                chart: {
                                    type: 'candlestick',
                                    toolbar: {
                                        show: false
                                    },
                                    background: "transparent",
                                },

                                title: {
                                    text: 'CandleStick Chart',
                                    align: 'left'
                                },
                                xaxis: {
                                    type: 'datetime'
                                },
                                yaxis: {
                                    show: false,
                                },
                                grid: {
                                    show: false,
                                },

                            }}
                            type="candlestick"
                            height={500}
                            width={430}

                        ></ReactApexChart>
                    )
            }
        </Container>

    )
}

export default Price;