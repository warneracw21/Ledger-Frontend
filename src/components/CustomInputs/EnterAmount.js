import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function EnterAmount({ amount, setAmount }) {

	function handleChange (event) {
		setAmount(event.target.value)
	}

	function formatAmount(amount) {

		const amountStr = amount.toFixed(2).toString()
	}

	return (
	    <Box
	      component="form"
	      noValidate
	      autoComplete="off"
	      style={{ width: 200 }}
	    >
	    	<TextField
	    		fullWidth
	    		id="enter-amount"
	    		label="Enter Amount"
	    		type="number"
	        value={amount}
	        onChange={handleChange}
	        variant="outlined"
		      />
	    </Box>
	);
}