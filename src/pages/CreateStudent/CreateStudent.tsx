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
import { useAppDispatch } from "../../config/store";
import { useNavigate } from "react-router-dom";
import { studentsRegisterThunk } from "../../features/auth/authSlice";
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

export default function CreateStudentForm() {
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
    console.log(payload);
    setIsLoading(false);
    if (payload.status !== 201) return setError("Error while creating student");
    setIsSuccessFul(true);
  };

  return (
    <Box
      p={4}
      height={"100%"}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        width={"100%"}
        maxWidth={"30rem"}
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
        <Typography mx={"auto"} textAlign={"center"} variant="h5">
          Create Student
        </Typography>
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
