import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import BRLogo from "./components/BRLogo";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Subscriptions from "./pages/Subscriptions";
import AddSubscription from "./pages/AddSubscription";
import EditSubscription from "./pages/EditSubscription";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

// Protected layout — Navbar + all app pages, only when logged in
const ProtectedLayout = () => {
  const { user } = useAuthContext();
  if (!user) return <Navigate to="/login" />;
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/"             element={<Dashboard />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/add"          element={<AddSubscription />} />
          <Route path="/edit"         element={<EditSubscription />} />
          <Route path="/history"      element={<History />} />
          <Route path="*"             element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

function AppRoutes() {
  const { user } = useAuthContext();
  console.log("AppRoutes rendering, user:", user, "path:", window.location.pathname);

  return (
    <Routes>
      {/* Splash MUST be first — before any other route */}
      <Route path="/splash" element={<BRLogo />} />

      {/* Public routes */}
      <Route path="/login"    element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

      {/* Protected */}
      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <BrowserRouter>
          <AppRoutes />
          <ToastContainer position="bottom-right" autoClose={2500} />
        </BrowserRouter>
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;