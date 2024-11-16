import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { UserCard } from "./components/UserCard"; // Adjust path as necessary
import Sidebar from "./components/Sidebar"; // Import Sidebar

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Backend GraphQL server URL
  cache: new InMemoryCache(),
});

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div className="App" style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content (UserCard) */}
      <div
        style={{
          width: "95%",
          padding: "0", // Padding around UserCard content
          overflowY: "auto", // Allow scrolling if content exceeds viewport height
        }}
      >
        <UserCard userId={1} /> {/* Pass userId from the backend */}
      </div>
    </div>
  </ApolloProvider>
);

export default App;
