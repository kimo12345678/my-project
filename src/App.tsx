import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"; // ApolloClient import
import { UserCard } from "./components/UserCard"; // Adjust path as necessary

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Backend GraphQL server URL
  cache: new InMemoryCache(),
});

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <UserCard userId={1} /> {/* Pass userId from the backend */}
    </div>
  </ApolloProvider>
);

export default App;
