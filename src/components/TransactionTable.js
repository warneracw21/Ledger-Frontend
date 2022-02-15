import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

import SelectAccount from './CustomInputs/SelectAccount';
import EditTransaction from './EditTransaction';

import { gql, useQuery, useMutation } from '@apollo/client';
import { GET_TRANSACTIONS, DELETE_TRANSACTIONS } from '../api/queries';

function dateComparator(date1, date2) {
  return new Date(date1).getTime() - new Date(date2).getTime()
}

function stableSort(array, comparator) {
  array.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return array
}

export default function DataGridDemo() {

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const [filterOperand, setFilterOperand] = React.useState('and');
  const [creditAccountFilter, setCreditAccountFilter] = React.useState(null);
  const [debitAccountFilter, setDebitAccountFilter] = React.useState(null);
  const clearFilters = (event) => {
    event.preventDefault();
    setCreditAccountFilter(null);
    setDebitAccountFilter(null);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { loading, error, data } = useQuery(GET_TRANSACTIONS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // Filter Initializing Transactions
  var transactions = data.transactions.filter(txn => txn.description !== "INIT");

  // Filter Transactions (default to all)
  let allTransactions = transactions;

  if (filterOperand === "or") {
    var creditTransactions = [];
    var debitTransactions = [];

      if (creditAccountFilter !== null) {
        creditTransactions = allTransactions.filter(txn => (txn.creditAccount.id === creditAccountFilter.id))
      }

      if (debitAccountFilter !== null) {
        debitTransactions = allTransactions.filter(txn => (txn.debitAccount.id === debitAccountFilter.id))
      }

      if ((creditTransactions.length !== 0) || (debitTransactions.length !== 0)) {
        allTransactions = [...creditTransactions, ...debitTransactions];
      }
  }

  if (filterOperand === "and") {

      if (creditAccountFilter !== null) {
        allTransactions = allTransactions.filter(txn => (txn.creditAccount.id === creditAccountFilter.id))
      }

      if (debitAccountFilter !== null) {
        allTransactions = allTransactions.filter(txn => (txn.debitAccount.id === debitAccountFilter.id))
      }
  }
  
  const txnsByDate = allTransactions.reduce((txnsByDateObj, txn) => {
    if (Object.keys(txnsByDateObj).includes(txn.date)) {
      txnsByDateObj[txn.date].push(txn);
    } else {
      txnsByDateObj[txn.date] = [txn]
    }
    return txnsByDateObj
  }, {})

  console.log(Object.entries(txnsByDate))

  return (
  <Box>
    <Box mb={5} sx={{height: 400, overflowY: 'auto'}} >
      <Stack direction="row" spacing={2} mb={2} pt={2}>
        <SelectAccount
          selectAccountType="credit"
          account={creditAccountFilter}
          setAccount={(event, account) => setCreditAccountFilter(account)}
        />
        <FormControl>
          <Select
            id="demo-simple-select"
            value={filterOperand}
            onChange={(event) => setFilterOperand(event.target.value)}
          >
            <MenuItem value={'and'}>and</MenuItem>
            <MenuItem value={'or'}>or</MenuItem>
          </Select>
        </FormControl>
        <SelectAccount
          selectAccountType="debit"
          account={debitAccountFilter}
          setAccount={(event, account) => setDebitAccountFilter(account)}
        />
        <IconButton onClick={clearFilters}>
          <ClearIcon />
        </IconButton>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Credit Account</TableCell>
              <TableCell align="right">Debit Account</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(Object.entries(txnsByDate), dateComparator)
              .map(([date, txns]) => (
                <React.Fragment key={`fragment-date-${date}`}>
                  <TableRow key={`row-date-${date}`} sx={{ "& td": { borderBottom: 2 } }}>
                    <TableCell rowSpan={txns.length + 1}>
                      {date}
                    </TableCell>
                  </TableRow>
                  {txns.map((txn, ind) => (
                    <TableRow key={`row-${txn.description}-${ind}`} sx={{ "& td": { 'borderBottom': (ind === (txns.length-1)) ? 2 : 1 } }}>
                      <TableCell align="right">{txn.description}</TableCell>
                      <TableCell align="right">{txn.creditAccount.name}</TableCell>
                      <TableCell align="right">{txn.debitAccount.name}</TableCell>
                      <TableCell align="right">{`$${txn.amount.toFixed(2)}`}</TableCell>
                      <TableCell align="right">
                        <EditTransaction transaction={txn} />
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))
            }

          </TableBody>
        </Table>
        </TableContainer>
{/*        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={txns.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />*/}
      </Box>
  </Box>
  );
}


