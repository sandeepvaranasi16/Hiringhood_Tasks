import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Button,
  IconButton,
  Tooltip,
  Stack,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Article as ArticleIcon,
  Category as CategoryIcon,
  Group as GroupIcon,
  EditNote as EditNoteIcon,
  ChevronLeft,
  ChevronRight,
  Brightness4Sharp,
  Brightness7Sharp,
} from "@mui/icons-material";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { useContext, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../ThemeContext";
import { deepOrange } from "@mui/material/colors";

const drawerWidth = 240;

const DashboardLayout = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role;

  const [collapsed, setCollapsed] = useState(true);
  const [open, setOpen] = useState(false);

  const handleProfile = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const commonLinks = [
    { text: "Posts", path: "/posts", icon: <ArticleIcon /> },
    { text: "Categories", path: "/categories", icon: <CategoryIcon /> },
  ];

  const adminLinks = [
    { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
    ...commonLinks,
    { text: "Users", path: "/users", icon: <GroupIcon /> },
  ];

  const editorLinks = [
    { text: "Editor Dashboard", path: "/dashboard", icon: <EditNoteIcon /> },
    ...commonLinks,
  ];

  const linksToRender = role === "Admin" ? adminLinks : editorLinks;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${collapsed ? 60 : drawerWidth}px)`,
          ml: `${collapsed ? 60 : drawerWidth}px`,
        }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Button
            size="large"
            color="inherit"
            onClick={
              role === "Admin"
                ? () => navigate("/")
                : () => navigate("/dashboard")
            }>
            Blog CMS Dashboard
          </Button>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === "dark" ? (
                <Brightness7Sharp />
              ) : (
                <Brightness4Sharp />
              )}
            </IconButton>
            <IconButton onClick={handleMenuClick} color="info">
              <Avatar sx={{ bgcolor: deepOrange[500] }}>
                {user?.name?.[0]}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}>
              <MenuItem>
                <Typography variant="button" onClick={handleProfile}>
                  Hello, {user?.name}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography variant="button" color="error">
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent dividers>
          <Typography>Name: {user?.name}</Typography>
          <Typography>Email: {user?.email}</Typography>
          <Typography>Role: {user?.role}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout} color="error">
            Logout
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer
        variant="permanent"
        sx={{
          color: "Background",
          width: collapsed ? 60 : drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: collapsed ? 60 : drawerWidth,
            boxSizing: "border-box",
            overflowX: "hidden",
            transition: "width 0.3s",
          },
        }}>
        <Toolbar />
        <Box
          sx={{
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}>
          <List>
            {linksToRender.map((link) => (
              <ListItem
                key={link.text}
                disablePadding
                sx={{ display: "block" }}>
                <Tooltip title={!collapsed ? "" : link.text} placement="right">
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: collapsed ? "center" : "initial",
                      px: 2.5,
                    }}
                    selected={location.pathname === link.path}
                    onClick={() => navigate(link.path)}>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: collapsed ? 0 : 2,
                        justifyContent: "center",
                      }}>
                      {link.icon}
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary={link.text} />}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: "auto", textAlign: "center", pb: 2 }}>
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Box>
        </Box>
      </Drawer>

      <Stack
        component="main"
        sx={{
          flexGrow: 3,
          display: "flex",
          alignItems: "center", // vertical centering
          justifyContent: "center", // horizontal centering
          minHeight: "100vh",
          px: 2,
        }}>
        <Box sx={{ width: "100%" }}>
          <Outlet />
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardLayout;
