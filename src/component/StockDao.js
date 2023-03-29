const stockMapKey = "my_stock_map";

export function save(obj) {
  console.log("saving obj", obj);
  const list = JSON.parse(localStorage.getItem(stockMapKey) || "{}");
  const sMap = new Map(list ? Object.entries(list) : []);
  if (obj && obj.symbol) {
    sMap.set(obj.symbol, obj);
    localStorage.setItem(stockMapKey, JSON.stringify(Object.fromEntries(sMap)));
  }
}

export function getAllStock() {
  const item = localStorage.getItem(stockMapKey);
  return item ? JSON.parse(item) : {};
}
