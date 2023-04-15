export function getBookValue(totalAssets, totalLibailities) {
  return totalAssets - totalLibailities;
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
  return ((currentPrice - gn) / gn) * 100;
}

export function getGN(eps, bookValue) {
  return Math.sqrt(22.5 * eps * bookValue).toFixed(2);
}

export function getAvgDividendYield(history, currentPrice) {
  let array = Array.from(history.values());
  let avarageDividend = calculateMean(array);
  return (avarageDividend / currentPrice) * 100;
}

export function calculateDividendYield(
  annualDividendPercentageList,
  marketPrice
) {
  const currentYearDividendInPercent = Number(
    annualDividendPercentageList.get(1)
  );
  const annualDividend = (currentYearDividendInPercent / 100) * marketPrice;
  const dividendYield = (annualDividend / marketPrice) * 100;
  return dividendYield.toFixed(2);
}

export function getPriceYOYGrowth(lastYearPrice, currentPrice) {
  let array = [lastYearPrice, currentPrice];
  return calculateGrowthRate(array);
}

export function getProfitYOYGrowth(history, currentPrice) {
  let array = Array.from(history.values());
  return calculateGrowthRate(array);
}

export function getRevenueYOYGrwoth(history) {
  let array = Array.from(history.values());
  return calculateGrowthRate(array);
}

export function calculateGrowthRate(values) {
  const yoyGrowthRates = [];
  for (let i = 1; i < values.length; i++) {
    const yoyGrowth = ((values[i] - values[i - 1]) / values[i - 1]) * 100;
    yoyGrowthRates.push(yoyGrowth);
  }
  return yoyGrowthRates;
}

export function hasGrowth(yoyGrowthRates) {
  let positiveGrowthCount = 0;
  let negativeGrowthCount = 0;

  for (let i = 0; i < yoyGrowthRates?.length; i++) {
    if (yoyGrowthRates[i] > 0) {
      console.log(`Year ${i + 1}: Positive growth of ${yoyGrowthRates[i]}%`);
      positiveGrowthCount = positiveGrowthCount + 1;
    } else if (yoyGrowthRates[i] < 0) {
      negativeGrowthCount = negativeGrowthCount + 1;
      console.log(`Year ${i + 1}: Negative growth of ${yoyGrowthRates[i]}%`);
    } else {
      console.log(`Year ${i + 1}: No growth`);
    }
  }

  if (positiveGrowthCount > negativeGrowthCount) {
    return true;
  }
  return false;
}

export function calculateMean(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total / arr.length;
}

//-----long term---------
