import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { gql, useQuery } from '@apollo/client';
import { GET_INCOME_TABLE } from '../api/queries';

export default function IncomeTable({ startDate, endDate }) {

  const [open, setOpen] = React.useState(false);
  
  const { loading, error, data, refetch } = useQuery(
    GET_INCOME_TABLE,
    {
      variables: { 
        startDate: startDate,
        endDate: endDate
      },
    },
  );

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const incomeItems = data.incomeTable;

  return (
    <TableContainer component={Paper} sx={{ height: 400, overflowY: 'auto' }}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow key={"header"}>
            <TableCell></TableCell>
            <TableCell>Account</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <IncomeTableItemRow
            accounts={incomeItems.revenueAccounts}
            incomeItemType={"Revenue"}
          />
          <IncomeTableItemRow
            accounts={incomeItems.expenseAccounts}
            incomeItemType={"Expenses"}
          />
          <IncomeTableItemRow
            accounts={incomeItems.gainsAccounts}
            incomeItemType={"Gains and Losses"}
          />
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Net Income</TableCell>
            <TableCell align="right">{incomeItems.netIncome.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function IncomeTableItemRow({ accounts, incomeItemType }) {

  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment key={`row-revenue`}>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {incomeItemType}
        </TableCell>
        <TableCell align="right">
          {`$ ${accounts.reduce((tot, acc) => tot + acc.totalAmount, 0).toFixed(2)}`}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Accounts
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Account</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accounts.map((account) => (
                    <TableRow key={`account-${account.account.name}`}>
                      <TableCell>{account.account.name}</TableCell>
                      <TableCell align="right">{`$ ${account.totalAmount.toFixed(2)}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}



