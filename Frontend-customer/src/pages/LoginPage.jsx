import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "notistack";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

// ---- Styled Components ----

const PageWrapper = styled(Box)({
  minHeight: "84vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  background: "#ffffff",
});

const FormCard = styled(Box)({
  width: "100%",
  maxWidth: "450px",
  background: "#fff",
  padding: "30px 26px",
  borderRadius: "16px",
  boxShadow: "0px 4px 22px rgba(0,0,0,0.06)",
  textAlign: "center",
});

const StyledInput = styled(TextField)({
  marginTop: "18px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
  },
});

const SubmitButton = styled(Button)({
  width: "100%",
  height: "48px",
  borderRadius: "10px",
  marginTop: "25px",
  background: "#121212",
  color: "#fff",
  fontWeight: 600,
  "&:hover": {
    background: "#1d1d1d",
  },
});

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login, userInfo } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  

  const validate = () => {
    const temp = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) temp.email = "Enter a valid email";
    if (!password) temp.password = "Password required";
    return temp;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setApiError("");

    const formErrors = validate();
    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      enqueueSnackbar("Logged in successfully", { variant: "success" });
      navigate("/");
    } catch (err) {
      setApiError(err.response?.data?.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <FormCard>
        <Typography variant="h5" fontWeight={700}>
          Sign in
        </Typography>

        <Typography sx={{ color: "#666", mt: 1 }}>
          Welcome back — please login to continue
        </Typography>

        {apiError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {apiError}
          </Alert>
        )}

        <form onSubmit={submitHandler}>
          <StyledInput
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

          <StyledInput
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <SubmitButton type="submit" disabled={loading}>
            {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Sign in"}
          </SubmitButton>
        </form>

        <Divider sx={{ my: 3 }}>or</Divider>

        <Typography sx={{ fontSize: "15px" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ textDecoration: "none", fontWeight: 600, color: "#000" }}
          >
            Create account
          </Link>
        </Typography>
      </FormCard>
    </PageWrapper>
  );
};

export default LoginPage;
