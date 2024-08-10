import { Box, Typography } from "@mui/material";
import StatsCard from "../../components/StatsCard/StatsCard";
import { useAppSelector } from "../../config/store";
import { TEACHERS } from "../../config/constants";

export default function Dashboard() {
  const {
    user: { users },
    review: { reviews },
  } = useAppSelector((state) => state);

  return (
    <Box p={4} display={"flex"} flexDirection={"column"} gap={3}>
      <Typography variant="h4">Dashboard</Typography>
      <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} gap={5}>
        <StatsCard
          variant="contained"
          title="Total Feed backs"
          value={reviews.length.toString()}
        />
        <StatsCard
          variant="outlined"
          title="Total Students"
          value={users.length.toString()}
        />
        <StatsCard
          variant="outlined"
          title="Total Teachers"
          value={TEACHERS.length.toString()}
        />
      </Box>
    </Box>
  );
}
