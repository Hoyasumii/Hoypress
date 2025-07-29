declare namespace NodeJS {
	export interface ProcessEnv {
		DB_HOST: string;
		DB_NAME: string;
		JWT_SECRET: string;
	}
}
