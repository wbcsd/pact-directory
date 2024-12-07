import React, { useEffect, useState } from "react";
import { Box, Button, AlertDialog, Flex } from "@radix-ui/themes";
import { Link } from "react-router-dom";

interface ConnectionRequest {
  id: number;
  companyName: string;
  companyId: number;
  status: string;
  createdAt: Date;
}

interface ConnectedOrganization {
  companyId: number;
  companyName: string;
  requestedAt: Date;
  createdAt: Date;
}

const ManageConnections: React.FC = () => {
  const [connectionsData, setConnectionsData] = useState<{
    sent: ConnectionRequest[];
    received: ConnectionRequest[];
    connectedCompanies: ConnectedOrganization[];
  }>({
    sent: [],
    received: [],
    connectedCompanies: [],
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchConnectionsData = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(
        `${import.meta.env.VITE_DIRECTORY_API_URL}/companies/my-profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch connections data");
      }

      const data = await response.json();

      setConnectionsData({
        ...data.connectionRequests,
        connectedCompanies: data.connectedCompanies,
      });
    } catch (error) {
      console.error("Error fetching connections data:", error);
    }
  };

  useEffect(() => {
    fetchConnectionsData();
  }, []);

  const handleAccept = async (requestId: number) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(
        `${
          import.meta.env.VITE_DIRECTORY_API_URL
        }/companies/connection-request-action`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ requestId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept connection request");
      }

      setIsDialogOpen(true);

      await fetchConnectionsData();
    } catch (error) {
      console.error("Error accepting connection request:", error);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <AlertDialog.Root open={isDialogOpen}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Connection request accepted</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Now both companies are able to exchange PCF data through PACT
            conformant apis using the authentication service.
          </AlertDialog.Description>

          <Flex mt="4" justify="center">
            <AlertDialog.Action>
              <Button onClick={handleDialogClose} variant="solid" color="blue">
                Ok
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <Box
        style={{
          padding: "20px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h2>Manage Connections</h2>
        <Box>
          <h3>Connected organizations</h3>
          {connectionsData.connectedCompanies.length > 0 ? (
            <ul>
              {connectionsData.connectedCompanies.map((connection) => (
                <li key={connection.companyId}>
                  <p>
                    <Link to={`/company/${connection.companyId}`}>
                      {connection.companyName}
                    </Link>
                  </p>
                  <p>
                    Connected At:{" "}
                    {new Date(connection.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No connected organizations.</p>
          )}
        </Box>
        <Box>
          <h3>Sent Connection Requests</h3>
          {connectionsData.sent.length > 0 ? (
            <ul>
              {connectionsData.sent.map((request, index) => (
                <li key={index}>
                  <p>
                    <Link to={`/company/${request.companyId}`}>
                      {request.companyName}
                    </Link>
                  </p>
                  <p>Status: {request.status}</p>
                  <p>
                    Created At: {new Date(request.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No sent connection requests.</p>
          )}
        </Box>
        <Box>
          <h3>Received Connection Requests</h3>
          {connectionsData.received.length > 0 ? (
            <ul>
              {connectionsData.received.map((request) => (
                <li key={request.id}>
                  <Link to={`/company/${request.companyId}`}>
                    {request.companyName}
                  </Link>
                  <p>Status: {request.status}</p>
                  <p>
                    Created At: {new Date(request.createdAt).toLocaleString()}
                  </p>

                  <Button onClick={() => handleAccept(request.id)}>
                    Accept
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No received connection requests.</p>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ManageConnections;
