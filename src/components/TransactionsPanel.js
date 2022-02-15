import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import AddTransaction from './AddTransaction';
import TransactionTable from './TransactionTable';

export default function TransactionsPanel() {
  return (
    <Box
    	component={Paper}
    	sx={{
    		padding: 1,
    		margin: 2,
        	minWidth: 750,
    	}}>
      <Stack spacing={2}>
        <AddTransaction />
        <TransactionTable />
      </Stack>
    </Box>
  );
}