import { TaskPriorityEnum } from "../enums";

export const TaskPriorityLabels: Record<TaskPriorityEnum, string> = {
  [TaskPriorityEnum.LOW]: "Low",
  [TaskPriorityEnum.MEDIUM]: "Medium",
  [TaskPriorityEnum.HIGH]: "High",
};
