import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { signeUpUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { setUserId } from "../features/user/userSlice";
import { insertUserProfile } from "../services/user";

function SigneUpForm() {
  const [email, setEmail] = useState("xxx@xxx.com");
  const [password, setPassword] = useState("123123");
  const [confirmPassword, setConfirmPassword] = useState("123123");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === confirmPassword) {
      mutate({ email, password });
    } else {
      console.log("Passwords do not match");
    }
  };

  const {
    mutate,
    isError,
    isPending: isLoading,
  } = useMutation({
    mutationFn: signeUpUser,
    onSuccess: (data) => {
      console.log("Sign up successful:", data);
      const userId = data.user?.id; // Assuming the response contains the user ID
      dispatch(setUserId(userId));
      insertUserProfile({ user_id: userId, username: email });
      navigate("/dashboard"); // Redirect to dashboard or any other page
    },
    onError: (error) => {
      console.error("Sign up error:", error.message);
    },
  });

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: 4,
        borderRadius: 2,
        width: "50%",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
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
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Box>
        {isError && (
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                color: "error.dark",
                borderRadius: "5px",
                padding: "0.3rem",
                backgroundColor: "error.light",
              }}
            >
              Sign Up Error
            </Typography>
          </Box>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              Wait
              <CircularProgress sx={{ marginX: "0.25rem" }} size={"1.5rem"} />
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Box>
  );
}

export default SigneUpForm;
