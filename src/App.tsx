import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthLayout from "./features/auth/components/AuthLayout";
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
import { Products } from "./features/products/pages/Products";
import { Categories } from "./features/products/pages/Categories";
import { Services } from "./features/services/pages/Services";
import { Sales } from "./features/sales/pages/Sales";
import { Expenses } from "./features/expenses/pages/Expenses";
import { Purchases } from "./features/purchases/pages/Purchases";
import { Reports } from "./features/reports/pages/Reports";
import { Settings } from "./features/settings/pages/Settings";
import { Help } from "./features/help/pages/Help";
import { Notifications } from "./features/notifications/pages/Notifications";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          {/* public */}
          <Route path="/" element={<LandingPage />} />

          {/* auth */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
          </Route>

          {/* app layout */}
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Dashboard />} />
            {/* IAM */}
            <Route path="/users" element={<Users />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/permissions" element={<Permissions />} />
            {/* Products & Services */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/categories" element={<Categories />} />
            <Route path="/services" element={<Services />} />
            {/* Business */}
            <Route path="/sales" element={<Sales />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/reports" element={<Reports />} />
            {/* Settings & Help */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>

          {/* fallback */}
          <Route path="*" element={<StatusPage status="not-found" />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
