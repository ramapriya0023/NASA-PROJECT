import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

const ProtectedRoute = ({ children, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
