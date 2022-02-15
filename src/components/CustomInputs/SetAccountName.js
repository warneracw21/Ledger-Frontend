import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function SetAccountName({ accountName, setAccountName }) {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      style={{ minWidth: 200 }}
    >
        <TextField
          fullWidth
          id="enter-account-name"
          label="Account Name"
          value={accountName}
          onChange={(event) => setAccountName(event.target.value)}
          variant="outlined"
        />
    </Box>
  );
}