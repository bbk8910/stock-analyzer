import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

export default function StockTable(props) {
  const { stockMap } = props;
  console.log("stock list", stockMap);

  console.log("type of stockListMap", typeof stockMap);

  // if (!(stockMap instanceof Map)) {
  //   return <div>Provided data is not a Map object</div>;
  // }

  const data = {
    ADBL: {
      sector: "Banking",
      symbol: "ADBL",
      outstandingShare: "",
      lastYearOutstandngShare: "",
      currentPrice: "",
      purchasePrice: "",
      profit: "",
      lastYearProfit: "",
      mktCapitalization: "",
      paidUpCapital: "",
      totalAssets: "4560000000",
      totalLiabilities: "3200000",
      totalDebt: "",
      deividendHistory: {},
      bookValue: 4556800000,
      eps: "0.00",
      pe: "Infinity",
      peg: "Infinity",
      pb: "0.00",
      roe: "0.01",
      roa: "0.07",
      gn: "0.00",
      debtToEquity: "0.00",
      yearToYearGrowth: -2.857142857142857,
      payoutRatio: "",
    },
    CBBL: {
      sector: "Microfinance",
      symbol: "CBBL",
      outstandingShare: "230000",
      lastYearOutstandngShare: "435666",
      currentPrice: "2344",
      purchasePrice: "",
      profit: "3200000",
      lastYearProfit: "3200000",
      mktCapitalization: "45000000",
      paidUpCapital: "",
      totalAssets: "3088999999999991",
      totalLiabilities: "34000000",
      totalDebt: "",
      deividendHistory: {},
      bookValue: 3088999965999991,
      eps: "13.91",
      pe: "168.51",
      peg: "19.53",
      pb: "0.00",
      roe: "1043.48",
      roa: "0.00",
      gn: "983249594.13",
      debtToEquity: "1.50",
      yearToYearGrowth: 589.4117647058824,
      payoutRatio: "",
    },
  };
  console.log("l1", data);
  console.log("l2", stockMap);

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Sector</TableCell>
            <TableCell>EPS</TableCell>
            <TableCell>P/E</TableCell>
            <TableCell>PB</TableCell>
            <TableCell>Book Value</TableCell>
            <TableCell>PEG</TableCell>
            <TableCell>ROE</TableCell>
            <TableCell>ROA</TableCell>
            <TableCell>Graham Number</TableCell>
            <TableCell>Paid Up Capital</TableCell>
            <TableCell>Debt to equity</TableCell>
            <TableCell>YOY Growth(%)</TableCell>
            <TableCell>Payout raio(%)</TableCell>
            <TableCell>LTP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(data).map(([key, row]) => {
            {
              console.log("key ---->row", key, row);
            }
            return (
              <TableRow
                key={key}
                sx={{ cursor: "pointer" }}
                role="checkbox"
                hover
              >
                <TableCell component="th" scope="row">
                  {key}
                </TableCell>

                <TableCell>{row.sector}</TableCell>
                <TableCell>{row.eps}</TableCell>
                <TableCell>{row.pe}</TableCell>
                <TableCell>{row.pb}</TableCell>
                <TableCell>{row.bookValue}</TableCell>
                <TableCell>{row.peg}</TableCell>
                <TableCell>{row.roe}</TableCell>
                <TableCell>{row.roa}</TableCell>
                <TableCell>{row.gn}</TableCell>
                <TableCell>{row.paidUpCapital}</TableCell>
                <TableCell>{row.debtToEquity}</TableCell>
                <TableCell>{row.yearToYearGrowth}</TableCell>
                <TableCell>{row.payoutRatio}</TableCell>
                <TableCell>{row.currentPrice}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
