import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../../config/store";
import { ChangeEvent, FormEvent, useState } from "react";
import { createReviewThunk } from "../../features/review/reviewSlice";
import { Review } from "../../types/review";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TEACHERS } from "../../config/constants";

const initialData: Review = {
  teacher: "",
  feedback: "",
  rating: 0,
};

export default function FeedbackForm() {
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessFul, setIsSuccessFul] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

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
    setIsLoading(true);
    const { payload }: any = await dispatch(createReviewThunk(formData));
    setIsLoading(false);
    if (payload.status !== 201)
      return setError("Error while providing feedback");
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
          Feedback Form
        </Typography>
        <Typography
          mx={"auto"}
          mb={1}
          textAlign={"center"}
          color={"rgba(0, 0, 0, 0.54)"}
        >
          Your feedback is kept annonymous.
        </Typography>
        {error && (
          <Alert variant="outlined" severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}
        <TextField
          variant="filled"
          select
          label="Teacher"
          size="small"
          fullWidth
          value={formData.teacher}
          name="teacher"
          onChange={handleChange}
        >
          {TEACHERS.map((teacher) => (
            <MenuItem key={teacher} value={teacher}>
              {teacher}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Feedback"
          name="feedback"
          variant="filled"
          size="small"
          fullWidth
          multiline
          rows={3}
          value={formData.feedback}
          onChange={handleChange}
        />
        <Rating
          name="rating"
          value={formData.rating}
          onChange={(_, value) =>
            setFormData((prev) => ({
              ...prev,
              rating: value!,
            }))
          }
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
            "Submit"
          )}
        </Button>
      </Box>
    </Box>
  );
}
