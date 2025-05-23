// src/pages/SearchPage.tsx
import React, { useState } from "react";
import { Box, Button, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import SideNav from "../components/SideNav";
import { fetchWithAuth } from "../utils/auth-fetch";

interface SearchResults {
  id: number;
  companyName: string;
  companyIdentifier: string;
  email: string;
}

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetchWithAuth(
        `/companies/search?searchQuery=${encodeURIComponent(searchQuery)}`
      );

      if (!response || !response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();

      if (data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }

      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await handleSearch();
    }
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  return (
    <>
      <aside className="sidebar">
        <div className="marker-divider"></div>
        <SideNav />
      </aside>
      <main className="main">
        <div className="header">
          <h2>Search Companies</h2>
        </div>

        <Box
          style={{
            display: "flex",
            marginBottom: "20px",
          }}
        >
          <TextField.Root
            style={{
              minWidth: "250",
            }}
            placeholder="Search by company name"
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          <Button ml="2" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        {noResults && <Box>No results found.</Box>}

        {searchResults.length > 0 && (
          <div className="table-container">
            <table className="test-runs-table">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Company Identifier</th>
                  <th>Account Admin Email</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((result) => (
                  <tr key={result.id}>
                    <td>
                      <Link to={`/company/${result.id}`}>
                        {result.companyName}
                      </Link>
                    </td>
                    <td>{result.companyIdentifier}</td>
                    <td>{result.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
};

export default SearchPage;
