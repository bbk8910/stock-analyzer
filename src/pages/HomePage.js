import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import AddStockForm from "../component/AddStockForm";
import { getAllStock } from "../component/StockDao";
import StockTable from "../component/StockTable";

export default function HomePage(prosp) {
  const [stockMap, setStockMap] = React.useState({});
  const [formData, setFormData] = React.useState({});

  useEffect(() => {
    getStocksMap();
  }, []);

  function getStocksMap() {
    const data = getAllStock();
    const map = new Map(Object.entries(data));
    setStockMap(data);
    console.log("get all laist", map);
  }

  return (
    <Box
      sx={{ width: "100%", bgcolor: "background.paper" }}
      className="wrapper home-page-wrapper"
    >
      <div className="stock-form">
        <AddStockForm formData={formData} />
      </div>
      <div className="stock-table">
        <StockTable stockMap={stockMap} setFormData={setFormData} />
      </div>
    </Box>
  );
}
