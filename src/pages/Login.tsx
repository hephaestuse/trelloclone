import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import LoginForm from "../components/LoginForm";
import SigneUpForm from "../components/SigneUpForm";

const Login: React.FC = () => {
  const [formNumber, setFormNumber] = React.useState(1);
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
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "20%" }}>
            <BottomNavigation
              sx={{ borderRadius: "7px" }}
              showLabels
              value={formNumber}
              onChange={(_, newValue) => {
                setFormNumber(newValue);
                console.log(formNumber);
              }}
            >
              <BottomNavigationAction label="Login" />
              <BottomNavigationAction label="Sign   up" />
            </BottomNavigation>
          </Box>
          {formNumber ? <SigneUpForm /> : <LoginForm />}
        </Box>
      </Container>
    </>
  );
};

export default Login;
