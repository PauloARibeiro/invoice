import { prisma } from '$lib/server/Prisma';

interface CreateUser {
	username: string;
	password: string;
	email: string;
}

async function createUser({ email, password, username }: CreateUser) {
	return await prisma.user.create({
		data: {
			password,
			username,
			email
		}
	});
}

async function storeRefreshToken(userId: string, refreshToken: string) {
	return await prisma.refreshToken.create({
		data: {
			userId,
			token: refreshToken
		}
	});
}

async function updateRefreshToken(userId: string, refreshToken: string) {
	return await prisma.refreshToken.update({
		where: {
			userId: userId
		},
		data: {
			userId: userId,
			token: refreshToken
		}
	});
}

async function findByUsername(username: string) {
	return await prisma.user.findFirstOrThrow({
		where: {
			username
		}
	});
}

async function findById(id: string) {
	return await prisma.user.findFirstOrThrow({
		where: {
			id
		}
	});
}

export default {
	createUser,
	updateRefreshToken,
	storeRefreshToken,
	findByUsername,
	findById
};
