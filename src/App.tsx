import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import DonationsPage from "./app/donations/page";
import LandingPage from "./app/Landing";
import ReportPage from "./app/report/page";
import NotFoundPage from "./app/404";
import DonorsPage from "./app/donors/page";
import CampaignsPage from "./app/campaigns/page";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <LandingPage />
              </Layout>
            }
          />
          <Route
            path="/donations"
            element={
              <Layout>
                <DonationsPage />
              </Layout>
            }
          />
          <Route
            path="/donors"
            element={
              <Layout>
                <DonorsPage />
              </Layout>
            }
          />
          <Route
            path="/campaigns"
            element={
              <Layout>
                <CampaignsPage />
              </Layout>
            }
          />
          <Route
            path="/report"
            element={
              <Layout>
                <ReportPage />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <NotFoundPage />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
