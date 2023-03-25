import React, { useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";

import { Delete, PlusOneSharp, Save } from "@material-ui/icons";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import Paper from "@mui/material/Paper";

import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import AddCircleOutlineOutlined from "@material-ui/icons/AddCircleOutlineOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AddStockForm() {
  const [formData, setFormData] = React.useState({
    sector: "",
    symbol: "",
    outstandingShare: "",
    marketPrice: "",
    purchasePrice: "",
    profit: "",
    bookValue: "",
    mktCapitalization: "",
    paidUpCapital: "",
    deividendHistory: new Map(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);

  const [yearlyDividend, setYearlyDividend] = React.useState(
    new Map().set(1, "")
  );

  useEffect(() => {
    getConsultant();
  }, []);

  function getConsultant() {}

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    register(name, { required: true, value });
  };

  const saveData = (event) => {
    setLoading(true);
  };

  const handleOptionChange = (name) => (event, value) => {
    console.log("name value", name, value);
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
    <div className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.title}>
        Add Stock
      </Typography>
      <form onSubmit={handleSubmit(saveData)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Sector"
              name="sector"
              onChange={handleInputChange}
              {...register("sector", { required: true })}
              error={errors.sector ? true : false}
              helperText={
                errors.sector?.type === "required" && "Sector is required"
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="bh"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Symbol"
              name="symbol"
              onChange={handleInputChange}
              {...register("symbol", { required: true })}
              error={errors.symbol ? true : false}
              helperText={
                errors.symbol?.type === "required" && "Symbol is required"
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
              id="bh"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Current price"
              name="marketPrice"
              inputProps={{ type: "number" }}
              onChange={handleInputChange}
              {...register("marketPrice", { required: true })}
              error={errors.marketPrice ? true : false}
              helperText={
                errors.marketPrice?.type === "required" && "Current is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Purchase Price"
              name="purchasePrice"
              inputProps={{ type: "number" }}
              onChange={handleInputChange}
              {...register("purchasePrice", { required: true })}
              error={errors.purchasePrice ? true : false}
              helperText={
                errors.purchasePrice?.type === "required" &&
                "Symbol is required"
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="bh"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Market Capitalization"
              name="mktCapitalization"
              inputProps={{ type: "number" }}
              onChange={handleInputChange}
              {...register("mktCapitalization", { required: true })}
              error={errors.mktCapitalization ? true : false}
              helperText={
                errors.mktCapitalization?.type === "required" &&
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
              label="Book Value"
              name="bookValue"
              inputProps={{ type: "number" }}
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
            {Array.from(yearlyDividend, ([id, value]) => (
              <Stack spacing={1}>
                <Item>
                  <TextField
                    id="formatted-numberformat-input"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    label={`Add last ${id} of 5 Year Dividend`}
                    name="bookValue"
                    value={value}
                    onChange={(e) => handleDevidendChange(id, e.target.value)}
                  />

                  <IconButton
                    className={classes.button}
                    onClick={() => handleRemoveInput(id)}
                    loadingPosition="end"
                    variant="contained"
                    color="error"
                  >
                    <Delete color="error" />
                  </IconButton>
                </Item>
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
              <LoadingButton
                className={classes.button}
                onClick={null}
                endIcon={<Save />}
                loading={false}
                loadingPosition="end"
                variant="contained"
                type="submit"
              >
                <span>Update</span>
              </LoadingButton>
              <Button variant="outlined" type="reset">
                Reset
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
