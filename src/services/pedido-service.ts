import type { Pedido } from "@prisma/client";
import { db } from "../db/db";

export class pedidoService {

	async getPedidos(){
		return await db.mesa.findMany();
	}

	async createPedido(pedido: Pedido) {
		return await db.pedido.create({
			data: pedido,
		});
	}

	async getPedidoByUser(usuarioID: string) {
		return await db.pedido.findMany({
			where: {
				id_usuario: usuarioID,
			},
		});
	}

	async getPedidoById(pedidoID: string) {
		return await db.pedido.findFirst({
			include: {
				usuario: {
					select: {
						id: true,
						nombre: true,
					},
				}
			},
			where: {
				id: pedidoID,
			},
		});
	}
}
