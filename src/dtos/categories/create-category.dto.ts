import z from "zod";

export const CreateCategoryDTO = z.object({
	title: z.string(),
	slug: z.string(),
	createdAt: z.iso.datetime(),
});

export type CreateCategoryDTO = z.infer<typeof CreateCategoryDTO>;
