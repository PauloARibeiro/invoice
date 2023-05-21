import { z } from 'zod';
import PhoneSchema from './shared/phone';
import EmailSchema from './shared/email';

const clientSchema = z.object({
	firstName: z.string().nonempty().trim().includes('dude').min(3),
	lastName: z.string().nonempty().trim(),
	email: EmailSchema(),
	phone: PhoneSchema(),
	photo: z.any()
});

export type ClientSchemaType = typeof clientSchema;

export default clientSchema;
