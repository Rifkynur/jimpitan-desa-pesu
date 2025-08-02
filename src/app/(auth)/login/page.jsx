"use client";
import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={(theme) => ({
          width: "100%",
          border: "1px solid #ededed",
          borderRadius: "16px",
          bgcolor: "#1e1611",
          backdropFilter: "blur(10px)",

          [theme.breakpoints.down("sm")]: {
            maxWidth: "300px",
            width: "100%",
            padding: "16px",
            gap: "20px",
          },
          [theme.breakpoints.up("md")]: {
            padding: "16px",
            gap: "40px",
            maxWidth: "500px",
            padding: "20px",
          },
        })}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Typography
            sx={(theme) => ({
              fontWeight: "700",
              [theme.breakpoints.down("sm")]: {
                fontSize: "20px",
              },
              [theme.breakpoints.up("md")]: {
                fontSize: "40px",
              },
            })}
          >
            Selamat Datang!
          </Typography>
          <Typography
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                fontSize: "18px",
              },
              [theme.breakpoints.up("md")]: {
                fontSize: "30px",
              },
            })}
          >
            Masuk ke akun anda
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email", {
              required: "Email wajib diisi",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Format email yang anda masukan salah",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FaEnvelope color="#fff" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "rgba(255,255,255,0.05)",
                color: "#fff",
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "#ededed" },
                "&.Mui-focused fieldset": { borderColor: "#ededed" },
              },
              "& .MuiInputLabel-root": { color: "#ccc" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            {...register("password", {
              required: "Password wajib diisi",
              minLength: {
                value: 6,
                message: "Password minimal 6 karakter",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? (
                      <FaEyeSlash color="#fff" />
                    ) : (
                      <FaEye color="#fff" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "rgba(255,255,255,0.05)",
                color: "#fff",
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "#ededed" },
                "&.Mui-focused fieldset": { borderColor: "#ededed" },
              },
              "& .MuiInputLabel-root": { color: "#ccc" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
            }}
          />
          <Button
            variant="contained"
            sx={(theme) => ({
              width: "100%",
              borderRadius: "12px",
              bgcolor: "#fe6c00",
              [theme.breakpoints.down("sm")]: {
                py: "6px",
              },
              [theme.breakpoints.up("md")]: {
                width: "75px",
              },
            })}
            type="submit"
          >
            Login
          </Button>
          <Button
            onClick={() => router.push("/dashboard")}
            variant="contained"
            sx={(theme) => ({
              width: "100%",
              borderRadius: "12px",
              bgcolor: "#fe1e00",
              [theme.breakpoints.down("sm")]: {
                py: "6px",
              },
              [theme.breakpoints.up("md")]: {
                width: "75px",
              },
            })}
            type="button"
          >
            Back
          </Button>
        </Box>
        <Typography
          sx={(theme) => ({
            textAlign: "center",
            [theme.breakpoints.down("sm")]: {
              fontSize: "8px",
            },
            [theme.breakpoints.up("md")]: {
              fontSize: "12px",
            },
          })}
        >
          &copy; Sedyo Utomo
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoginPage;
