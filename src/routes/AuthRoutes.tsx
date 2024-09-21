import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "@redux/store";

import LoginPage from "@domains/auth/pages/LoginPage";
import ForgotPasswordPage from "@domains/auth/pages/ForgotPasswordPage";

const AuthRoutes = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  );
};

export default AuthRoutes;