import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"; // ApolloClient import
import { UserCard } from "./components/UserCard"; // Adjust path as necessary

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Backend GraphQL server URL
  cache: new InMemoryCache(),
});

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div className="App" style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "5%", 
          backgroundColor: "#333", // Sidebar background color
          color: "#fff", // Sidebar text color
          padding: "1rem", // Padding inside sidebar
        }}
      >
        Sidebar
      </div>

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
