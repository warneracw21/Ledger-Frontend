import { gql } from '@apollo/client';

const ETH_PRICE = gql`
  query EthPrice {
    ethPrice {
      price
    }
  }
`;

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
    	id
      date
      description
      creditAccount {
      	id
      	name
      }
      debitAccount {
      	id
      	name
      }
      amount
      note
    }
  }
`

const GET_TRANSACTION = gql`
  query GetTransaction($id: ID!) {
    transaction(id: $id) {
      id
      description
      date
      amount
      credit_account {
        id
        name
      }
      debit_account {
        id
        name
      }
      note
    }
  }
`

const DELETE_TRANSACTIONS = gql`
  mutation DeleteTransactions($ids: [ID]) {
    deleteTransactions(ids: $ids) {
      id
      description
      date
      amount
    }
  }
`

const ADD_TRANSACTION = gql`
  mutation AddTransaction(
    $date: String!, 
    $description: String!
    $creditAccount: ID!
    $debitAccount: ID!
    $amount: Float!
    $note: String!
  ) {
    addTransaction(
      date: $date
      description: $description
      creditAccountId: $creditAccount
      debitAccountId: $debitAccount
      amount: $amount
      note: $note
    ) {
      date
      description
      creditAccount {
      	id
      	name
      }
      debitAccount {
      	id
      	name
      }
      amount
    }
  }
`

const EDIT_TRANSACTION = gql`
  mutation AddTransaction(
    $id: ID!
    $date: String!, 
    $description: String!
    $creditAccount: ID!
    $debitAccount: ID!
    $amount: Float!
    $note: String!
  ) {
    editTransaction(
      id: $id
      date: $date
      description: $description
      creditAccountId: $creditAccount
      debitAccountId: $debitAccount
      amount: $amount
      note: $note
    ) {
      date
      description
      creditAccount {
        id
        name
      }
      debitAccount {
        id
        name
      }
      amount
    }
  }
`

const GET_ACCOUNT = gql`
  query getAccount {
    getAccount(
      id: $id 
    ) {
      id
      type
      name
      initialBalance
      balance
    }
  }
`

const GET_ACCOUNTS = gql`
  query getAccounts {
    accounts {
      id
      type
      category
      name
      initialBalance
      balance
    }
  }
`

const ADD_ACCOUNT = gql`
  mutation AddAccount(
    $type: String!
    $category: String!
    $name: String!
    $initialBalance: Float!
  ) {
    addAccount(
      type: $type
      category: $category
      name: $name
      initialBalance: $initialBalance
    ) {
      id
      name
    }
  }
`

const EDIT_ACCOUNT = gql`
  mutation EditAccount(
    $id: ID!
    $type: String!
    $category: String!
    $name: String!
    $initialBalance: Float!
  ) {
    editAccount(
      id: $id
      type: $type
      category: $category
      name: $name
      initialBalance: $initialBalance
    ) {
      id
      name
    }
  }
`

const DELETE_ACCOUNT = gql`
  mutation DeleteAccount(
    $id: ID!
  ) {
    deleteAccount(
      id: $id
    ) {
      id
    }
  }
`

const GET_INCOME_TABLE = gql`
  query IncomeTable(
    $startDate: String!
    $endDate: String!
  ) {
    incomeTable(
      startDate: $startDate
      endDate: $endDate
    ) {
      revenueAccounts {
        incomeType
        account {
          id
          name
        }
        totalAmount
      }
      expenseAccounts {
        incomeType
        account {
          id
          name
        }
        totalAmount
      }
      gainsAccounts {
        incomeType
        account {
          id
          name
        }
        totalAmount
      }
      netIncome
    }
  }
`

export { 
  GET_TRANSACTIONS, 
  GET_TRANSACTION, 
  ADD_TRANSACTION, 
  DELETE_TRANSACTIONS,
  EDIT_TRANSACTION,
  GET_ACCOUNTS,
  GET_ACCOUNT,
  ADD_ACCOUNT,
  EDIT_ACCOUNT,
  DELETE_ACCOUNT,
  GET_INCOME_TABLE,

  ETH_PRICE
}








