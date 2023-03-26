const saveKey = "dataList";

export function save(obj) {
  localStorage.setItem(obj?.sector, JSON.stringify(obj));
}

export function getAll() {
  let list = localStorage.getItem(saveKey);
  return JSON.parse(list);
}
