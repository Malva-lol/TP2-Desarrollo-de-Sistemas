import type { Mesa } from "@prisma/client";
import { bd } from "../bd/bd";

export class mesaService {
	async getMesas() {
		return await bd.mesa.findMany();
	};

	async getMesasByUser(userID: string) {
		return await bd.mesa.findFirst({
			where: {
				id_usuario: userID,
			},
		});
	};

	async getMesaById(MesaID: string) {
		return await bd.mesa.findFirst({
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

	async createMesa(mesa: Mesa) {
		return await bd.mesa.create({
			data: {
				id_usuario: mesa.id_usuario,
				estado: mesa.estado,
			},
		});
	}

}
