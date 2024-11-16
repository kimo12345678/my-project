import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { UserCard } from "./components/UserCard"; // Adjust path as necessary
import Sidebar from "./components/Sidebar"; // Import Sidebar
import { CssBaseline } from "@mui/material"; // MUI global styles

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Backend GraphQL server URL
  cache: new InMemoryCache(),
});

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <CssBaseline /> {/* Apply Material-UI baseline styles */}
    <div className="customdisplay"> {/* TailwindCSS classes for layout */}
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div
  className="flex-1 p-4 overflow-y-auto bg-gray-100 custom-content"
>
        {/* UserCard component */}
        <UserCard userId={1} /> {/* Pass userId dynamically */}
      </div>
    </div>
  </ApolloProvider>
);

export default App;
