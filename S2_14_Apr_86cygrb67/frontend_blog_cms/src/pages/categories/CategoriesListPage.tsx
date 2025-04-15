import {
  Box,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Button,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../services/categoryApi";
import { useNavigate } from "react-router-dom";

const CategoriesListPage = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery({});
  const [deleteCategory] = useDeleteCategoryMutation();
  const navigate = useNavigate();

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography>Error loading categories</Typography>;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Typography variant="h4" gutterBottom>
          Categories
        </Typography>
        <Button variant="contained" onClick={() => navigate("/categories/new")}>
          + New Category
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((category: any) => (
            <TableRow key={category._id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => navigate(`/categories/edit/${category._id}`)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => deleteCategory(category._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CategoriesListPage;
