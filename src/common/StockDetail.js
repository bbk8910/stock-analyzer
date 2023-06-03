import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Box, DialogContentText } from "@material-ui/core";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { LineChart } from "./LineChart";

export function StockDetail(props) {
  const { open, handleClose, detail, dividendData, profitData, revenueData } =
    props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={1000}
    >
      <DialogTitle id="alert-dialog-title">Stock Detail</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Box className="page-wrapper">
            <div>
              <LineChart data={dividendData} />
              <LineChart data={profitData} />
              <LineChart data={revenueData} />
            </div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="table-header">Key</TableCell>
                    <TableCell className="table-header">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={"1"}>
                    <TableCell>Sector</TableCell>
                    <TableCell>{detail.sector}</TableCell>
                  </TableRow>
                  <TableRow key={"2"}>
                    <TableCell>Symbol</TableCell>
                    <TableCell>{detail.id}</TableCell>
                  </TableRow>
                  <TableRow key={"3"}>
                    <TableCell>Book Value</TableCell>
                    <TableCell>{detail.bookValue}</TableCell>
                  </TableRow>
                  <TableRow key={"4"}>
                    <TableCell>EPS</TableCell>
                    <TableCell>{detail.eps}</TableCell>
                  </TableRow>
                  <TableRow key={"5"}>
                    <TableCell>PE</TableCell>
                    <TableCell>{detail.pe}</TableCell>
                  </TableRow>
                  <TableRow key={"6"}>
                    <TableCell>PEG</TableCell>
                    <TableCell>{detail.peg}</TableCell>
                  </TableRow>
                  <TableRow key={"7"}>
                    <TableCell>Price To Book Value</TableCell>
                    <TableCell>{detail.pb}</TableCell>
                  </TableRow>
                  <TableRow key={"8"}>
                    <TableCell>ROE</TableCell>
                    <TableCell>{detail.roe}</TableCell>
                  </TableRow>
                  <TableRow key={"9"}>
                    <TableCell>ROA</TableCell>
                    <TableCell>{detail.roa}</TableCell>
                  </TableRow>
                  <TableRow key={"10"}>
                    <TableCell>GN % Above</TableCell>
                    <TableCell>{detail.gnAbove}</TableCell>
                  </TableRow>
                  <TableRow key={"11"}>
                    <TableCell>Debt to Equity</TableCell>
                    <TableCell>{detail.debtToEquity}</TableCell>
                  </TableRow>
                  <TableRow key={"12"}>
                    <TableCell>Dividend Yeild</TableCell>
                    <TableCell>{detail.currentDividendYield}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
