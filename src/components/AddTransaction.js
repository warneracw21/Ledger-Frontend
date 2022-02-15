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
import DialogTitle from '@mui/material/DialogTitle';

import SelectAccount from './CustomInputs/SelectAccount';
import EnterAmount from './CustomInputs/EnterAmount';
import SelectDate from './CustomInputs/SelectDate';
import SelectDescription from './CustomInputs/SelectDescription';

import { gql, useMutation, useQuery } from '@apollo/client';
import { GET_ACCOUNTS, GET_TRANSACTIONS, ADD_TRANSACTION, GET_INCOME_TABLE } from '../api/queries';
const moment = require('moment');

export default function AddTransaction() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    // setDate(moment(new Date()).format('YYYY-MM-DD'));
    setDescription('');
    setCreditAccount(null);
    setDebitAccount(null);
    setAmount(null)
    setOpen(false);
    setTxnNote('')
  };

  const [date, setDate] = React.useState(moment(new Date()).format('YYYY-MM-DD'));
  const [description, setDescription] = React.useState('');
  const [creditAccount, setCreditAccount] = React.useState(null);
  const [debitAccount, setDebitAccount] = React.useState(null);
  const [amount, setAmount] = React.useState(null);
  const [txnNote, setTxnNote] = React.useState('');

  const [addTransaction, { data, loading, error }] = useMutation(ADD_TRANSACTION, {
    refetchQueries: [
      GET_TRANSACTIONS,
      GET_ACCOUNTS,
      GET_INCOME_TABLE
    ]
  });
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const handleSave = () => {

    addTransaction({
      variables: {
        date, description, 
        amount: parseFloat((amount === null || (amount === '')) ? 0.0 : amount),
        creditAccount: creditAccount.id, 
        debitAccount: debitAccount.id,
        note: txnNote
      }
    })
    handleClose()

  }

  return (
    <Box >
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Add Transaction
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} >
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          <Box style={{minWidth: 200, margin: 10 }}>
            <Stack direction="column" spacing={2}>
              <SelectDate 
                date={date}
                setDate={setDate}/>
              <SelectDescription 
                description={description}
                setDescription={setDescription}
              />
              <SelectAccount 
                selectAccountType="credit"
                account={creditAccount}
                setAccount={(event, account) => setCreditAccount(account)}
              />
              <SelectAccount 
                selectAccountType="debit"
                account={debitAccount}
                setAccount={(event, account) => setDebitAccount(account)}
              />
              <EnterAmount 
                amount={amount}
                setAmount={setAmount}/>
              <TextField
                placeholder="Notes ..."
                multiline
                value={txnNote}
                onChange={(event) => setTxnNote(event.target.value)}
                rows={2}
                maxRows={4}
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}