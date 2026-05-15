// src/App.tsx
import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import ReactGA from "react-ga4";

import LoadingBox from "./utilities/message loading/LoadingBox";
import ErrorBoundary from "./utilities/error/ErrorBoundary";
import useScrollToTop from "./utilities/scroll to top/ScrollToTop";
import ProtectedRoute from "./utilities/protectedroute/ProtectedRoute";

// Screen Imports
import HomeScreen from "./screens/homescreen/HomeScreen";
import UnauthorizedScreen from "./utilities/error/UnauthorizedScreen";
import LoginScreen from "./screens/formscreens/LoginScreen";
import ForgotPasswordScreen from "./screens/formscreens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/formscreens/ResetPasswordScreen";
import SubmitWorkScreen from "./screens/formscreens/SubmitWorkScreen";
import PublicationsCatalogScreen from "./screens/publicationscreen/PublicationsCatalogScreen";
import PublicationDetailScreen from "./screens/publicationscreen/PublicationDetailScreen";
import ExternalCatalogScreen from "./screens/externalcatscreen/ExternalCatalogScreen";
import SubscriptionScreen from "./screens/paymentscreens/SubscriptionScreen";
import UserDashboardScreen from "./screens/dashboardscreens/UserDashboardScreen";
import AdminDashboardScreen from "./screens/adminscreens/AdminDashboardScreen";

// New Screen Imports

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTop();

  ReactGA.initialize(import.meta.env.VITE_REACT_APP_GOOGLE_TRACKING, {
    gaOptions: {
      userId: 123,
    },
  });

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div>
        <LoadingBox />
      </div>
    );
  }

  return (
    <div className="app">
      <Toaster expand visibleToasts={1} richColors position="top-right" />

      <Routes>
        {/* Error Routes */}
        <Route path="/unauthorized" element={<UnauthorizedScreen />} />
        <Route path="*" element={<ErrorBoundary />} />

        {/* Public Routes */}
        <Route path="/" element={<HomeScreen />} />
        <Route path="/catalog" element={<PublicationsCatalogScreen />} />
        <Route path="/publication/:id" element={<PublicationDetailScreen />} />
        <Route path="/external-catalog" element={<ExternalCatalogScreen />} />
        <Route path="/subscription" element={<SubscriptionScreen />} />

        {/* Form Routes */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />
        <Route path="/submit-work" element={<SubmitWorkScreen />} />

        {/* Protected Routes - Require Authentication */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboardScreen />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/upload"
          element={
            <ProtectedRoute
              allowedRoles={["lecturer", "researcher", "admin", "editor"]}
            >
              <UploadPublicationScreen />
            </ProtectedRoute>
          }
        /> */}

        {/* Admin Only Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboardScreen />
            </ProtectedRoute>
          }
        />

        {/* Editorial Routes
        <Route
          path="/editorial"
          element={
            <ProtectedRoute allowedRoles={["editor", "admin"]}>
              <EditorialDashboardScreen />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
