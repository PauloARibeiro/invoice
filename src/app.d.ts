import type { User } from '@prisma/client';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		interface Locals {
			user: User | null;
		}
	}

	// eslint-disable-next-line no-var
	var prisma: PrismaClient;
}

export {};
