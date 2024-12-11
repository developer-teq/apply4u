import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "./auth";  // Utility functions


const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          
            
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
