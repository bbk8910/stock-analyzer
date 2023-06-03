import React, { useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  makeStyles,
  IconButton,
  Box,
} from "@material-ui/core";

import { Cancel, PlusOneSharp, Save } from "@material-ui/icons";
import { Autocomplete, Stack } from "@mui/material";

import { useForm } from "react-hook-form";
import AddCircleOutlineOutlined from "@material-ui/icons/AddCircleOutlineOutlined";
import {
  calculateDividendYield,
  calculateGrowthRate,
  getAnnualizedROA,
  getAnnualizedROE,
  getAvgDividendYield,
  getBookValue,
  getDebtToEquity,
  getEps,
  getGN,
  getHigerThanGNInPercentage,
  getPB,
  getPEG,
  getPERatio,
} from "../service/FundamentalCalculator.js";
import { saveData, stockStore } from "../dao/StockDao";
import { SECTOR_LIST } from "../constant/Constant.js";
import { ServiceButton } from "../component/ServiceButton.js";
import MySnackBar from "../component/SnackBar.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(0),
  },
  dynamicField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
  item: {
    padding: theme.spacing(2),
  },
}));

export default function AddRawStockDataForm(props) {
  const { formData, setFormData, onActionComplete } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: props.formData,
  });

  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);

  const [yearlyDividend, setYearlyDividend] = React.useState(
    new Map().set(1, 0)
  );

  const [yearlyProfit, setYearlyProfit] = React.useState(new Map().set(1, 0));
  const [yearlyRevenue, setYearlyRevenue] = React.useState(new Map().set(1, 0));
  const [snackBarController, setSnackBarController] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    setYearlyDividend(new Map(formData.yearlyDividend || yearlyDividend));
    setYearlyProfit(new Map(formData.yearlyProfit || yearlyProfit));
    setYearlyRevenue(new Map(formData.yearlyRevenue || yearlyRevenue));
  }, [formData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    register(name, { required: true, value });
  };

  const save = (data) => {
    setLoading(true);
    const profit = yearlyProfit.get(1) || 0;
    const lastYearProfit = yearlyProfit.get(2) || 0;
    const currentPrice = data.currentPrice;
    const lastYearPrice = data.lastYearPrice;
    const lastYearOutstandngShare = data.lastYearOutstandngShare;

    const bookValue = getBookValue(
      data.totalAssets,
      data.totalLiabilities,
      data.outstandingShare
    );
    const eps = getEps(data?.outstandingShare, profit);
    const pe = getPERatio(currentPrice, eps);

    const pb = getPB(currentPrice, bookValue);
    const roe = getAnnualizedROE(profit, data.outstandingShare);
    const roa = getAnnualizedROA(profit, data.totalAssets);
    const gn = getGN(eps, bookValue);

    const lastYearEps = getEps(lastYearOutstandngShare, lastYearProfit);
    const epsGrowth = calculateGrowthRate(lastYearEps, eps);

    const peg = getPEG(pe, epsGrowth);
    const gnAbove = getHigerThanGNInPercentage(
      eps,
      bookValue,
      data.currentPrice
    );

    const debtToEquity = getDebtToEquity(data.totalDebt, data.outstandingShare);
    const yearToYearGrowth = calculateGrowthRate(lastYearPrice);

    const avgDividendYield = getAvgDividendYield(yearlyDividend, currentPrice);
    const currentDividendYield = calculateDividendYield(
      yearlyDividend.get(1),
      currentPrice
    );

    formData.sector = data.sector;
    formData.id = data.id;
    formData.bookValue = bookValue;
    formData.eps = eps;
    formData.pe = pe;
    formData.peg = peg;
    formData.pb = pb;
    formData.roe = roe;
    formData.roa = roa;
    formData.gn = gn;
    formData.gnAbove = gnAbove;
    formData.debtToEquity = debtToEquity;
    formData.yearToYearGrowth = yearToYearGrowth;
    formData.outstandingShare = data.outstandingShare;
    formData.lastYearOutstandngShare = lastYearOutstandngShare;
    formData.currentPrice = currentPrice;
    formData.lastYearPrice = lastYearPrice;
    formData.totalAssets = data.totalAssets;
    formData.totalLiabilities = data.totalLiabilities;
    formData.totalDebt = data.totalDebt;
    formData.profit = profit;

    formData.avgDividendYield = avgDividendYield;
    formData.yearlyDividend = yearlyDividend;
    formData.yearlyProfit = yearlyProfit;
    formData.yearlyRevenue = yearlyRevenue;

    formData.currentDividendYield = currentDividendYield;

    console.log("saved data", formData);

    saveData(formData, stockStore)
      .then(() => {
        handleSuccessSnackBar("Success");
        onActionComplete();
      })
      .catch((error) => handleErrorSnackBar("Error Occurred"));
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  function handleSuccessSnackBar(message) {
    setSnackBarController((prevState) => ({
      ...prevState,
      open: true,
      message: message,
      severity: "success",
    }));
  }

  function handleErrorSnackBar(message) {
    setSnackBarController((prevState) => ({
      ...prevState,
      open: true,
      message: message,
      severity: "error",
    }));
  }

  const handleAddInput = () => {
    const newId = yearlyDividend.size + 1;
    setYearlyDividend(new Map(yearlyDividend).set(newId, ""));
  };

  const handleRemoveInput = (id) => {
    const newInputs = new Map(yearlyDividend);
    newInputs.delete(id);
    setYearlyDividend(newInputs);
  };

  const handleProfitAddInput = () => {
    const newId = yearlyProfit.size + 1;
    setYearlyProfit(new Map(yearlyProfit).set(newId, ""));
  };

  const handleProfitRemoveInput = (id) => {
    const newInputs = new Map(yearlyProfit);
    newInputs.delete(id);
    setYearlyProfit(newInputs);
  };

  const handleRevenueAddInput = () => {
    const newId = yearlyRevenue.size + 1;
    setYearlyRevenue(new Map(yearlyRevenue).set(newId, ""));
  };

  const handleRevenueRemoveInput = (id) => {
    const newInputs = new Map(yearlyRevenue);
    newInputs.delete(id);
    setYearlyRevenue(newInputs);
  };

  const handleDevidendChange = (id, value) => {
    setYearlyDividend(new Map(yearlyDividend.set(id, value)));
  };

  const handleProfitChange = (id, value) => {
    setYearlyProfit(new Map(yearlyProfit.set(id, value)));
  };

  const handleRevenueChange = (id, value) => {
    setYearlyRevenue(new Map(yearlyRevenue.set(id, value)));
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.title}>
        Add Stock
      </Typography>
      <form onSubmit={handleSubmit(save)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={SECTOR_LIST}
              renderInput={(params) => (
                <TextField
                  id="formatted-numberformat-input"
                  {...params}
                  variant="outlined"
                  fullWidth
                  className={classes.textField}
                  label="Sector"
                  name="sector"
                  onChange={handleInputChange}
                  {...register("sector", { required: true })}
                  error={errors.sector ? true : false}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText={
                    errors.sector?.type === "required" && "Sector is required"
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="bh"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Symbol"
              name="id"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("id", { required: true })}
              error={errors.id ? true : false}
              helperText={
                errors.id?.type === "required" && "Symbol is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Outstanding Share"
              name="outstandingShare"
              inputProps={{ type: "number" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("outstandingShare", { required: true })}
              error={errors.outstandingShare ? true : false}
              helperText={
                errors.outstandingShare?.type === "required" &&
                "Outstanding is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Last Year Outstanding Share"
              name="lastYearOutstandngShare"
              inputProps={{ type: "number" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("lastYearOutstandngShare", { required: true })}
              error={errors.lastYearOutstandngShare ? true : false}
              helperText={
                errors.lastYearOutstandngShare?.type === "required" &&
                "Last year Outstanding is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="bh"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Current price"
              name="currentPrice"
              inputProps={{ type: "number" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("currentPrice", { required: true })}
              error={errors.currentPrice ? true : false}
              helperText={
                errors.currentPrice?.type === "required" &&
                "Current is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="bh"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Last Year Q4 price"
              name="lastYearPrice"
              inputProps={{ type: "number" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("lastYearPrice", { required: true })}
              error={errors.lastYearPrice ? true : false}
              helperText={
                errors.lastYearPrice?.type === "required" &&
                "Last year price is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Total Assets"
              name="totalAssets"
              inputProps={{ type: "number" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("totalAssets", { required: true })}
              error={errors.totalAssets ? true : false}
              helperText={
                errors.totalAssets?.type === "required" &&
                "Total Assets value is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Total Liabilites"
              name="totalLiabilities"
              inputProps={{ type: "number" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("totalLiabilities", { required: true })}
              error={errors.totalLiabilities ? true : false}
              helperText={
                errors.totalLiabilities?.type === "required" &&
                "Total Liabilites value is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Total Debt"
              name="totalDebt"
              inputProps={{ type: "number" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("totalDebt", { required: true })}
              error={errors.totalDebt ? true : false}
              helperText={
                errors.totalDebt?.type === "required" &&
                "Total Debt value is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {Array.from(yearlyDividend, ([id, value]) => (
              <Stack spacing={1} direction="row" alignItems="center">
                <TextField
                  id="formatted-numberformat-input"
                  variant="outlined"
                  fullWidth
                  className={classes.dynamicField}
                  inputProps={{ type: "number" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label={`${id} of 5 Year Dividend(%)`}
                  name="bookValue"
                  value={value}
                  onChange={(e) => handleDevidendChange(id, e.target.value)}
                />

                <IconButton
                  // className={classes.button}
                  onClick={() => handleRemoveInput(id)}
                  loadingPosition="end"
                  variant="contained"
                  color="error"
                >
                  <Cancel color="error" />
                </IconButton>
              </Stack>
            ))}
            <IconButton
              className={`${classes.button}`}
              onClick={handleAddInput}
              endIcon={<PlusOneSharp />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              color="primary"
            >
              <AddCircleOutlineOutlined />
            </IconButton>
          </Grid>

          <Grid item xs={12} sm={6}>
            {Array.from(yearlyProfit, ([id, value]) => (
              <Stack spacing={1} direction="row" alignItems="center">
                <TextField
                  id="formatted-numberformat-input"
                  variant="outlined"
                  fullWidth
                  className={classes.dynamicField}
                  inputProps={{ type: "number" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label={`${id} of 3 Year Profit(Q4)`}
                  name="bookValue"
                  value={value}
                  onChange={(e) => handleProfitChange(id, e.target.value)}
                />

                <IconButton
                  className={classes.button}
                  onClick={() => handleProfitRemoveInput(id)}
                  loadingPosition="end"
                  variant="contained"
                  color="error"
                  style={{ textAlign: "center" }}
                >
                  <Cancel color="error" />
                </IconButton>
              </Stack>
            ))}
            <IconButton
              className={`${classes.button}`}
              onClick={handleProfitAddInput}
              endIcon={<PlusOneSharp />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              color="primary"
            >
              <AddCircleOutlineOutlined />
            </IconButton>
          </Grid>

          <Grid item xs={12} sm={6}>
            {Array.from(yearlyRevenue, ([id, value]) => (
              <Stack direction="row" alignItems="center">
                <TextField
                  id="formatted-numberformat-input"
                  variant="outlined"
                  fullWidth
                  className={classes.dynamicField}
                  label={`${id} of 3 Year Revenue(Q4)`}
                  inputProps={{ type: "number" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="bookValue"
                  value={value}
                  onChange={(e) => handleRevenueChange(id, e.target.value)}
                />

                <IconButton
                  className={classes.button}
                  onClick={() => handleRevenueRemoveInput(id)}
                  loadingPosition="end"
                  variant="contained"
                  color="error"
                >
                  <Cancel color="error" />
                </IconButton>
              </Stack>
            ))}
            <IconButton
              className={`${classes.button}`}
              onClick={handleRevenueAddInput}
              endIcon={<PlusOneSharp />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              color="primary"
            >
              <AddCircleOutlineOutlined />
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              <ServiceButton
                className={classes.button}
                onClick={handleSubmit}
                loading={loading}
                name={"save"}
                icon={<Save />}
              />
              <Button variant="outlined" type="reset">
                Reset
              </Button>
            </Stack>
          </Grid>
          <MySnackBar
            snackBarController={snackBarController}
            setSnackBarController={setSnackBarController}
          />
        </Grid>
      </form>
    </Box>
  );
}
