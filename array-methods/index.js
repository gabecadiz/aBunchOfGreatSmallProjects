const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// Fetch random user and add money

const getRandomUser = async () => {
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
};

// Double Everyones Money
const doubleMoney = () => {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
};

// Sorts users by richest
const sortByRichest = () => {
  data.sort((a, b) => {
    return b.money - a.money;
  });
  updateDOM();
};

// Show only Millionaires
const showOnlyMillionares = () => {
  data = data.filter(user => {
    return user.money >= 1000000;
  });
  console.log(data);
  updateDOM();
};

// Calculate total wealth
const calculateTotalWealth = () => {
  if (document.getElementById('total-wealth')) return;
  const totalWealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3 id="total-wealth">Total Wealth: <strong>${formatMoney(
    totalWealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
};

// start off page with 3 random users
getRandomUser();
getRandomUser();
getRandomUser();

// Add new obj to data arr
const addData = obj => {
  data.push(obj);
  updateDOM();
};

// Update DOM
const updateDOM = (providedData = data) => {
  //Clear main div;
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
};

// Format number as money
const formatMoney = number => {
  return `$${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
};

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showOnlyMillionares);
calculateWealthBtn.addEventListener('click', calculateTotalWealth);
