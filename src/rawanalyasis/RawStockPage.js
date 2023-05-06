import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import AddStockForm from "./AddRawStockDataForm";
import { getAllData, getAllStock, stockStore } from "../dao/StockDao";
import StockTable from "../common/StockTable";

export default function HomePage(prosp) {
  const [stockMap, setStockMap] = React.useState([]);
  const [formData, setFormData] = React.useState({});

  useEffect(() => {
    getStocksMap();
  }, []);

  function getStocksMap() {
    getAllData(stockStore).then((data) => {
      setStockMap(data);
      console.log("get all laist", data);
    });
  }

  return (
    <Box className="page-wrapper">
      <div className="stock-form">
        <AddStockForm
          formData={formData}
          onActionComplete={getStocksMap}
          setFormData={setFormData}
        />
      </div>
      <div className="stock-table">
        <StockTable
          stockMap={stockMap}
          setFormData={setFormData}
          formData={formData}
          action={true}
        />
      </div>
    </Box>
  );
}
