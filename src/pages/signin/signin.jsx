/** @format */

import React, { useState } from "react";
import { Button, TextField, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    borderRadius: "10px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(4),
  },
  textField: {
    "& .MuiInputBase-input": {
      color: "black",
      backgroundColor: "white",
      borderTopLeftRadius: "10px",
    },
    "& #password": {
      marginTop: "10px",
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#5cb85c",
    color: "#FFFFFF",
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "Admin123" && password === "Admin321") {
      localStorage.setItem("role", "admin");
      localStorage.setItem("username", username); // Store username
      localStorage.setItem("password", password); // Store password
      navigate("/dashboard");
    } else if (username === "Engineer123" && password === "Engineer321") {
      localStorage.setItem("role", "engineer");
      localStorage.setItem("username", username); // Store username
      localStorage.setItem("password", password); // Store password
      navigate("/dashboard");
    } else if (username === "Wherehouse123" && password === "Wherehouse321") {
      localStorage.setItem("role", "warehouse");
      localStorage.setItem("username", username); // Store username
      localStorage.setItem("password", password); // Store password
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="backImg">
      <Container component="main" maxWidth="xs">
        <div>
          <Typography variant="h4" align="center">
            LOG IN
          </Typography>
          <div className={classes.form}>
            <TextField
              className={classes.textField}
              variant="filled"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              className={classes.textField}
              variant="filled"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
