import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

const MyTable = () => {
  const rows = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
    { id: 3, name: "Bob Johnson", age: 40 },
  ];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="a dense table" size="small">
        <TableHead>
          <TableRow>
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
