import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import {
  useGetDashboardStatsQuery,
  useGetRecentPostsQuery,
} from "../../services/dashboardApi";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery(
    {}
  );
  const { data: recentPosts, isLoading: postsLoading } = useGetRecentPostsQuery(
    {}
  );
  const navigate = useNavigate();

  if (statsLoading || postsLoading) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Posts</Typography>
              <Typography variant="h4">{stats?.stats?.posts}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Categories</Typography>
              <Typography variant="h4">{stats?.stats?.categories}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{stats?.stats?.users}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box
        mt={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center">
        <Typography variant="h5">Recent Posts</Typography>
        <Button variant="contained" onClick={() => navigate("/posts/new")}>
          + New Post
        </Button>
      </Box>

      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Status</TableCell>

            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentPosts?.posts?.map((post: any) => (
            <TableRow key={post._id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.author?.name}</TableCell>
              <TableCell>{post.status}</TableCell>

              <TableCell>
                {new Date(post.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default DashboardPage;
