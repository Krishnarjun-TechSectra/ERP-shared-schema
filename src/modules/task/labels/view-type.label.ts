import { ViewTypeEnum } from "../enums/view-type.enum";

export const ViewTypeLabels: Record<ViewTypeEnum, string> = {
  [ViewTypeEnum.DAILY]: "Daily",
  [ViewTypeEnum.WEEKLY]: "Weekly",
  [ViewTypeEnum.MONTHLY]: "Monthly",
  [ViewTypeEnum.YEARLY]: "Yearly",
};
