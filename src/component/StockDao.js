const stockMapKey = "my_stock_map";

export function save(obj) {
  console.log("saving obj", obj);
  const list = JSON.parse(localStorage.getItem(stockMapKey) || "{}");
  const sMap = new Map(list ? Object.entries(list) : []);
  if (obj && obj.id) {
    sMap.set(obj.id, obj);
    localStorage.setItem(stockMapKey, JSON.stringify(Object.fromEntries(sMap)));
  }
}

export function deleteStock(symbolList) {
  return new Promise((resolve, reject) => {
    try {
      console.log("symbol list", symbolList);
      const list = JSON.parse(localStorage.getItem(stockMapKey) || "{}");

      const sMap = new Map(list ? Object.entries(list) : []);

      Array.from(symbolList).forEach((element) => {
        sMap.delete(element);
      });
      console.log("after dlete list", sMap);
      localStorage.setItem(
        stockMapKey,
        JSON.stringify(Object.fromEntries(sMap))
      );
      resolve(symbolList);
    } catch (error) {
      reject("failed");
    }
  });
}

export function getAllStock() {
  const item = localStorage.getItem(stockMapKey);
  return item ? JSON.parse(item) : {};
}
