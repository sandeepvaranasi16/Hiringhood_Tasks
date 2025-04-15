import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import TaskFormPage from "./pages/TaskFormPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/task/:id" element={<TaskDetailsPage />} />
        <Route path="/add" element={<TaskFormPage />} />
        <Route path="/edit/:id" element={<TaskFormPage />} />
      </Routes>
    </>
  );
}

export default App;
