import z from "zod";

export const GetCategoryDTO = z.object({
  id: z.uuid(),
	title: z.string(),
	slug: z.string(),
});

export type GetCategoryDTO = z.infer<typeof GetCategoryDTO>;
