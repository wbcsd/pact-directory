import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyProfile from "./pages/MyProfile";
import SearchPage from "./pages/SearchPage";
import CompanyProfile from "./pages/CompanyProfile";
import ManageConnections from "./pages/ManageConnections";
import ConformanceTesting from "./pages/ConformanceTesting";
import ConformanceTestResult from "./pages/ConformanceTestResult";
import pactLogo from "./assets/pact-logo.svg";
import { ConformanceTestingProvider } from "./components/ConformanceTesting";
import ConformanceTestRuns from "./pages/ConformanceTestRuns";

const App: React.FC = () => {
  return (
    <Router>
      <ConformanceTestingProvider>
        <div className="top-bar">
          <div className="logo">
            <img width={96} src={pactLogo} alt="Pact Logo" />
          </div>
          <div className="search-bar"></div>
        </div>
        <div className="container">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/company/:id" element={<CompanyProfile />} />
            <Route path="/manage-connections" element={<ManageConnections />} />
            <Route
              path="/conformance-testing"
              element={<ConformanceTesting />}
            />
            <Route
              path="/conformance-test-result"
              element={<ConformanceTestResult />}
            />
            <Route
              path="/conformance-test-runs"
              element={<ConformanceTestRuns />}
            />
            <Route path="/" element={<Navigate to="/signup" />} />
          </Routes>
        </div>
      </ConformanceTestingProvider>
    </Router>
  );
};

export default App;
