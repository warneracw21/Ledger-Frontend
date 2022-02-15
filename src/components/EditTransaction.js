import * as React from 'react';
import * as moment from 'moment';

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

import SelectAccount from './CustomInputs/SelectAccount';
import EnterAmount from './CustomInputs/EnterAmount';
import SelectDate from './CustomInputs/SelectDate';
import SelectDescription from './CustomInputs/SelectDescription';

import { gql, useQuery, useMutation } from '@apollo/client';
import { GET_ACCOUNTS, GET_TRANSACTIONS, EDIT_TRANSACTION, DELETE_TRANSACTIONS, GET_INCOME_TABLE } from '../api/queries';

export default function EditTransactionForm({ transaction }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [date, setDate] = React.useState(transaction.date);
  const [description, setDescription] = React.useState(transaction.description);
  const [creditAccount, setCreditAccount] = React.useState(transaction.creditAccount);
  const [debitAccount, setDebitAccount] = React.useState(transaction.debitAccount);
  const [amount, setAmount] = React.useState(transaction.amount);
  const [txnNote, setTxnNote] = React.useState(transaction.note || '');

  const [editTransaction, { data, loading, error }] = useMutation(EDIT_TRANSACTION, {
    refetchQueries: [
      GET_TRANSACTIONS,
      GET_ACCOUNTS,
      GET_INCOME_TABLE
    ]
  });

  const [deleteTransactions, deleteTransactionsProps] = useMutation(DELETE_TRANSACTIONS, {
    refetchQueries: [
      GET_TRANSACTIONS,
      GET_ACCOUNTS,
      GET_INCOME_TABLE
    ]
  })

  const handleSave = () => {

    editTransaction({
      variables: {
        id: transaction.id,
        date, description, 
        amount: parseFloat(amount === null ? 0 : amount),
        creditAccount: creditAccount.id, 
        debitAccount: debitAccount.id,
        note: txnNote
      }
    })

    handleClose();
  }

  const handleDelete = () => {

    deleteTransactions({
      variables: {
        ids: [transaction.id]
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
        <DialogTitle>Edit Transaction</DialogTitle>
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
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}



