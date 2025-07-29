import { PrismaClient } from "~/generated/prisma";

export function prisma() {
	return new PrismaClient({ log: ["query", "info", "error", "warn"] });
}
