import { Navigate, Outlet } from "react-router-dom";
import authStore from "../service/services/authStore.service"; // Import Zustand store

const ProtectedRoutes = () => {
  const { authenticated } = authStore();

 

  // If authenticated, render protected routes. Otherwise, redirect to login.
  return authenticated ? <Outlet /> : <Navigate to="/login"/>;
};

export default ProtectedRoutes;
