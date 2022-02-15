import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';

import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { gql, useQuery } from '@apollo/client';
import { GET_ACCOUNTS } from '../../api/queries';

export default function SelectAccount({ selectAccountType, account, setAccount }) {

  const { loading, error, data } = useQuery(GET_ACCOUNTS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // Filter accounts
  const accounts = data.accounts.filter(acc => acc.type !== "INIT");

  // Sort Acccounts into Order by Type
  const accountTypes = ["Asset", "Liability", "Equity"];
  accounts.sort((acc1, acc2) => accountTypes.indexOf(acc1.type) - accountTypes.indexOf(acc2.type))

  return (
    <Box sx={{ minWidth: 100, maxWidth: 240, width: 200 }}>
      <Autocomplete
        disablePortal
        id="select-account"
        value={account}
        onChange={(event, newValue) => {
          setAccount(event, newValue);
        }}
        options={accounts}
        groupBy={(option) => option.type}
        getOptionLabel={(option) => option.name}
        sx={{ width: 200 }}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label={selectAccountType === "credit" ? "Credit Account" : "Debit Account"} 
          />
        )}
      />
    </Box>
  );
}

// const parseAccountsList = (accounts) => {
//   const unique = (arr) => [...new Set(arr)];

//   const accountTypes = unique(accounts.map(acc => acc.type));

//   let accountCategories;
//   let accCategoryList;
//   let accType, accCategory;
//   let leafAccounts;

//   // Iterate over accountTypes
//   const accTypeLists = [];
//   for (var i=0; i<accountTypes.length; i++) {
//     accType = accountTypes[i];

//     // Find unique account categories for a given account type
//     accountCategories = unique(accounts
//         .filter(acc => acc.type === accType)
//         .map(acc => acc.category));

//     // Iterate over unique account categories
//     accCategoryList = [];
//     for (var j=0; j<accountCategories.length; j++) {
//       accCategory = accountCategories[j];

//       // Find all accounts for a given type and category
//       leafAccounts = accounts
//         .filter(acc => acc.type === accType)
//         .filter(acc => acc.category == accCategory)
//         .map(acc => ({ name: acc.name, id: acc.id }))

//       accCategoryList.push(<ListSubheader><Typography mt={2} variant="subtitle1">{accCategory}</Typography></ListSubheader>)
//       accCategoryList.push(
//         ...leafAccounts.map(acc => (
//           <MenuItem value={acc.id}>{acc.name}</MenuItem>
//         ))
//       );
//     }

//     // Add account category nodes to account type node
//     accTypeLists.push(<ListSubheader><Typography mt={2} variant="h5">{accType}</Typography></ListSubheader>)
//     accTypeLists.push(...accCategoryList);
//   }

//   console.log(accTypeLists)

//   return accTypeLists
// }