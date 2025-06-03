import type { Mesa } from "@prisma/client";
import { db } from "../db/db";

export const getMesas = async () => {
	return await db.mesa.findMany({
		include: {
			usuario: {
				select: {
					id: true,
				},
			},
		},
	});
};

export const getMesasByUser = async (userID: string) => {
	return await db.mesa.findMany({
		where: {
			id_usuario: userID,
		},
	});
};

export const getMesaById = async (MesaID: string) => {
	return await db.mesa.findFirst({
		include: {
			usuario: {
				select: {
					id: true,
					nombre: true,
				},
			},
		},
		where: {
			id: MesaID,
		},
	});
};

export const createMesa = async (mesa: Mesa) => {
	return await db.mesa.create({
		data: mesa,
	});
};
