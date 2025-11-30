    import { z } from "zod";
    import { KpiSchema } from "../schemas/kpi.schema";

    export type KpiType = z.infer<typeof KpiSchema>;
