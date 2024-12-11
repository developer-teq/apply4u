import axios from "axios";

export const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refresh");
        if (!refreshToken) {
            console.error("No refresh token available. Please log in.");
            return null;
        }
        const response = await axios.post("http://127.0.0.1:8000/apicall/token/refresh/", {
            refresh: refreshToken,
        });
        localStorage.setItem("access", response.data.access); // Update access token
        return response.data.access; // Return the new token
    } catch (error) {
        console.error("Failed to refresh token", error);
        return null;
    }
};
