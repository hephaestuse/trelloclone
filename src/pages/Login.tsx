import React, { useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import LoginForm from "../components/LoginForm";

const Login: React.FC = () => {
  useEffect(() => {
    document.body.style.backgroundImage = "";
  }, []);

  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundImage: 'url("login.svg")',
            height: "100vh",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "50%", // Set the container to 50% of the page
            textAlign: "center",
            paddingY: "3rem",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            color="#08a3a8"
            sx={{ fontWeight: "bold" }}
          >
            lets do it!
          </Typography>
        </Box>
        <Box sx={{ width: "50%", display: "flex", justifyContent: "center" }}>
          <LoginForm />
        </Box>
      </Container>
    </>
  );
};

export default Login;
