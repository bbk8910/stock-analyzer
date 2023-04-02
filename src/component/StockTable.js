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
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { DeleteForever, Edit, ViewAgenda } from "@material-ui/icons";
import { deleteStock } from "./StockDao";
import { Stack } from "@mui/material";
// import { useSelection } from "@mui/x-data-grid";

export default function StockTable(props) {
  const { stockMap, setFormData, formData } = props;
  // const selectionModel = useSelection();
  const [dataList, setDataList] = React.useState([]);

  const [selectionModel, setSelectionModel] = React.useState([]);
  let viewData = {};

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
              viewData = data;
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
              const data = new Map(Object.entries(stockMap)).get(
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
        <IconButton
          onClick={() => {
            const selectedIDs = new Set(selectionModel);
            console.log("selected id", selectedIDs);
            deleteStock(selectedIDs).then(() => {
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
  let data = {
    sector: "Banking",
    id: "AHL",
    bookValue: -278,
    eps: "1.44",
    pe: "542.36",
    peg: "-1153.96",
    pb: "-2.81",
    roe: "107.88",
    roa: "1296.83",
    gn: null,
    gnAbove: null,
    paidUpCapital: "",
    debtToEquity: "1.28",
    yearToYearGrowth: -16.291532690246516,
    payoutRatio: "",
    outstandingShare: "568",
    lastYearOutstandngShare: "280",
    profit: "817",
    lastYearProfit: "534",
    currentPrice: "781",
    mktCapitalization: "494",
    totalAssets: "84",
    totalLiabilities: "362",
    totalDebt: "727",
    currentDividendYield: 17.92573623559539,
    avgDividendYield: 17.92573623559539,
    deividendHistory: {},
    profitHistory: {},
    revenueHistory: {},
    priceYoYGrowth: false,
    profitYoYGrowth: false,
    revenueYoYGrowth: false,
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
      {getListItem(formData)}
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
          <List>
            {console.log("jsond data", formData)}
            {getListItem(data)}
          </List>
        </DialogContentText>
      </Dialog> */}
    </Box>
  );
}
