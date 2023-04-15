import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HomePage from "./HomePage";
import StockData from "./StockData";
import StockTable from "../component/StockTable";
import BlueChip from "./BlueChip";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function HomeTab(props) {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} className="tab-wrapper">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Raw Analysis" value={1} />
          <Tab label="Data Analysis" value={2} />
          <Tab label="Blue Chips" value={3} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={1}>
        <HomePage />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <StockData />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BlueChip />
      </TabPanel>
    </Box>
  );
}
