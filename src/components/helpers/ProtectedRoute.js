import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const [user, setUser] = useContext(UserContext);

  return (user !== null ? <Outlet /> : <Navigate to={"/"} />)
}

export default ProtectedRoute;