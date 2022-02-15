import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { gql, useQuery } from '@apollo/client';
import { GET_ACCOUNTS } from '../../api/queries';

export default function SelectAccountCategory({ selectedAccountType, accountCategory, setAccountCategory }) {
  const unique = (arr) => [...new Set(arr)];

  const { loading, error, data } = useQuery(GET_ACCOUNTS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  var accountCategories = unique(data.accounts
    .map(acc => acc.category)
    .filter(cat => cat !== "INIT")
  );

  if (selectedAccountType === "Equity") {
    accountCategories = ["Revenue", "Expense", "Gain or Loss"]
  }

  return (
    <Box sx={{ minWidth: 120, maxWidth: 240 }}>
      <Autocomplete
        freeSolo
        disableClearable
        value={accountCategory}
        onChange={(event, newValue) => {
          setAccountCategory(newValue);
        }}
        inputValue={accountCategory}
        onInputChange={(event, newInputValue) => {
          setAccountCategory(newInputValue);
        }}
        options={accountCategories}
        renderInput={(params) => <TextField {...params} label="Account Category" />}
      />
    </Box>
  );
}