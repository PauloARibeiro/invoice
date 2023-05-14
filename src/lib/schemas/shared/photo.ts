import { z } from 'zod';

export default () =>
	z
		.object({
			type: z.string().includes('image/')
		})
		.optional();
