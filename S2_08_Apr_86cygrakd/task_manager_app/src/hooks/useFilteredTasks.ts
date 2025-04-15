import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useFilteredTasks = (
  status?: string,
  priority?: string,
  search?: string
) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  return tasks.filter((task) => {
    return (
      (!status || task.status === status) &&
      (!priority || task.priority === priority) &&
      (!search || task.title.toLowerCase().includes(search.toLowerCase()))
    );
  });
};
