import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { gql, useQuery, useMutation } from '@apollo/client';
import { GET_TRANSACTIONS, EDIT_TRANSACTION, DELETE_TRANSACTIONS } from '../../api/queries';

export default function SelectDescription({ description, setDescription }) {
  const unique = (arr) => [...new Set(arr)];

  const { loading, error, data } = useQuery(GET_TRANSACTIONS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const txns = data.transactions.filter(txn => txn.description !== "INIT")

  return (
    <Box sx={{ width: 200 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        disableClearable
        value={description}
        onChange={(event, newValue) => {
          setDescription(newValue);
        }}
        inputValue={description}
        onInputChange={(event, newInputValue) => {
          setDescription(newInputValue);
        }}
        options={unique(txns.map((option) => option.description))}
        renderInput={(params) => <TextField {...params} label="Description" />}
      />
    </Box>
  );
}