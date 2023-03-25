export function getBookValue(totalAssets, totalLibailities) {
  return totalAssets - totalLibailities;
}

export function getEps(outstandingShare, profit) {
  return profit / outstandingShare;
}

export function getPERatio(currentPrice, eps) {
  return currentPrice / eps;
}

export function getPBV(currentPrice, bookValue) {
  return currentPrice / bookValue;
}

export function getPB(currentPrice, bookValue) {
  return currentPrice / bookValue;
}

//show manaagement condition by how they utilized thier source: most importent to judge company management
//total shre holer equity=paid up capital + Reserve + Retained earning + share premium
//buffet prefer this ratio tooo
export function getAnnualizedROE(netProfit, totalShareholderEquity) {
  const q1 = (netProfit / totalShareholderEquity) * 100;
  return q1 * (3 / 4);
}

//return on assets most importent to judge
export function getAnnualizedROA(netProfit, totalAssets) {
  const q1 = (netprofit / totalAssets) * 100;
  return q1 * (4 / 3); //to get till 3rd or 4th quarter result(4/3) becasue Q3 and Q4 is same
}

export function getPEG(pe, epsGrowth) {
  return pe / epsGrowth;
}

export function getDebtToEquity(totalDebt, totalEquity) {
  return totalDebt / totalEquity;
}

export function getGN(eps, bookValue) {
  return Math.sqrt(22.5 * eps * bookValue).toFixed(2);
}
