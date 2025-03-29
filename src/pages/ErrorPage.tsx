import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/"); // Redirect to the login page or home
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            textAlign="center"
        >
            <Typography variant="h4" color="error" gutterBottom>
                404 - Page Not Found
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={2}>
                The page you are looking for does not exist or you entered an invalid department name.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGoBack}>
                Go to Home
            </Button>
        </Box>
    );
};

export default ErrorPage;
