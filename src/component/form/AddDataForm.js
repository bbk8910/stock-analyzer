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
  getAvgDividendYield,
  getDebtToEquity,
  getHigerThanGNInPercentage,
  getPB,
  getPERatio,
  getPriceYOYGrowth,
} from "../../service/FundamentalCalculator.js";
import { saveData, stockStore } from "../../dao/StockDao";
import { SECTOR_LIST } from "../../constant/Constant.js";
import { ServiceButton } from "../ServiceButton.js";
import MySnackBar from "../SnackBar.js";

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

export default function AddStockDataForm(props) {
  const { formData, setFormData } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: formData,
  });

  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);

  const [yearlyDividend, setYearlyDividend] = React.useState(
    new Map().set(1, "")
  );

  const [yearlyProfit, setYearlyProfit] = React.useState(new Map().set(1, ""));
  const [yearlyRevenue, setYearlyRevenue] = React.useState(
    new Map().set(1, "")
  );

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
    console.log("name, vlaue", name, value);
    register(name, { required: true, value });
  };

  const save = (data) => {
    setLoading(true);
    const currentPrice = data.currentPrice;
    const lastYearPrice = data.lastYearPrice;
    const bookValue = data.bookValue;
    const eps = data.eps;
    const outstandingShare = data.outstandingShare;
    const totalDebt = data.totalDebt;
    const roe = data.roe;
    const roa = data.roa;
    const payoutRatio = data.payoutRatio;
    const sector = data.sector;
    const id = data.id;
    const peg = data.peg;
    const yearToYearGrowth = getPriceYOYGrowth(lastYearPrice, currentPrice);

    const pe = getPERatio(data.currentPrice, eps);
    const pb = getPB(data.currentPrice, bookValue);

    const gnAbove = getHigerThanGNInPercentage(
      eps,
      bookValue,
      data.currentPrice
    );

    const debtToEquity = getDebtToEquity(data.totalDebt, data.outstandingShare);

    const avgDividendYield = getAvgDividendYield(
      yearlyDividend,
      data.currentPrice
    );
    const currentDividendYield = calculateDividendYield(
      yearlyDividend,
      data.currentPrice
    );

    formData.sector = sector;
    formData.id = id;
    formData.bookValue = bookValue;
    formData.eps = eps;
    formData.pe = pe;
    formData.peg = peg;
    formData.pb = pb;
    formData.roe = roe;
    formData.roa = roa;
    formData.gnAbove = gnAbove;
    formData.debtToEquity = debtToEquity;
    formData.yearToYearGrowth = yearToYearGrowth;
    formData.payoutRatio = payoutRatio;
    formData.outstandingShare = outstandingShare;
    formData.currentPrice = currentPrice;
    formData.lastYearPrice = lastYearPrice;
    formData.totalDebt = totalDebt;
    formData.avgDividendYield = avgDividendYield;
    formData.yearlyDividend = yearlyDividend;
    formData.currentDividendYield = currentDividendYield;

    saveData(formData, stockStore)
      .then(() => {
        handleSuccessSnackBar("Success");
      })
      .catch((error) => {
        console.log("eroro---", error);
        handleErrorSnackBar("Error occurred");
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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

  const handleOptionChange = (name, value) => {
    console.log("name ====>value", name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleAddInput = () => {
    const newId = yearlyDividend.size + 1;
    setYearlyDividend(new Map(yearlyDividend).set(newId, ""));
  };

  const handleRemoveInput = (id) => {
    const newInputs = new Map(yearlyDividend);
    newInputs.delete(id);
    setYearlyDividend(newInputs);
  };

  const handleDevidendChange = (id, value) => {
    setYearlyDividend(new Map(yearlyDividend.set(id, value)));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" component="h1" className={classes.title}>
        Add Stock Data
      </Typography>
      <form onSubmit={handleSubmit(save)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              name="sector"
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
              inputProps={{ type: "number", step: ".01" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("outstandingShare", { required: true })}
              error={errors.outstandingShare ? true : false}
              helperText={
                errors.outstandingShare?.type === "required" &&
                "This filed is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="LTP"
              name="currentPrice"
              inputProps={{ type: "number", step: ".01" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("currentPrice", { required: true })}
              error={errors.currentPrice ? true : false}
              helperText={
                errors.currentPrice?.type === "required" && "LTP is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="LastYear LTP(Q4)"
              name="lastYearPrice"
              inputProps={{ type: "number", step: ".01" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("lastYearPrice", { required: true })}
              error={errors.lastYearPrice ? true : false}
              helperText={
                errors.lastYearPrice?.type === "required" &&
                "This field is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Book value"
              name="bookValue"
              inputProps={{ type: "number", step: ".01" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("bookValue", { required: true })}
              error={errors.bookValue ? true : false}
              helperText={
                errors.bookValue?.type === "required" &&
                "Book value is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="EPS"
              name="eps"
              inputProps={{ type: "number", step: ".01" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("eps", { required: true })}
              error={errors.eps ? true : false}
              helperText={errors.eps?.type === "required" && "EPS is required"}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="bh"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="ROE"
              name="roe"
              inputProps={{ type: "number", step: ".01" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("roe", { required: true })}
              error={errors.roe ? true : false}
              helperText={
                errors.roe?.type === "required" && "Last year price is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="bh"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="ROA"
              name="roa"
              inputProps={{ type: "number", step: ".01" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("roa", { required: true })}
              error={errors.roa ? true : false}
              helperText={
                errors.roa?.type === "required" && "This field is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="PEG"
              name="peg"
              inputProps={{ type: "number", step: ".01" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("peg", { required: true })}
              error={errors.peg ? true : false}
              helperText={
                errors.peg?.type === "required" && "This field is required"
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
              inputProps={{ type: "number", step: ".01" }}
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
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Payout Ratio(%)"
              name="payoutRatio"
              inputProps={{ type: "number", step: ".01" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("payoutRatio", { required: true })}
              error={errors.payoutRatio ? true : false}
              helperText={
                errors.payoutRatio?.type === "required" &&
                "Payout Ratio is required"
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
                  inputProps={{ type: "number", step: ".01" }}
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

          <Grid item xs={6}>
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
