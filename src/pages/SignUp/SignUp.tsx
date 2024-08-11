import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { User } from "../../types/user";
import { studentsRegisterThunk } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../config/store";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface SignUpFromData extends User {
  confirmPassword: string;
}

const initialData: SignUpFromData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp() {
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessFul, setIsSuccessFul] = useState(false);
  const [error, setError] = useState("");
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
    if (formData.password !== formData.confirmPassword)
      return console.log("Password and confirm password should be same.");
    setIsLoading(true);
    const { payload }: any = await dispatch(studentsRegisterThunk(formData));
    setIsLoading(false);
    if (payload.status !== 201) return setError("Error while creating student");
    setIsSuccessFul(true);
    navigate(`/${ROUTES.signIn}`);
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
        maxWidth={"30rem"}
        borderRadius={"0.5rem"}
        bgcolor={"#fff"}
        boxShadow={
          "0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
        }
        display={"grid"}
        gridTemplateColumns={"1fr"}
        gap={2}
        p={4}
      >
        <img src="/logo.png" alt="" width={80} style={{ margin: "0px auto" }} />
        <Box width={"100%"}>
          <Typography mx={"auto"} textAlign={"center"}>
            Welcome to PakZameen
          </Typography>
          <Typography
            mx={"auto"}
            textAlign={"center"}
            color={"rgba(0, 0, 0, 0.54)"}
          >
            Register yourself below to use our services.
          </Typography>
        </Box>
        {error && (
          <Alert variant="outlined" severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}
        <TextField
          label="Name"
          name="name"
          variant="filled"
          size="small"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="E-Mail"
          name="email"
          variant="filled"
          size="small"
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          type="password"
          label="Password"
          name="password"
          variant="filled"
          size="small"
          fullWidth
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          variant="filled"
          size="small"
          fullWidth
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Typography textAlign={"center"} color={"rgba(0, 0, 0, 0.54)"}>
          Already have an account?{" "}
          <Link
            to={`/${ROUTES.signIn}`}
            style={{
              color: "#6BB955",
            }}
          >
            Sign In
          </Link>
        </Typography>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            borderRadius: 4,
          }}
          disabled={isLoading || isSuccessFul}
        >
          {isSuccessFul ? (
            <CheckCircleIcon />
          ) : isLoading ? (
            <CircularProgress size={24.5} color="inherit" />
          ) : (
            "Create"
          )}
        </Button>
      </Box>
    </Box>
  );
}
