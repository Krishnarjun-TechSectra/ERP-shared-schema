import { TaskStatusEnum } from "../enums";

export const TaskStatusLabels: Record<TaskStatusEnum, string> = {
  [TaskStatusEnum.TODO]: "To Do",
  [TaskStatusEnum.IN_PROGRESS]: "In Progress",
  [TaskStatusEnum.COMPLETED]: "Completed",
  [TaskStatusEnum.OVERDUE]: "Overdue",
};