export const login = (token) => {
    localStorage.setItem("access", token);
  };
  
  export const logout = () => {
    localStorage.removeItem("access");
  };
  
  export const isAuthenticated = () => {
    const token = localStorage.getItem("access");
    // Optionally add token validation logic here
    return token ? true : false;
  };
  