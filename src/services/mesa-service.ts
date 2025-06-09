import type { Mesa } from "@prisma/client";
import { db } from "../db/db";

export class mesaService {
	async getMesas() {
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

	async getMesasByUser (userID: string) {
		return await db.mesa.findMany({
			where: {
				id_usuario: userID,
			},
		});
	};

	async getMesaById (MesaID: string) {
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

	async createMesa (mesa: Mesa) {
		return await db.mesa.create({
			data: mesa,
		});
	};
}
