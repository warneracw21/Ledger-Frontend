import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import IncomeTable from './IncomeTable';

import TextField from '@mui/material/TextField';

const moment = require('moment');

function SelectDate({ date, setDate, ...props }) {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      style={{ width: 200 }}
    >
      <TextField
        fullWidth
        id="set-date"
        label={props.label}
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={date}
        onChange={(event) => setDate(event.target.value)}
        variant="outlined" 
      />
    </Box>
  );
}

export default function IncomeTablePanel() {

  const [startDate, setStartDate] = React.useState(moment(new Date()).subtract('days', 14).format("YYYY-MM-DD"));
  const [endDate, setEndDate] = React.useState(moment(new Date()).format("YYYY-MM-DD"));

  return (
    <Box
      component={Paper}
      sx={{
        margin: 2,
        padding: 1,
        minWidth: 350,
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <SelectDate
            date={startDate}
            setDate={setStartDate} 
            label={"Start Date"}
          />
          <SelectDate
            date={endDate}
            setDate={setEndDate} 
            label={"End Date"}
          />
        </Stack>
        <IncomeTable 
          startDate={startDate}
          endDate={endDate}
        />
      </Stack>
    </Box>
  );
}