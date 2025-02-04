import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { useSession } from "../features/user/useSession";
import { setUserId} from "../features/user/userSlice";
const Login: React.FC = () => {
  const [email, setEmail] = useState("xxx@xxx.com");
  const [password, setPassword] = useState("123123");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  useEffect(() => {
    document.body.style.backgroundImage = "";
  }, []);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    mutate({ email, password });
  };
  const { mutate, isLoading, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login successful:", data);

      dispatch(setUserId(session?.user.id));
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });
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
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: 4,
              borderRadius: 2,

              width: "50%", // Set the container to 50% of the page
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
