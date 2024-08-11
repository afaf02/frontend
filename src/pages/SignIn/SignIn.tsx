import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../config/store";
import { Link, useNavigate } from "react-router-dom";
import {
  adminLoginThunk,
  studentsLoginThunk,
} from "../../features/auth/authSlice";
import { ROUTES } from "../../config/constants";

interface SignInFromData {
  email: string;
  password: string;
  userType: "Admin" | "Student";
}

const initialData: SignInFromData = {
  email: "",
  password: "",
  userType: "Student",
};

export default function SignIn() {
  const [formData, setFormData] = useState(initialData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.password || !formData.email)
      return console.log("All feilds are required");
    const payload = { email: formData.email, password: formData.password };
    await dispatch(
      formData.userType === "Admin"
        ? adminLoginThunk(payload)
        : studentsLoginThunk(payload)
    );
    navigate(`/${ROUTES.dashboard}`);
  };

  return (
    <Box
      height={"100%"}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      className="bg-pattern"
      component={"form"}
      onSubmit={handleSubmit}
    >
      <Box
        width={"100%"}
        maxWidth={"25rem"}
        borderRadius={"0.5rem"}
        bgcolor={"#fff"}
        boxShadow={
          "0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
        }
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        p={4}
      >
        <Typography variant="h3" color={"#6BB955"} textAlign={"center"}>
          SMIT
        </Typography>
        <Box width={"100%"}>
          <Typography mx={"auto"} textAlign={"center"}>
            Welcome back
          </Typography>
          <Typography
            mx={"auto"}
            textAlign={"center"}
            color={"rgba(0, 0, 0, 0.54)"}
          >
            Sign in with your credentials below.
          </Typography>
        </Box>
        <TextField
          label="Email"
          name="email"
          variant="filled"
          size="small"
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          variant="filled"
          type="password"
          size="small"
          fullWidth
          value={formData.password}
          onChange={handleChange}
        />
        <FormControl size="small">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
          >
            <FormControlLabel
              value="Student"
              control={<Radio size="small" />}
              label="Student"
            />
            <FormControlLabel
              value="Admin"
              control={<Radio size="small" />}
              label="Admin"
            />
          </RadioGroup>
        </FormControl>
        <Typography textAlign={"center"} color={"rgba(0, 0, 0, 0.54)"}>
          Don't have an account?{" "}
          <Link
            to={`/${ROUTES.signUp}`}
            style={{
              color: "#6BB955",
            }}
          >
            Sign Up
          </Link>
        </Typography>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            borderRadius: 4,
          }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
}
