import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "../../services/postApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PostsListPage = () => {
  const { data, isLoading, isError } = useGetPostsQuery({ page: 1, limit: 10 });
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();

  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const handleRowClick = (post: any) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography>Error loading posts</Typography>;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}>
        <Typography variant="h4">All Posts</Typography>
        <Button variant="contained" onClick={() => navigate("/posts/new")}>
          + New Post
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.posts?.map((post: any) => (
            <TableRow
              key={post._id}
              hover
              onClick={() => handleRowClick(post)}
              style={{ cursor: "pointer" }}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.status}</TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <IconButton onClick={() => navigate(`/posts/edit/${post._id}`)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => deletePost(post._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Post Detail Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Post Details</DialogTitle>
        <DialogContent dividers>
          {selectedPost && (
            <>
              <Typography variant="h6">{selectedPost.title}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Status: {selectedPost.status}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Author: {selectedPost.author?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Category: {selectedPost.category?.name}
              </Typography>
              <Typography
                variant="body1"
                color="purple"
                fontFamily={"cursive"}
                fontWeight={"bold"}
                fontSize={"2rem"}
                sx={{ mt: 2 }}>
                Content: {selectedPost.content || "No content available."}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PostsListPage;
