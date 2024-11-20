export interface AppResponse {
	code: any;
	message: string;
	data?: any;
	description?: any;
}

export const createResponse = (code: number, message: string, data?: any): AppResponse => {
	return {
		code,
		message,
		data
	};
};
