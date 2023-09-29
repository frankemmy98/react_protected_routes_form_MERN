import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    // checking if theres a user, then indicating to us wether the user is logged in or not.
    // otherwise, there wouldnt be an auth.
    auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
      // this outlet represents any child component of the required auth
      <Outlet />
    ) : auth?.user ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      // sending anyonee that is not logged in to the log in page
      // replacing the /login in the navigation history with the location that they came from
      <Navigate to="/login" state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
