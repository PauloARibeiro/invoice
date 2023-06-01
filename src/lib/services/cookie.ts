import type { Cookies } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { JWT_ACCESS_KEY, JWT_REFRESH_KEY } from '$env/static/private';
import jsonwebtoken from 'jsonwebtoken';
import CookieEnum from '$lib/enums/Cookie';

function storeAuthenticationCookies(cookies: Cookies, userId: string) {
	const accessToken = jsonwebtoken.sign({ id: userId }, JWT_ACCESS_KEY, {
		// TODO make this configurable
		expiresIn: '4h'
	});
	const refreshToken = jsonwebtoken.sign({ id: userId }, JWT_REFRESH_KEY, {
		// TODO make this configurable
		expiresIn: '4h'
	});

	cookies.set(CookieEnum.ACCESS_TOKEN, accessToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: dev ? false : true,
		maxAge: 60 * 60 * 35 * 30
	});

	cookies.set(CookieEnum.REFRESH_TOKEN, refreshToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: dev ? false : true,
		maxAge: 60 * 60 * 35 * 30
	});

	return { accessToken, refreshToken };
}

async function deleteAuthenticationCookies(cookies: Cookies) {
	cookies.delete(CookieEnum.ACCESS_TOKEN);
	cookies.delete(CookieEnum.REFRESH_TOKEN);
}

export default {
	storeAuthenticationCookies,
	deleteAuthenticationCookies
};
