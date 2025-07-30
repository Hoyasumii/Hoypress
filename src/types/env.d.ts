declare namespace NodeJS {
	export interface ProcessEnv {
		DATABASE_URL: string;
		DIRECT_URL: string;
		JWT_PRIVATE_KEY: string;
	}
}
