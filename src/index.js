import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  HttpLink,
  gql
} from "@apollo/client";

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }

  forward(operation)
})

const httpLink = new HttpLink({
  uri: 'http://192.168.1.213:4000/graphql',
})

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  uri: 'http://192.168.1.213:4000',
  cache: new InMemoryCache(),
  link
});

ReactDOM.render(
  <React.StrictMode>
  	<ApolloProvider client={client}>
    	<App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
