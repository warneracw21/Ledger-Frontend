import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import AddAccount from './AddAccount';
import EditAccounts from './EditAccounts';
import AccountsTree from './AccountsTree';

export default function AccountsPanel() {
  const [open, setOpen] = React.useState(false);

  const EditAccountsDialog = () => {
    return (<div/>)
  }

  return (
    <Box
      component={Paper}
      sx={{
        margin: 2,
        padding: 1,
        minWidth: 350,
      }}
    >
      <Stack spacing={2}>
        <Stack spacing={2} direction="row">
          <AddAccount />
          <EditAccounts/>
        </Stack>
        <AccountsTree />
      </Stack>
    </Box>
  );
}