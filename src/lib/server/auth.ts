import CookieEnum from '$lib/enums/Cookie';
import jsonwebtoken from 'jsonwebtoken';
import type { RequestEvent } from '@sveltejs/kit';
import { JWT_ACCESS_KEY } from '$env/static/private';
import UserDB from '$lib/db/User';

interface JWTPayload {
	id: string;
}

export default async function authenticateUser({ cookies }: RequestEvent) {
	const token = cookies.get(CookieEnum.ACCESS_TOKEN) as string;

	try {
		const decodedToken = jsonwebtoken.verify(token, JWT_ACCESS_KEY) as JWTPayload;

		const user = await UserDB.findById(decodedToken.id);

		return {
			user
		};
	} catch (error) {
		return null;
	}
}
