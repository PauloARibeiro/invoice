import { z } from 'zod';
import PhoneSchema from './shared/phone';
import PhotoSchema from './shared/photo';
import EmailSchema from './shared/email';

export default () =>
	z.object({
		firstName: z.string().nonempty().trim().includes('dude').min(3),
		lastName: z.string().nonempty().trim(),
		email: EmailSchema(),
		phone: PhoneSchema(),
		photo: PhotoSchema()
	});
