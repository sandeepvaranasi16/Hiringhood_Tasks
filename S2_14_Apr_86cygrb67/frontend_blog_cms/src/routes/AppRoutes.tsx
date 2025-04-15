import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import PostsListPage from "../pages/posts/PostsListPage";
import PostFormPage from "../pages/posts/PostFormPage";
import UsersListPage from "../pages/users/UsersListPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import CategoriesListPage from "../pages/categories/CategoriesListPage";
import CategoryFormPage from "../pages/categories/CategoryFormPage";
import UnauthorizedPage from "../pages/misc/UnauthorizedPage";
import NotFoundPage from "../pages/misc/NotFoundPage";
import DashboardEditor from "../pages/dashboard/DashboardEditor";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/users" element={<UsersListPage />} />
          <Route index element={<DashboardPage />} />
        </Route>
      </Route>

      {/* Protected routes */}
      <Route element={<PrivateRoute allowedRoles={["Admin", "Editor"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardEditor />} />
          {/* Posts */}
          <Route path="posts" element={<PostsListPage />} />
          <Route path="posts/new" element={<PostFormPage />} />
          <Route path="posts/edit/:id" element={<PostFormPage />} />
          {/* Categories */}
          <Route path="categories" element={<CategoriesListPage />} />
          <Route path="categories/new" element={<CategoryFormPage />} />
          <Route path="categories/edit/:id" element={<CategoryFormPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
