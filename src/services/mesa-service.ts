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

	async updateEstadoMesa(id: string, user_id: string, nuevoEstado: string) {
		return await bd.mesa.update({
			where: { id: id },
			data: { id_usuario: user_id, estado: nuevoEstado }
		});
	}

	async deleteMesa(id: string) {
		const mesaExistente = await bd.mesa.findUnique({
			where: { id },
		});

		if (!mesaExistente) return null;

		return await bd.mesa.delete({
			where: { id },
		});
	}
}
