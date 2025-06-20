import { Prisma, type Pedido, type PlatoMenu } from "@prisma/client";
import { bd } from "../bd/bd";

export class pedidoService {

	async getPedidos() {
		return await bd.pedido.findMany();
	}

	async createPedido(pedido: Pedido & { contenido: { id: string }[] }) {
		const platos = await bd.platoMenu.findMany({
			where: {
				id: {
					in: pedido.contenido.map(p => p.id),
				},
			},
			select: {
				precio: true,
			},
		});

		const montoTotal = platos.reduce((acc, plato) => acc + parseFloat(plato.precio.toString()), 0);

		const usuario = await bd.usuario.findUnique({
			where: { id: pedido.id_usuario },
			select: { cant_pedidos: true, Nivel: true },
		});
		if (!usuario) throw new Error("No hay usuario con ese id");

		const usuarioActualizado = await bd.usuario.update({
			where: { id: pedido.id_usuario },
			data: {
				cant_pedidos: { increment: 1 },
			},
			select: { cant_pedidos: true },
		});

		let porcentajeDescuento = 0;
		let nuevoNivel = "Nuevo";

		if (usuarioActualizado.cant_pedidos >= 8) {
			nuevoNivel = "Top premium";
			porcentajeDescuento = 50;
		} else if (usuarioActualizado.cant_pedidos >= 6) {
			nuevoNivel = "Premium";
			porcentajeDescuento = 20;
		} else if (usuarioActualizado.cant_pedidos >= 4) {
			nuevoNivel = "Habitue";
			porcentajeDescuento = 10;
		}

		await bd.usuario.update({
			where: { id: pedido.id_usuario },
			data: { Nivel: nuevoNivel },
		});

		const montoConDescuento = montoTotal * (1 - porcentajeDescuento / 100);

		return await bd.pedido.create({
			data: {
				id_usuario: pedido.id_usuario,
				estado: "Pendiente",
				title: pedido.title,
				monto_total: new Prisma.Decimal(montoConDescuento.toFixed(2)),
				porcentaje_descuento: porcentajeDescuento,
				contenido: {
					connect: pedido.contenido.map(plato => ({ id: plato.id })),
				},
			},
		});
	}


	async getPedidoByUser(usuarioID: string) {
		return await bd.pedido.findMany({
			where: {
				id_usuario: usuarioID,
			},
		});
	}

	async getPedidoById(pedidoID: string) {
		return await bd.pedido.findFirst({
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

	async createPlatoMenu(platoMenu: PlatoMenu) {
		return await bd.platoMenu.create({
			data: {
				nombre: platoMenu.nombre,
				descripcion: platoMenu.descripcion,
				precio: platoMenu.precio,
				categoria: platoMenu.categoria,
			},
		});
	}

	async getPlatosMenu() {
		return await bd.platoMenu.findMany({
			select: {
				nombre: true,
				precio: true,
				categoria: true,
			},
		});
	}

	async updateEstadoPedido(id: string, nuevoEstado: string) {
		return await bd.pedido.update({
			where: { id: id },
			data: { estado: nuevoEstado }
		});
	}

	async deletePedido(id: string) {
		const pedidoExistente = await bd.pedido.findUnique({
			where: { id },
		});

		if (!pedidoExistente) return null;

		return await bd.pedido.delete({
			where: { id },
		});
	}

	async deletePlato(id: string) {
		const platoExistente = await bd.platoMenu.findUnique({
			where: { id },
		});

		if (!platoExistente) return null;

		return await bd.platoMenu.delete({
			where: { id },
		});
	}
}
