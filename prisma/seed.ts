import { PrismaClient, RolesEnum } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	await prisma.role.createMany({
		data: [
			{
				name: RolesEnum.ADMIN
			},
			{
				name: RolesEnum.USER
			}
		]
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);

		await prisma.$disconnect();

		process.exit(1);
	});
