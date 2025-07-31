import z from "zod";

export const GetTitleDTO = z.object({
  title: z.string(),
});

export type GetTitleDTO = z.infer<typeof GetTitleDTO>;
