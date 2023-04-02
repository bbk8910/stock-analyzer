import { OVER_VLAUED, sectorObj, UNDER_VALUED } from "./Constant";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const getStatusText = (status, value) => {
  return status === UNDER_VALUED ? (
    <p style={{ color: "green" }}>{value}</p>
  ) : (
    <p style={{ color: "red" }}>{value}</p>
  );
};

export const getUpDown = (value) => {
  return value ? (
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
      return getStatusText(UNDER_VALUED, eps);
    default:
      return getStatusText(OVER_VLAUED, eps);
  }
}

export function getPEStatus(pe) {
  if (!pe) {
    return getDefaultStatus();
  }
  switch (true) {
    case pe <= 30 && pe >= 10:
      return getStatusText(UNDER_VALUED, pe);
    default:
      return getStatusText(OVER_VLAUED, pe);
  }
}

export function getPBStatus(pb) {
  if (!pb) {
    return getDefaultStatus();
  }
  switch (true) {
    case pb <= 5:
      return getStatusText(UNDER_VALUED, pb);

    default:
      return getStatusText(OVER_VLAUED, pb);
  }
}

export function getBookValueStatus(bookValue) {
  if (!bookValue) {
    return getDefaultStatus();
  }
  switch (true) {
    case bookValue >= 100:
      return getStatusText(UNDER_VALUED, bookValue);
    default:
      return getStatusText(OVER_VLAUED, bookValue);
  }
}

export function getPEGStatus(peg) {
  if (!peg) {
    return getDefaultStatus();
  }
  if (peg <= 1) {
    return getStatusText(UNDER_VALUED, peg);
  }
  return getStatusText(OVER_VLAUED, peg);
}

//note ROE always greter than fixed deposite interest
export function getROEStatus(roe, sector) {
  if (!roe) {
    return getDefaultStatus();
  }

  if (sector === sectorObj.BANK || sector === sectorObj.MICRO_FINANCE) {
    if (roe > 15) return getStatusText(UNDER_VALUED, roe);
  }
  return roe > 20
    ? getStatusText(UNDER_VALUED)
    : getStatusText(OVER_VLAUED, roe);
}

export function getROAStatus(roa) {
  if (!roa) {
    return getDefaultStatus();
  }
  return roa > 1
    ? getStatusText(UNDER_VALUED, roa)
    : getStatusText(OVER_VLAUED, roa);
}

export function getGNPercentStatus(gn) {
  if (!gn) {
    return getDefaultStatus();
  }
  return gn < 25
    ? getStatusText(UNDER_VALUED, gn)
    : getStatusText(OVER_VLAUED, gn);
}

export function getAvgDividendStatus(value, sector) {
  if (!value) {
    return getDefaultStatus();
  }
  if (sector === sectorObj.BANK) {
    return value > 15.99
      ? getStatusText(UNDER_VALUED, value)
      : getStatusText(OVER_VLAUED, value);
  } else if (sector === sector.LIFE_INSURENCE) {
  }
}

export function getAvgDividendYieldStatus(value, sector) {
  if (!value) {
    return getDefaultStatus();
  }
  if (sector === sectorObj.BANK) {
    return value > 3.91
      ? getStatusText(UNDER_VALUED)
      : getStatusText(OVER_VLAUED);
  } else if (sector == sectorObj.LIFE_INSURENCE) {
  }
}

export function getCurrentDividendYieldStatus(value, sector) {
  if (!value) {
    return getDefaultStatus();
  }
  if (sector === sectorObj.BANK) {
    return value > 3.46
      ? getStatusText(UNDER_VALUED)
      : getStatusText(OVER_VLAUED);
  }
}
