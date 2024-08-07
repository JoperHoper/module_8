import { useEffect, useState } from "react";
import {
  TextField,
  Checkbox,
  Button,
  Paper,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { FormControl, FormControlLabel } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMainContext } from "../store/mainStore";

export const LoginForm = () => {
  // states
  const { handleUpdateUser } = useMainContext();
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [hasSubmit, setHasSubmit] = useState(false);

  const standardTopPadding = { pt: "10px" };
  const standardTopMargin = { mt: "10px" };

  useEffect(() => {
    if (hasSubmit) {
      navigateTo("/home");
    }
  }, [hasSubmit]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = () => {
    // API CALL



    axios
      .post("http://localhost:8000/user-auth", { email, password })
      .then((response) => {
        // Handle the response here
        // Do something with the response
        console.log("user auth response", response.data);
        if (response.data.auth_token) {
          handleUpdateUser(response.data);
          console.log("user auth response", response.data);
          setHasSubmit(true);
        }
      })
      .catch((error) => {
        console.log("user auth error", error);
        // Handle any errors here
        // Do something with the error
      });

    // setHasSubmit(true);
  };

  const displayAlert = () => {
    // WHAT IF FAILED?
    return hasSubmit ? (
      <Alert severity="success">welcome back, {email}</Alert>
    ) : (
      <></>
    );
  };

  return (
    <Box
      display={"flex"}
      bgcolor={"lightblue"}
      width={"inherit"}
      height={"inherit"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box position={"absolute"} top="150px">
        {displayAlert()}
      </Box>

      <Paper sx={{ padding: "10px" }}>
        <Typography variant="h4">Login</Typography>
        <FormControl>
          <TextField
            label="Email"
            variant="outlined"
            sx={standardTopPadding}
            onChange={handleEmailChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            sx={standardTopPadding}
            onChange={handlePasswordChange}
            type="password"
          />
          <FormControlLabel
            control={
              <Checkbox value={rememberMe} onChange={handleRememberMeChange} />
            }
            label="Remember Me"
          />

          <Button
            variant="contained"
            sx={standardTopMargin}
            disabled={!email || !password}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Box sx={standardTopMargin}>
            <Link to="/register">Register</Link>
          </Box>
        </FormControl>
      </Paper>
    </Box>
  );
};
