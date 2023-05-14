import { z } from 'zod';

const phoneRegex =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default (required = true) => {
	const baseSchema = z.string().regex(phoneRegex);

	return required ? baseSchema.nonempty() : baseSchema.optional();
};
