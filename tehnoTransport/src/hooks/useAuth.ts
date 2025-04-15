import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import refreshAuthToken from "../tools/refreshToken";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const refreshTokenInterval = setInterval(async () => {
      try {
        const refreshedData = await refreshAuthToken();
        if (!refreshedData) {
          console.error("Session expired. Redirecting to login.");
          setIsAuthenticated(false);
          navigate("/login");
        }
      } catch (error) {
        console.error("Token refresh error:", error);
      }
    }, 1 * 60 * 1000); // Refresh every 1 minutes

    return () => clearInterval(refreshTokenInterval);
  }, [navigate]);

  return { isAuthenticated };
}
