import * as React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
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

import EnterAmount from './CustomInputs/EnterAmount';
import SelectAccountType from './CustomInputs/SelectAccountType';
import SelectAccountCategory from './CustomInputs/SelectAccountCategory';
import SetAccountName from './CustomInputs/SetAccountName';

import { gql, useQuery, useMutation } from '@apollo/client';
import { GET_ACCOUNTS, ADD_ACCOUNT, GET_INCOME_TABLE } from '../api/queries';


export default function AddAccount() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setAccountType('');
    setAccountCategory('');
    setAccountName('');
    setInitialBalance(null);
    setOpen(false);
  };

  const [accountType, setAccountType] = React.useState('');
  const [accountCategory, setAccountCategory] = React.useState('');
  const [accountName, setAccountName] = React.useState('');
  const [initialBalance, setInitialBalance] = React.useState(null);

  const [addAccount, { data, loading, error }] = useMutation(ADD_ACCOUNT, {
    refetchQueries: [
      GET_ACCOUNTS,
      GET_INCOME_TABLE
    ]
  });
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const handleSave = () => {

    const balance = parseFloat(initialBalance === null ? 0 : initialBalance);
    console.log(balance)

    addAccount({
      variables: {
        type: accountType,
        category: accountCategory,
        name: accountName,
        initialBalance: parseFloat(initialBalance === null ? 0 : initialBalance)
      }
    })
    handleClose();
  }

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Add Account
      </Button>
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
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}





