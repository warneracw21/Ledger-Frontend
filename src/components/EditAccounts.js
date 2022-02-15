import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import  SelectAccountType from './CustomInputs/SelectAccountType';
import  SelectAccountCategory from './CustomInputs/SelectAccountCategory';
import  SetAccountName from './CustomInputs/SetAccountName';
import  EnterAmount from './CustomInputs/EnterAmount';

import { gql, useQuery, useMutation } from '@apollo/client';
import { GET_TRANSACTIONS, GET_ACCOUNTS, ADD_ACCOUNT, GET_ACCOUNT, EDIT_ACCOUNT, DELETE_ACCOUNT, GET_INCOME_TABLE } from '../api/queries';

export default function EditAccounts() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Edit Accounts
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} >
        <DialogTitle>Edit Accounts</DialogTitle>
        <DialogContent>
          <EditAccountsTable/>
        </DialogContent>

      </Dialog>
    </div>
  )
}

function EditAccountsTable() {

  const { loading, error, data } = useQuery(GET_ACCOUNTS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const accounts = data.accounts.filter(acc => acc.type !== "INIT");

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Edit</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            accounts.map((acc) => (
              <TableRow
                key={`${acc.type}-${acc.category}-${acc.name}`}
              >
                <TableCell>
                  <EditAccountForm account={acc} /></TableCell>
                <TableCell align="left">{acc.type}</TableCell>
                <TableCell align="left">{acc.category}</TableCell>
                <TableCell align="left">{acc.name}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}


function EditAccountForm({ account }) {

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [accountType, setAccountType] = React.useState(account.type);
  const [accountCategory, setAccountCategory] = React.useState(account.category);
  const [accountName, setAccountName] = React.useState(account.name);
  const [initialBalance, setInitialBalance] = React.useState(account.initialBalance);

  const [editAccount, { data, loading, error }] = useMutation(EDIT_ACCOUNT, {
    refetchQueries: [
      GET_ACCOUNTS,
      GET_TRANSACTIONS,
      GET_INCOME_TABLE
    ]
  });

  const [deleteAccount, deleteAccountProps] = useMutation(DELETE_ACCOUNT, {
    refetchQueries: [
      GET_ACCOUNTS,
      GET_TRANSACTIONS,
      GET_INCOME_TABLE
    ]
  })

  const handleSave = () => {

    editAccount({
      variables: {
        id: account.id,
        type: accountType,
        category: accountCategory,
        name: accountName,
        initialBalance: parseFloat(initialBalance === null ? 0 : initialBalance)
      }
    })

    handleClose();
  }

  const handleDelete = () => {

    deleteAccount({
      variables: {
        id: account.id
      }
    })

    handleClose();
  }

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} >
        <DialogTitle>Add Account</DialogTitle>
        <DialogContent>
          <Box style={{minWidth: 200, margin: 10 }}>
            <Stack direction="column" spacing={2}>
              <SelectAccountType
                accountType={accountType}
                setAccountType={setAccountType}
              />
              <SelectAccountCategory
                selectedAccountType={accountType}
                accountCategory={accountCategory}
                setAccountCategory={setAccountCategory}
              />
              <SetAccountName 
                accountName={accountName}
                setAccountName={setAccountName}
              />
              <EnterAmount
                amount={initialBalance}
                setAmount={setInitialBalance} 
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}



