import AppLogger from '@app/core/logger/app-logger';
import { messages } from '@app/shared/messages.shared';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ErrorHandler implements ExceptionFilter {
	/**
	 *Centralized error handling
	 */
	constructor(private readonly _logger: AppLogger) {}
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp(),
			req = ctx.getRequest<any>(),
			res = ctx.getResponse<Response>();

		let err_response: any, status: number;
		const err_desc: any = typeof exception.getResponse === 'function' ? exception.getResponse() : undefined;
		if (exception instanceof HttpException) {
			status = exception.getStatus();
			err_response = {
				code: err_desc && err_desc.code ? err_desc.code : exception.getStatus(),
				message: err_desc && err_desc.message ? err_desc.message : exception.message,
				description: err_desc && err_desc.description ? err_desc.description : undefined
			};
		} else {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			err_response = {
				code: status,
				message: messages.E2
			};
		}
		if (status === 500) {
			this._logger.error(exception.stack, status, req.claims?.sid);
		} else {
			this._logger.log(exception.stack, status, req.claims?.sid);
		}
		res.status(status).json(err_response);
	}
}
