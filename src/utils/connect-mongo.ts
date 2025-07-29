import mongoose from "mongoose";

class Database {
	private host: string;

	constructor(host: string) {
		this.host = host;
	}

	public async connect(): Promise<Database> {
		const url = new URL(this.host);

		const databaseAddress = `${url.protocol}//${url.username}:${url.password}@${url.host}/${process.env.DB_NAME}`;

		await mongoose.connect(databaseAddress);
		return this;
	}

	public async disconnect(): Promise<Database> {
		await mongoose.disconnect();
		return this;
	}
}

export const connectMongo = (host: string) => new Database(host);
