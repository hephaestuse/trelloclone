import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { setUserId } from "../features/user/userSlice";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    mutate({ email, password });
  };
  const {
    mutate,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(setUserId(data.user.id));
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });
  return (
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
        <Box sx={{ mb: 2 }}>
          {isError && (
            <Typography
              sx={{
                color: "error.dark",
                borderRadius: "5px",
                padding: "0.3rem",
                backgroundColor: "error.light",
              }}
            >
              Invalid Email or Password
            </Typography>
          )}
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              wait
              <CircularProgress sx={{ marginX: "0.25rem" }} size={"1.5rem"} />
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Box>
  );
}

export default LoginForm;
