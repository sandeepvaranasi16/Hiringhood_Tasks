import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
} from "@mui/material";
import {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} from "../../services/userApi";
import { toast } from "react-toastify";

const UsersListPage = () => {
  const { data, isLoading, isError } = useGetUsersQuery({});
  const [updateUserRole] = useUpdateUserRoleMutation();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching users</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  value={user.role}
                  onChange={(e) => {
                    updateUserRole({
                      id: user._id,
                      role: e.target.value,
                    }).unwrap();

                    toast.success("Role updated successfully!");
                  }}>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Editor">Editor</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default UsersListPage;
