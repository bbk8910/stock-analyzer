import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import AddStockDataForm from "../component/form/AddDataForm";
import AddStockForm from "../component/form/AddRawStockDataForm";
import { getAllData, getAllStock, stockStore } from "../dao/StockDao";
import StockTable from "../component/StockTable";

export default function StockData(prosp) {
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
    <Box sx={{ width: "100%" }} className="page-wrapper">
      <div className="stock-form">
        <AddStockDataForm formData={formData} />
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
