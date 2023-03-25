import React, { useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { Delete, PlusOneSharp, Save } from "@material-ui/icons";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import Paper from "@mui/material/Paper";

import { styled } from "@mui/material/styles";

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
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    sector: "",
    symbol: "",
    outstandingShare: 0,
    marketPrice: 0,
    purchasePrice: 0,
    profit: 0,
    bookValue: 0,
    mktCapitalization: 0,
    paidUpCapital: 0,
    deividendHistory: new Map(),
  });
  const [yearlyDividend, setYearlyDividend] = React.useState(
    new Map().set(1, "")
  );

  useEffect(() => {
    getConsultant();
  }, []);

  function getConsultant() {}

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (event) => {
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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Sector"
              name="sector"
              value={""}
              onChange={handleInputChange}
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
              value={""}
              onChange={handleInputChange}
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
              value={""}
              onChange={handleInputChange}
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
              value={""}
              onChange={handleInputChange}
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
              value={""}
              onChange={handleInputChange}
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
              value={""}
              onChange={handleInputChange}
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
              value={""}
              onChange={handleInputChange}
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
                    label={`Add last ${id} Year Dividend`}
                    name="bookValue"
                    value={value}
                    onChange={(e) => handleDevidendChange(id, e.target.value)}
                  />
                  <Stack direction="row" spacing={1}>
                    <LoadingButton
                      className={classes.button}
                      onClick={() => handleRemoveInput(id)}
                      endIcon={<Delete />}
                      loading={loading}
                      loadingPosition="end"
                      variant="contained"
                      color="error"
                    >
                      <span>Remove</span>
                    </LoadingButton>
                  </Stack>
                </Item>
              </Stack>
            ))}
            <LoadingButton
              className={`${classes.button}`}
              onClick={handleAddInput}
              endIcon={<PlusOneSharp />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Add</span>
            </LoadingButton>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              <LoadingButton
                className={classes.button}
                onClick={null}
                endIcon={<Save />}
                loading={loading}
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
