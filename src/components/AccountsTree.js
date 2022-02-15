import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { gql, useQuery } from '@apollo/client';
import { GET_ACCOUNTS } from '../api/queries';

function numberWithCommas(x) {
  if (x == 0) { return "0.00"; }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function AccountsTree() {
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const { loading, error, data } = useQuery(GET_ACCOUNTS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const { accounts } = data;
  console.log(accounts);

  const { treeNodes, nodeIds } = parseAccountsTree(accounts.filter(acc => acc.type !== "INIT"));

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 ? nodeIds : [],
    );
  };


  return (
    <Box sx={{ height: 400, overflowY: 'auto' }}>
      <Box sx={{ mb: 1 }}>
        <Button onClick={handleExpandClick}>
          {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
        </Button>
      </Box>
      <TreeView
        sx={{
          width: 300
        }}
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        onNodeToggle={handleToggle}
        multiSelect
      >
        { treeNodes }
        
      </TreeView>
    </Box>
  );
}

function AccountTreeItem(props) {
  const {
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Typography variant="body1" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="body1" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      {...other}
    />
  );
}

const parseAccountsTree = (accounts) => {
  const unique = (arr) => [...new Set(arr)];

  const accountTypes = ["Asset", "Liability", "Equity"]

  let accountCategories;
  let accCategoryTreeNodes;
  let accType, accCategory;
  let leafAccounts;

  // Iterate over accountTypes
  var sumOfAccountType, sumOfAccountCategory;
  const treeItemNodeIds = [];
  const accTypeTreeNodes = [];
  for (var i=0; i<accountTypes.length; i++) {
    accType = accountTypes[i];

    // Find unique account categories for a given account type
    accountCategories = accounts
        .filter(acc => acc.type === accType)
        .map(acc => acc.category)

    if (accType === "Asset") {
      accountCategories = unique(["Cash", "Receivables", "Savings", "Investments", ...accountCategories])
    
    } else if (accType === "Liability") {
      accountCategories = unique(["Credit", "Payables", "Installments", "Margin", "Debt", ...accountCategories])
    }



    // Iterate over unique account categories
    var categorySums = [];
    accCategoryTreeNodes = [];
    for (var j=0; j<accountCategories.length; j++) {
      accCategory = accountCategories[j];

      // Find all accounts for a given type and category
      leafAccounts = accounts
        .filter(acc => acc.type === accType)
        .filter(acc => acc.category == accCategory)

      // Add account leaf nodes to account category node
      treeItemNodeIds.push(`${i}.${j}`)
      treeItemNodeIds.push(...leafAccounts.map(acc => `${i}.${j}.${acc.id}`));

      sumOfAccountCategory = leafAccounts.reduce((total, acc) => acc.balance + total, 0);
      categorySums.push(sumOfAccountCategory)

      accCategoryTreeNodes.push(
        <AccountTreeItem nodeId={`${i}.${j}`} labelText={accCategory} labelInfo={`$${numberWithCommas(sumOfAccountCategory.toFixed(2))}`}>
          {
            leafAccounts.map(acc => (
              <AccountTreeItem nodeId={`${i}.${j}.${acc.id}`} labelText={acc.name} labelInfo={`$${numberWithCommas(acc.balance.toFixed(2))}`}/>
            ))
          }
        </AccountTreeItem>
      );
    }

    // Add account category nodes to account type node
    sumOfAccountType = categorySums.reduce((total, categorySum) => categorySum + total, 0);

    treeItemNodeIds.push(`${i}`)
    accTypeTreeNodes.push(
      <AccountTreeItem nodeId={`${i}`} labelText={accType} labelInfo={`$${numberWithCommas(sumOfAccountType.toFixed(2))}`}>
        {
          accCategoryTreeNodes
        }
      </AccountTreeItem>
    );
  }

  return {
    treeNodes: accTypeTreeNodes,
    nodeIds: treeItemNodeIds
  }
}