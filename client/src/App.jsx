import { Outlet } from 'react-router-dom';
import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

let uri = 'http://localhost:9000/GraphQL';
if(location.hostname != 'localhost') {
  uri = '/GraphQL';
}

// Apollo Client handles sending GraphQL queries and mutations to the graphQL server and managing the data returned from those operations.
const client = new ApolloClient({
  uri,
  // When ApolloClient sends a query to the server and receives a response, it stores the response data in the cache.
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Outlet />
    </ApolloProvider>
  )
}