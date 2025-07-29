import { connectMongo } from "./connect-mongo";

export function useConnection(): CallableFunction {
	return function (_: unknown, _2: string, descriptor: PropertyDescriptor) {
		const connection = connectMongo(process.env.DB_HOST);
		const oldMethod = descriptor.value;

		descriptor.value = async function (
			...args: Array<unknown>
		): Promise<unknown> {
			await connection.connect();
			const result = await oldMethod(...args);
			await connection.disconnect();
			return result;
		};
	};
}
