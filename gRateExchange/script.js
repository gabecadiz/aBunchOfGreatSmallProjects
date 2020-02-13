const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
const calculate = async () => {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}
  `);

  let exchangeRateJSON = await response.json();
  let exchangeRate = exchangeRateJSON.rates[currency_two];

  rateEl.innerText = `1 ${currency_one} = ${exchangeRate} ${currency_two}`;

  amountEl_two.value = (amountEl_one.value * exchangeRate).toFixed(2);
};

// Swap Currency Values
const swapCurrencyvalues = () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
};

// Event Listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);
swap.addEventListener('click', swapCurrencyvalues);

calculate();
