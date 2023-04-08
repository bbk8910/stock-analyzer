import React, { useEffect } from "react";
import {
  Paper,
  Box,
  Button,
  IconButton,
  Dialog,
  List,
  ListItem,
  ListItemText,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import {
  getEpsStatus,
  getGNPercentStatus,
  getPBStatus,
  getPEGStatus,
  getPEStatus,
  getROAStatus,
  getROEStatus,
  getUpDown,
} from "./Report";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { DeleteForever, Edit, ViewAgenda } from "@material-ui/icons";
import { deleteData, deleteStock, stockStore } from "./StockDao";
import { Stack } from "@mui/material";
import { StockDetail } from "./StockDetail";
import { storeName } from "./Constant";

export default function StockTable(props) {
  const { stockMap, setFormData, formData } = props;
  const [dataList, setDataList] = React.useState([]);

  const [selectionModel, setSelectionModel] = React.useState([]);

  useEffect(() => {
    const list = Object.entries(stockMap).map(([symbol, row], index) => {
      const data = {
        ...row,
        symbol: symbol,
        id: symbol,
      };

      return data;
    });
    setDataList(list);
  }, [stockMap]);

  const columns = [
    { field: "symbol", headerName: "Symbol" },
    { field: "sector", headerName: "Sector" },
    {
      field: "eps",
      headerName: "EPS",
      renderCell: (params) => getEpsStatus(params.row.eps),
    },
    {
      field: "pe",
      headerName: "P/E",
      renderCell: (params) => getPEStatus(params.row.pe),
    },
    {
      field: "pb",
      headerName: "PB",
      renderCell: (params) => getPBStatus(params.row.pb),
    },
    {
      field: "peg",
      headerName: "PEG",
      renderCell: (params) => getPEGStatus(params.row.peg),
    },
    {
      field: "roe",
      headerName: "ROE",
      renderCell: (params) => getROEStatus(params.row.roe),
    },
    {
      field: "roa",
      headerName: "ROA",
      renderCell: (params) => getROAStatus(params.row.roa),
    },
    {
      field: "gnAbove",
      headerName: "GN % Above",
      renderCell: (params) => getGNPercentStatus(params.row.gnAbove),
    },

    {
      field: "priceYoYGrowth",
      headerName: "PriceYOYGrowth",
      renderCell: (params) => getUpDown(params.row.priceYoYGrowth),
    },

    {
      field: "profitYoYGrowth",
      headerName: "ProfitYOYGrowth",
      renderCell: (params) => getUpDown(params.row.profitYoYGrowth),
    },

    {
      field: "revenueYoYGrowth",
      headerName: "RevenueYOYGrowth",
      renderCell: (params) => getUpDown(params.row.revenueYoYGrowth),
    },

    {
      field: "view",
      headerName: "Actions",
      width: 165,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<ViewAgenda />}
            onClick={() => {
              const data = new Map(Object.entries(stockMap)).get(
                params.row.symbol
              );
              setFormData(data);
              handleClickOpen();

              console.log("paraa", data);
            }}
          >
            view
          </Button>

          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<Edit />}
            onClick={() => {
              const data = new Map(Object.entries(stockMap || [])).get(
                params.row.symbol
              );
              setFormData(data);

              console.log("paraa", data);
            }}
          >
            Edit
          </Button>
        </Stack>
      ),
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarColumnsButton />

        <IconButton
          onClick={() => {
            const selectedIDs = new Set(selectionModel);
            console.log("selected id", selectedIDs);
            deleteData(stockStore, selectedIDs).then(() => {
              setDataList((r) => r.filter((x) => !selectedIDs.has(x.id)));
            });
          }}
        >
          <DeleteForever />
        </IconButton>
      </GridToolbarContainer>
    );
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getListItem(data) {
    let listItem = Object.entries(data)?.map(([key, value]) => (
      <ListItem key={key}>
        <ListItemText primary={key} secondary={value} />
      </ListItem>
    ));
    return listItem;
  }

  return (
    <Box style={{ height: 400, width: "100%" }} component={Paper}>
      {/* <Button
        variant="contained"
        color="secondary"
        disabled={!selectionModel.selectedIds.length}
        onClick={() => {
          const newRows = dataList.filter(
            (row) => !selectionModel.selectedIds.includes(row.id)
          );
          setDataList(newRows);
          selectionModel.setDeselectedIds(selectionModel.selectedIds);
        }}
      >
        Delete Selected Rows
      </Button> */}
      <DataGrid
        rows={[...dataList]}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        components={{
          Toolbar: CustomToolbar,
        }}
        onRowSelectionModelChange={(ids) => {
          setSelectionModel(ids);
        }}
      />
      <StockDetail open={open} handleClose={handleClose} detail={formData} />
    </Box>
  );
}
