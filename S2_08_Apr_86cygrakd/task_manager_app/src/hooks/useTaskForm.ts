import * as Yup from "yup";

export const taskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  dueDate: Yup.date().min(new Date(), "Due date must be in the future").required("Due date is required"),
  priority: Yup.string().oneOf(["Low", "Medium", "High"]).required(),
  status: Yup.string().oneOf(["To Do", "In Progress", "Done"]).required(),
  tags: Yup.array().of(Yup.string()),
});
