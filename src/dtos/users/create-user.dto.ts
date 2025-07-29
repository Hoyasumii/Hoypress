import z from "zod";

export const CreateUserDTO = z.object({
	email: z.email(),
	password: z.string().min(7),
});

export type CreateUserDTO = z.infer<typeof CreateUserDTO>;
