const axios = require(`axios`);

const getExchangeRate = async (fromCurrency, toCurrency) => {
    try {
    const response = await axios.get(`http://data.fixer.io/api/latest?access_key=8e38a627b9b63becceb1a978fa10a349&format=1`);
    const rate = response.data.rates;
    const euro = 1 / rate[fromCurrency];
    const exchangeRate = euro * rate[toCurrency];
    console.log(exchangeRate);
    return exchangeRate;
    } catch (error) {
    throw new Error (`Unable to get currency ${fromCurrency} and ${toCurrency}`);
    }
};

const getCountries = async (toCurrency) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/currency/${toCurrency}`);
        const countryNames = response.data.map(country => {return country.name.common});
        return countryNames;
    } catch (error) {
        throw new Error (`Unable to get countries that use ${toCurrency}`);
    }
    
}

const convertCurrency = async (fromCurrency , toCurrency, amount) => {
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const countries = await getCountries(toCurrency);

    const convertedAmount = (amount * exchangeRate).toFixed(2);
    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend it in ${countries}`;
};

convertCurrency('USD', 'NPR', 10)
   .then((message) => {
        console.log(message);
   }).catch((error) => {
       console.log(error.message);
   })