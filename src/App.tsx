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
import { Calendar } from "./features/calendar/pages/Calendar";
import { Products } from "./features/products/pages/Products";
import { Categories } from "./features/products/pages/Categories";
import { Services } from "./features/services/pages/Services";
import { Sales } from "./features/sales/pages/Sales";
import { Expenses } from "./features/expenses/pages/Expenses";
import { Purchases } from "./features/purchases/pages/Purchases";
import { Reports } from "./features/reports/pages/Reports";
import { Settings } from "./features/settings/pages/Settings";
import { Help } from "./features/help/pages/Help";

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
            <Route path="/calendar" element={<Calendar />} />
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
          </Route>

          {/* fallback */}
          <Route path="*" element={<StatusPage status="not-found" />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
