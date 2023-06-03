import { useEffect, useState } from "react";
import { Paper, Box, Button, IconButton } from "@material-ui/core";
import {
  getCurrentDividendYieldStatus,
  getEpsStatus,
  getGNPercentStatus,
  getPBStatus,
  getPEGStatus,
  getPEStatus,
  getPriceGrowthStatus,
  getRatioSummaryStatus,
  getROAStatus,
  getROEStatus,
  getStatusText,
  getUpDown,
} from "../service/Report";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { DeleteForever, Edit, ViewAgenda } from "@material-ui/icons";
import { deleteData, stockStore } from "../dao/StockDao";
import { Stack } from "@mui/material";
import { StockDetail } from "./StockDetail";

export default function StockTable(props) {
  const { stockMap, setFormData, formData, action } = props;
  const [dataList, setDataList] = useState([]);

  const [selectedIds, setSelectionModel] = useState([]);

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
      field: "ratioCount",
      headerName: "Ratio Status",
      renderCell: (params) => getRatioSummaryStatus(params.row.ratioCount),
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
              setDetailView(params.row);
              handleClickOpen();
            }}
          >
            view
          </Button>

          {action ? (
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
          ) : null}
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const labels = ["year 1", "year 2", "year 3", "year 4", "year 5"];
  const [dividendData, setDividendData] = useState({});
  const [profitData, setProfitData] = useState({});
  const [revenueData, setRevenueData] = useState({});

  function setDetailView(data) {
    setFormData(data || {});
    console.log("stock details--->", data);
    const profitGrowthMap = new Map(data.yearlyProfit).values();
    const profitGrowthArray = Array.from(profitGrowthMap)
      ?.map(Number)
      .reverse();

    const revenueGrowthMap = new Map(data.yearlyRevenue).values();
    const revenueGrowthArray = Array.from(revenueGrowthMap)
      ?.map(Number)
      .reverse();

    const devidendGrowthMap = new Map(data.yearlyDividend).values();
    const devidendGrowthArray = Array.from(devidendGrowthMap)
      ?.map(Number)
      .reverse();

    setDividendData({
      labels,
      datasets: [
        {
          fill: true,
          label: "Devidend Growth",
          data: [...devidendGrowthArray],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });

    setProfitData({
      labels,
      datasets: [
        {
          fill: true,
          label: "Profit Growth",
          data: profitGrowthArray,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });

    setRevenueData({
      labels,
      datasets: [
        {
          fill: true,
          label: "Revenue Growth",
          data: revenueGrowthArray,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });

    console.log("devidend growth", profitGrowthArray);
    console.log("revenue growth", revenueData);
    console.log("profit growth", profitData);
  }

  return (
    <Box style={{ height: 600, width: "100%" }} component={Paper}>
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
      <StockDetail
        open={open}
        handleClose={handleClose}
        detail={formData}
        dividendData={dividendData}
        profitData={profitData}
        revenueData={revenueData}
      />
    </Box>
  );
}
