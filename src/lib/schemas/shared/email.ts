import { z } from 'zod';

export default (required = true) => {
	const baseSchema = z.string().email().trim();

	return required ? baseSchema.nonempty() : baseSchema.optional();
};
