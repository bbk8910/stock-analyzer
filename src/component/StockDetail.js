import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {
  DialogContentText,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

export function StockDetail(props) {
  const { open, handleClose, detail } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Stock Detail</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {/* {console.log("")}
          {JSON.stringify(detail)} */}

          {/* <List component="nav" aria-label="company data">
            {Object.entries(detail).map(([key, value]) => (
              <ListItem key={key}>
                <ListItemText primary={key} secondary={value} />
              </ListItem>
            ))}
          </List> */}

          {/* {Object.entries(detail).map(([key, value]) => (
            <div key={key}>
              <span>{key} : </span>
              <span>{value}</span>
            </div>
          ))} */}

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-header">Key</TableCell>
                  <TableCell className="table-header">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(detail).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
