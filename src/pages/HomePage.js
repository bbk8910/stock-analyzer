import { Box } from "@material-ui/core";
import AddStockForm from "../component/AddStockForm";
import StockTable from "../component/StockTable";

export default function HomePage(prosp) {
  return (
    <Box
      sx={{ width: "100%", bgcolor: "background.paper" }}
      className="wrapper home-page-wrapper"
    >
      <div className="stock-form">
        <AddStockForm />
      </div>
      <div className="stock-table">
        <StockTable />
      </div>
    </Box>
  );
}
