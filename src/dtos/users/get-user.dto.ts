import z from "zod";

export const GetUserDTO = z.object({
	id: z.uuid(),
	email: z.email(),
	password: z.string().min(7),
});

export type GetUserDTO = z.infer<typeof GetUserDTO>;
