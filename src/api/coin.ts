const BASE_URL = `https://api.coinpaprika.com/v1`;

async function fetchCoins() {
    return fetch(`${BASE_URL}/coins`)
        .then((response) => response.json())
}

async function fetchCoinInfo(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`)
        .then((response) => response.json())
}

async function fetchCoinTickers(coinId: string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`)
        .then((response) => response.json())
}

function fetchCoinHistory(coinId: string) {
    const endDate = dateFormat(new Date());
    const startDate = getDateWeekBef(new Date());
    return fetch(
        `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
    ).then((response) => response.json());
}

function dateFormat(date:Date) {
    let month:number|string = date.getMonth() + 1;
    let day:number|string = date.getDate();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;

    return date.getFullYear() + '-' + month + '-' + day;
}

function getDateWeekBef(today: Date): string {
    const year = today.getFullYear(); // 년
    const month = today.getMonth();   // 월
    const day = today.getDate();      // 일

    const weekBef = new Date(year, month, day - 6);

    return dateFormat(weekBef);

}

export { fetchCoins, fetchCoinInfo, fetchCoinTickers, fetchCoinHistory }