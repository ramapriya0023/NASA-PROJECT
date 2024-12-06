import React, { createContext, useState, useEffect, useContext } from "react";

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user details when the app loads
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:8001/auth/user", {
          credentials: "include", // Include session cookies
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user); // Set authenticated user
        } else {
          setUser(null); // Not logged in
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUser(null);
      } finally {
        setLoading(false); // Done loading
      }
    };

    fetchUserDetails();
  }, []);

  // Context value to provide authentication state
  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
