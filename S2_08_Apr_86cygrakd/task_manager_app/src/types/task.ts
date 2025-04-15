export type TaskStatus = 'To Do' | 'In Progress' | 'Done'

export type TaskPriority = 'High' | 'Medium' | 'Low'

export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate: string;
    priority: TaskPriority;
    status: TaskStatus;
    tags?: string[];
}