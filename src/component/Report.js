export function getEpsStatus(eps) {
  switch (true) {
    case eps >= 30:
      return UNDER_VALUED;
    default:
      return OVER_VLAUED;
  }
}

export function getPEStatus(pe) {
  switch (true) {
    case pe <= 30 && pe >= 10:
      return UNDER_VALUED;
    default:
      return OVER_VLAUED;
  }
}

export function getPBStatus(pb) {
  switch (true) {
    case pb <= 5:
      return UNDER_VALUED;

    default:
      return OVER_VLAUED;
  }
}

export function getBookValueStatus(bookValue) {
  switch (true) {
    case bookValue >= 100:
      return UNDER_VALUED;
    default:
      return OVER_VLAUED;
  }
}

export function getPEGStatus(peg) {
  if (peg <= 1) {
    return UNDER_VALUED;
  }
  return OVER_VLAUED;
}
//note ROE always greter than fixed deposite interest
export function getROEStatus(roe, sector) {
  if (sector === BANK || sector === MICRO_FINANCE) {
    if (roe > 15) return UNDER_VALUED;
  }
  return roe > 20 ? UNDER_VALUED : OVER_VLAUED;
}

export function getROAStatus(roa) {
  return roa > 1 ? UNDER_VALUED : OVER_VLAUED;
}

export function getGNPercent(gn) {
  return gn < 25 ? UNDER_VALUED : OVER_VLAUED;
}
