import { useEffect, useState } from "react";
import { Typography, Select, Box, InputLabel, MenuItem } from "@mui/material";

const currencies = ['USD', 'AUD', 'NZD', 'GBP', 'EUR', 'SGD'];
function BitcoinRates() {
    const [currency, setCurrency] = useState(currencies[0]);
    // fetch URL: https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}
    const [currencyValue, setCurrencyValue] = useState(0);

    useEffect(() => {
        try {
            const currencyResponse = fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`);
            currencyResponse.then((data) => {
                data.json().then((content) => {
                    setCurrencyValue(content.bitcoin[currency.toLowerCase()])
                })
            })
        }
        catch {
            console.log("Error fetching for currency: ", currency)
        }
        // cleanup function - runs when unmounted or dependencies change
        return () => {
            console.log('cleanup effect');
        };
    }, [currency])

    const options = currencies.map(
        curr => <MenuItem value={curr} key={curr}>{curr}</MenuItem>);

    return (
        <Box
            height={1000}
            width={1500}
            my={4}
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            gap={2}
        >
            <Typography variant="h3">
                Bitcoin Exchange Rate
            </Typography>
            {/* <label>Choose currency:
                <select value={currency} onChange={e => setCurrency(e.target.value)}>
                    {options}
                </select>
            </label> */}
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                onChange={e => setCurrency(e.target.value)}
            >
                {options}
            </Select>
            <p>1 Bitcoin is equals to: {currencyValue} {currency}</p>
        </Box>
    )
}

export { BitcoinRates }