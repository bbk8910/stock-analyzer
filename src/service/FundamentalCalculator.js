export function getBookValue(totalAssets, totalLibailities, totalShare) {
  let result = (totalAssets - totalLibailities) / totalShare;
  return result.toFixed(2);
}

export function getEps(outstandingShare, profit) {
  return (profit / outstandingShare).toFixed(2);
}

export function getPERatio(currentPrice, eps) {
  return (currentPrice / eps).toFixed(2);
}

export function getPBV(currentPrice, bookValue) {
  return (currentPrice / bookValue).toFixed(2);
}

export function getPB(currentPrice, bookValue) {
  return (currentPrice / bookValue).toFixed(2);
}

//show manaagement condition by how they utilized thier source: most importent to judge company management
//total shre holer equity=paid up capital + Reserve + Retained earning + share premium
//buffet prefer this ratio tooo
export function getAnnualizedROE(netProfit, totalShareholderEquity) {
  const q1 = (netProfit / totalShareholderEquity) * 100;
  return (q1 * (3 / 4)).toFixed(2);
}

//return on assets most importent to judge
export function getAnnualizedROA(netProfit, totalAssets) {
  const q1 = (netProfit / totalAssets) * 100;
  return (q1 * (4 / 3)).toFixed(2); //to get till 3rd or 4th quarter result(4/3) becasue Q3 and Q4 is same
}

export function getPEG(pe, epsGrowth) {
  console.log("pe epsgrowth", pe, epsGrowth);
  return (pe / epsGrowth).toFixed(2);
}

export function getDebtToEquity(totalDebt, totalEquity) {
  return (totalDebt / totalEquity).toFixed(2);
}

export function getHigerThanGNInPercentage(eps, bookValue, currentPrice) {
  const gn = getGN(eps, bookValue);
  let result = ((currentPrice - gn) / gn) * 100;
  return result.toFixed(2);
}

export function getGN(eps, bookValue) {
  return Math.sqrt(22.5 * eps * bookValue).toFixed(2);
}

export function getAvgDividendYield(history, currentPrice) {
  console.log("before array", history);
  let arrayValue = history.values();
  let numArray = Array.from(arrayValue).map((num) => +num);
  let avarageDividendInPercent = calculateMean(numArray);

  let result = (avarageDividendInPercent / currentPrice) * 100;
  return result.toFixed(2);
}

export function calculateDividendYield(
  currentYearDevidendInPercent,
  currentPrice
) {
  console.log("ed--", currentYearDevidendInPercent, currentPrice);
  const dividendYield = (currentYearDevidendInPercent / currentPrice) * 100;
  console.log("annual dividend", dividendYield);
  return dividendYield.toFixed(2);
}

export function getPriceYOYGrowth(lastYearPrice, currentPrice) {
  return calculateGrowthRate(lastYearPrice, currentPrice);
}

export function calculateGrowthRate(prevValue, newValue) {
  let result = ((newValue - prevValue) / prevValue) * 100;
  return result.toFixed(2);
}

export function calculateMean(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  console.log("total--mean", total);
  return total / arr.length;
}
