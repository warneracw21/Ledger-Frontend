import * as React from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import AccountsPanel from './AccountsPanel';
import IncomeTablePanel from './IncomeTablePanel';
import TransactionsPanel from './TransactionsPanel';

export default function LayoutPanel() {

	return (
		<Container>
			<Box sx={{ display: "flex", flexDirection: "column", }} >
				<Box sx={{ display: "flex", flexDirection: "row" }} >
					<Box sx={{ flexGrow: 1 }} >
						<AccountsPanel />
					</Box>
					<Box sx={{ flexGrow: 1 }}>
						<IncomeTablePanel />
					</Box>
				</Box>
				<Box sx={{ flexGrow: 1 }} >
					<TransactionsPanel />
				</Box>
			</Box>
		</Container>
	)
}