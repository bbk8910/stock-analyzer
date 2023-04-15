import { OVER_VLAUED, sectorObj, UNDER_VALUED } from "./Constant";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { getPriceYOYGrowth, hasGrowth } from "./FundamentalCalculator";

export const getStatusText = (obj) => {
  if (!obj) {
    return getDefaultStatus();
  }
  const status = obj?.status;
  const value = obj?.value;
  return status === UNDER_VALUED ? (
    <p style={{ color: "green" }}>{value}</p>
  ) : (
    <p style={{ color: "red" }}>{value}</p>
  );
};

export const getUpDown = (value) => {
  if (!value) {
    return getDefaultStatus();
  }
  const growth = hasGrowth(value);
  return growth ? (
    <TrendingUpIcon style={{ color: "green" }} />
  ) : (
    <TrendingDownIcon style={{ color: "red" }} />
  );
};

export const getPriceGrowthStatus = (growth) => {
  if (!growth) {
    return getDefaultStatus();
  }

  return growth > 10 ? (
    <TrendingUpIcon style={{ color: "green" }} />
  ) : (
    <TrendingDownIcon style={{ color: "red" }} />
  );
};

const getDefaultStatus = () => {
  return <p>--</p>;
};

export function getEpsStatus(eps) {
  if (!eps) {
    return getDefaultStatus();
  }
  switch (true) {
    case eps >= 30:
      return { status: UNDER_VALUED, value: eps };
    default:
      return { status: OVER_VLAUED, value: eps };
  }
}

export function getPEStatus(pe) {
  if (!pe) {
    return getDefaultStatus();
  }
  return pe <= 30 && pe >= 10
    ? { status: UNDER_VALUED, value: pe }
    : { status: OVER_VLAUED, value: pe };
}

export function getPBStatus(pb) {
  if (!pb) {
    return getDefaultStatus();
  }
  return pb <= 5
    ? { status: UNDER_VALUED, value: pb }
    : { status: OVER_VLAUED, value: pb };
}

export function getBookValueStatus(bookValue) {
  if (!bookValue) {
    return getDefaultStatus();
  }
  return bookValue >= 100
    ? { status: UNDER_VALUED, value: bookValue }
    : { status: OVER_VLAUED, value: bookValue };
}

export function getPEGStatus(peg) {
  if (!peg) {
    return getDefaultStatus();
  }
  return peg <= 1
    ? { status: UNDER_VALUED, value: peg }
    : { status: OVER_VLAUED, value: peg };
}

//note ROE always greter than fixed deposite interest
export function getROEStatus(roe, sector) {
  if (sector === sectorObj.BANK || sector === sectorObj.MICRO_FINANCE) {
    if (roe > 15) return { status: UNDER_VALUED, value: roe };
  }
  return roe > 20
    ? { status: UNDER_VALUED, value: roe }
    : { status: OVER_VLAUED, value: roe };
}

export function getROAStatus(roa) {
  if (!roa) {
    return getDefaultStatus();
  }
  return roa > 1
    ? { status: UNDER_VALUED, value: roa }
    : { status: OVER_VLAUED, value: roa };
}

export function getGNPercentStatus(gn) {
  if (!gn) {
    return getDefaultStatus();
  }
  return gn < 25
    ? { status: UNDER_VALUED, value: gn }
    : { status: OVER_VLAUED, value: gn };
}

export function getYearToYearGrowthStatus(lastYearLTP, currentLTP) {
  return getPriceYOYGrowth(lastYearLTP, currentLTP) >= 10
    ? { status: UNDER_VALUED, value: currentLTP }
    : { status: OVER_VLAUED, value: currentLTP };
}

export function getAvgDividendStatus(value, sector) {
  if (!value) {
    return getDefaultStatus();
  }
  if (sector === sectorObj.BANK) {
    return value > 15.99
      ? { status: UNDER_VALUED, value: value }
      : { status: OVER_VLAUED, value: value };
  } else if (sector === sector.LIFE_INSURENCE) {
  }
}

export function getAvgDividendYieldStatus(value, sector) {
  if (!value) {
    return getDefaultStatus();
  }
  if (sector === sectorObj.BANK) {
    return value > 3.91
      ? { status: UNDER_VALUED, value: value }
      : { status: OVER_VLAUED, value: value };
  } else if (sector == sectorObj.LIFE_INSURENCE) {
  }
}

export function getCurrentDividendYieldStatus(value, sector) {
  if (!value) {
    return getDefaultStatus();
  }
  if (sector === sectorObj.BANK) {
    return value > 3.46
      ? { status: UNDER_VALUED, value: value }
      : { status: OVER_VLAUED, value: value };
  }
}
