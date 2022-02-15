import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SelectAccountType({ accountType, setAccountType }) {
  const unique = (arr) => [...new Set(arr)];

  const accountTypes = ["Asset", "Liability", "Equity"]

  return (
    <Box sx={{ minWidth: 120, maxWidth: 240 }}>
      <Autocomplete
        disablePortal
        disableClearable
        value={accountType}
        onChange={(event, newValue) => {
          setAccountType(newValue);
        }}
        inputValue={accountType}
        onInputChange={(event, newInputValue) => {
          setAccountType(newInputValue);
        }}
        options={accountTypes}
        renderInput={(params) => <TextField {...params} label="Account Category" />}
      />
    </Box>
  );
}