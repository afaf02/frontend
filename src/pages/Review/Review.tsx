import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../config/store";
import StickyHeadTable from "../../components/Table/StickyHeadTable";
import { REVIEWS_COLUMNS } from "../../config/constants";
import { formatReviewRows } from "../../utils";

export default function Reviews() {
  const data = useAppSelector((state) => state.review.reviews);

  return (
    <Box p={4}>
      <Typography variant="h4">Feedbacks</Typography>
      <StickyHeadTable
        columns={REVIEWS_COLUMNS}
        rows={formatReviewRows(data)}
        onRowClick={() => {}}
        sx={{
          mt: 5,
        }}
      />
    </Box>
  );
}
