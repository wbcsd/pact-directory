import React, { useEffect, useState } from "react";
import { Box, Flex } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import { fetchWithAuth } from "../utils/auth-fetch";
import Spinner from "../components/LoadingSpinner";

const MyProfile: React.FC = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    companyName: "",
    companyIdentifier: "",
    companyIdentifierDescription: "",
    fullName: "",
    email: "",
    solutionApiUrl: "",
    clientId: "",
    clientSecret: "",
    networkKey: "",
  });

  const [showCredentials, setShowCredentials] = useState(false);

  const [loadingData, setLoadingData] = useState(true);

  const toggleCredentials = () => {
    setShowCredentials((prevState) => !prevState);
  };

  const maskValue = (value: string) => {
    return value.replace(/.(?=.{4})/g, "*");
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetchWithAuth("/companies/my-profile");

        if (!response || !response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();

        setLoadingData(false);
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [navigate]);

  return (
    <>
      <aside className="sidebar">
        <div className="marker-divider"></div>
        <SideNav />
      </aside>
      {loadingData ? (
        <Box
          style={{
            padding: "20px",
            verticalAlign: "middle",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Spinner />
        </Box>
      ) : (
        <main className="main">
          <div className="header">
            <h2>My Profile: {profileData.companyName}</h2>
          </div>

          <div>
            <h3>Company Identifier</h3>
            <p>{profileData.companyIdentifier}</p>
          </div>
          <div>
            <h3>Company Identifier Description</h3>
            <p>{profileData.companyIdentifierDescription}</p>
          </div>
          <div>
            <h3>Account Admin Full Name</h3>
            <p>{profileData.fullName}</p>
          </div>
          <div>
            <h3>Account Admin Email</h3>
            <p>{profileData.email}</p>
          </div>
          <div>
            <h3>Solution API URL</h3>
            <p>{profileData.solutionApiUrl}</p>
          </div>

          <Flex gap={"3"} style={{ marginTop: "20px", marginBottom: "5px" }}>
            <Box>
              <h2 style={{ margin: 0 }}>Credentials</h2>
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <a
                onClick={toggleCredentials}
                style={{
                  color: "var(--base-color-brand--light-blue)",
                  cursor: "pointer",
                  fontSize: "0.90em",
                  textDecoration: "underline",
                  marginTop: "10px",
                }}
              >
                {showCredentials ? "Hide Credentials" : "Show Credentials"}
              </a>
            </Box>
          </Flex>
          <div>
            <h3>Network Key</h3>
            <p>{profileData.networkKey}</p>
          </div>
          <div>
            <h3>ClientId</h3>
            <p>
              {showCredentials
                ? profileData.clientId
                : maskValue(profileData.clientId)}
            </p>
          </div>
          <div>
            <h3>ClientSecret</h3>
            <p>
              {showCredentials
                ? profileData.clientSecret
                : maskValue(profileData.clientSecret)}
            </p>
          </div>
        </main>
      )}
    </>
  );
};

export default MyProfile;
