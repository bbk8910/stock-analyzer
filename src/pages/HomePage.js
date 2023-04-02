import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import AddStockForm from "../component/AddStockForm";
import { getAllStock } from "../component/StockDao";
import StockTable from "../component/StockTable";

export default function HomePage(prosp) {
  const [stockMap, setStockMap] = React.useState([]);
  const [formData, setFormData] = React.useState({});

  useEffect(() => {
    getStocksMap();
  }, []);

  function getStocksMap() {
    const data = getAllStock();

    setStockMap(data);
    console.log("get all laist", data);
  }

  return (
    <Box sx={{ width: "100%" }} className="page-wrapper">
      <div className="stock-form">
        <AddStockForm formData={formData} />
      </div>
      <div className="stock-table">
        <StockTable
          stockMap={stockMap}
          setFormData={setFormData}
          formData={formData}
        />
      </div>
    </Box>
  );
}
