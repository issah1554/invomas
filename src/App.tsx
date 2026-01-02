import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./features/auth/pages/Login";
import RegisterPage from "./features/auth/pages/Register";
import ForgotPasswordPage from "./features/auth/pages/ForgotPassword";
import ResetPasswordPage from "./features/auth/pages/ResetPassword";
import StatusPage from "./pages/StatusPage";
import { AppLayout } from "./components/layout/AppLayout";
import { Dashboard } from "./features/home/pages/Dashboard";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Users } from "./features/iam/pages/Users";
import { Roles } from "./features/iam/pages/Roles";
import { Permissions } from "./features/iam/pages/Permissions";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          {/* public */}
          <Route path="/" element={<LandingPage />} />

          {/* auth */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

          {/* app layout */}
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/permissions" element={<Permissions />} />
          </Route>

          {/* fallback */}
          <Route path="*" element={<StatusPage status="not-found" />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
