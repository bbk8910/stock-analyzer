import React, { useEffect } from "react";
import { Paper, Box, Button, IconButton } from "@material-ui/core";
import {
  getCurrentDividendYieldStatus,
  getEpsStatus,
  getGNPercentStatus,
  getPBStatus,
  getPEGStatus,
  getPEStatus,
  getPriceGrowthStatus,
  getROAStatus,
  getROEStatus,
  getStatusText,
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
import { deleteData, stockStore } from "./StockDao";
import { Stack } from "@mui/material";
import { StockDetail } from "./StockDetail";
import { getCurrentDividendYield } from "./FundamentalCalculator";

export default function StockTable(props) {
  const { stockMap, setFormData, formData } = props;
  const [dataList, setDataList] = React.useState([]);

  const [selectedIds, setSelectionModel] = React.useState([]);

  useEffect(() => {
    setDataList(Array.from(stockMap || []));
  }, [stockMap]);

  const columns = [
    { field: "id", headerName: "Symbol" },
    { field: "sector", headerName: "Sector" },
    {
      field: "eps",
      headerName: "EPS",
      renderCell: (params) => getStatusText(getEpsStatus(params.row.eps)),
    },
    {
      field: "pe",
      headerName: "P/E",
      renderCell: (params) => getStatusText(getPEStatus(params.row.pe)),
    },
    {
      field: "pb",
      headerName: "PB",
      renderCell: (params) => getStatusText(getPBStatus(params.row.pb)),
    },
    {
      field: "peg",
      headerName: "PEG",
      renderCell: (params) => getStatusText(getPEGStatus(params.row.peg)),
    },
    {
      field: "roe",
      headerName: "ROE",
      renderCell: (params) =>
        getStatusText(getROEStatus(params.row.roe, params.row.sector)),
    },
    {
      field: "roa",
      headerName: "ROA",
      renderCell: (params) => getStatusText(getROAStatus(params.row.roa)),
    },
    {
      field: "gnAbove",
      headerName: "GN % Above",
      renderCell: (params) =>
        getStatusText(getGNPercentStatus(params.row.gnAbove)),
    },

    {
      field: "currentDividendYield",
      headerName: "DividendYield",
      renderCell: (params) =>
        getStatusText(
          getCurrentDividendYieldStatus(
            params.row?.currentDividendYield,
            params.row.sector
          )
        ),
    },

    {
      field: "yearToYearGrowth",
      headerName: "YOYGrowth",
      renderCell: (params) =>
        getPriceGrowthStatus(params.row?.yearToYearGrowth[0]),
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
              setFormData(params.row || {});
              handleClickOpen();
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
              setFormData(params.row || {});
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
            deleteData(stockStore, selectedIds).then(() => {
              setDataList((r) => r.filter((x) => !selectedIds.includes(x.id)));
            });
          }}
        >
          <DeleteForever
            style={{ color: selectedIds.length ? "red" : "grey" }}
          />
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

  return (
    <Box style={{ height: 400, width: "100%" }} component={Paper}>
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
