const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to Stock portfolio analysis API');
});

//function 1: This function use fot calculate stock returns
function calculateReturn(boughtAt, marketPrice, quantity) {
  return (marketPrice - boughtAt) * quantity;
}
// Endpoint 1: takes three variables as query parameters and returns total Return Value of the stocks.
app.get('/calculate-returns', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let marketPrice = parseFloat(req.query.marketPrice);
  let quantity = req.query.quantity;
  res.send(calculateReturn(boughtAt, marketPrice, quantity).toString());
});

// function 2: calculate the total stocks value
function calculateTotalStocks(stock1, stock2, stock3, stock4) {
  return stock1 + stock2 + stock3 + stock4;
}
// Endpoint 2: takes four variables as query parameters and returns total return value of all the stocks.
app.get('/total-returns', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);
  res.send(calculateTotalStocks(stock1, stock2, stock3, stock4).toString());
});

// function 3:  calculate the total percentage
function calculateReturnPercentage(boughtAt, returns) {
  let returnPercentage = (returns / boughtAt) * 100;
  return returnPercentage;
}
// Endpoint 3: takes two variables as query parameters and returns total ReturnPercentage of the stocks.
app.get('/calculate-return-percentage', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let returns = parseFloat(req.query.returns);
  res.send(calculateReturnPercentage(boughtAt, returns).toString());
});

// function 4:  calculate the total percntage for all stocks
function totalReturnPercentage(stock1, stock2, stock3, stock4) {
  return calculateTotalStocks(stock1, stock2, stock3, stock4);
}
// Endpoint 4: takes four variables as query parameters and returns total return percentage of all the stocks.
app.get('/total-return-percentage', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);
  res.send(totalReturnPercentage(stock1, stock2, stock3, stock4).toString());
});

// function 5:  calculate the total percntage for all stocks
function getReturnPercentage(returnPercentage) {
  if (returnPercentage > 0) {
    return 'Profit';
  } else {
    return 'Loss';
  }
}
// Endpoint 5: takes returnPercentage as query parameter and returns the stock status.
app.get('/status', (req, res) => {
  let returnPercentage = parseInt(req.query.returnPercentage);

  res.send(getReturnPercentage(returnPercentage));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
