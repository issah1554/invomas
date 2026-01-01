// App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./features/auth/pages/Login";
import RegisterPage from "./features/auth/pages/Register";
import ForgotPasswordPage from "./features/auth/pages/ForgotPassword";
import ResetPasswordPage from "./features/auth/pages/ResetPassword";
import StatusPage from "./pages/StatusPage";
import { Dashboard } from "./features/home/pages/Dashboard";
import { Accounts } from "./features/finance/Accounts";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/projects" element={<Accounts />} />
          <Route path="/settings" element={<Accounts />} />
          <Route path="/calendar" element={<Accounts />} />
          <Route path="/tasks" element={<Accounts />} />
          <Route path="/chats" element={<Accounts />} />
          <Route path="/obligations" element={<Accounts  />} />

          <Route path="*" element={<StatusPage status="not-found" />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;