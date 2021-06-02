/*
    CIT 281 Project 3
    Name: Patrick Verdeja Herms
*/
function validDenomination(coin) {
  const coinValue = [1, 5, 10, 25, 50, 100];
  return coinValue.indexOf(coin) !== -1;
}

console.log(validDenomination(5));
console.log(validDenomination(3));

function valueFromCoinObject(obj) {
  const { denom = 0, count = 0 } = obj;
  return denom * count;
}

console.log(valueFromCoinObject({ denom: 25, count: 3 }));

function valueFromArray(arr) {
  return arr.reduce((accumulator, currentCoin) => accumulator + valueFromCoinObject(currentCoin),0);
 
}

console.log(valueFromArray([{denom: 25, count: 3},{denom: 5, count: 7},{denom: 10, count: 1}]));


function coinCount(...coinage){
  return valueFromArray(coinage);
}

console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins));

module.exports = {
  coinCount
}
