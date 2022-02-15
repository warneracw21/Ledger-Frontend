import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SelectDate({ date, setDate }) {
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
        label="Set Date"
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