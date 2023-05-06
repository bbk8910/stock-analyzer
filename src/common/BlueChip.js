import React, { useEffect } from "react";
import { getAllData, stockStore } from "../dao/StockDao";
import StockTable from "./StockTable";

export default function BlueChip(props) {
  const [stockMap, setStockMap] = React.useState([]);
  const [formData, setFormData] = React.useState({});

  useEffect(() => {
    getStocksMap();
  }, []);

  function getStocksMap() {
    getAllData(stockStore).then((data) => {
      console.log("blue chi laist", data);
      const blueChipList = data?.filter((value) => value.isBlueChip);
      setStockMap(blueChipList);
      console.log("blue all laist", blueChipList);
    });
  }

  return (
    <StockTable
      stockMap={stockMap}
      setFormData={setFormData}
      formData={formData}
      action={false}
    />
  );
}
