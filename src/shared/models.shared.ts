import { ISendMailOptions } from '@nestjs-modules/mailer';

interface SendMailModel {
	readonly templateName: string;
	replacements: any;
	readonly mailOptions: ISendMailOptions;
	readonly atch_ref?: string[];
}

interface AtPayload {
	readonly sub: string;
	readonly roles: string[];
	readonly sid: string;
	readonly username: string;
	readonly name: string;
	readonly ip_address: string;
}

interface RtPayload {
	readonly sub: string;
	readonly sid: string;
	readonly username: string;
	readonly name: string;
}

export { AtPayload, RtPayload, SendMailModel };
