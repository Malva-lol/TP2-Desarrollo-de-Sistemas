import { Prisma, type Pedido, type PlatoMenu } from "@prisma/client";
import { bd } from "../bd/bd";

export class pedidoService {

	async getPedidos() {
		return await bd.mesa.findMany();
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
			select: { cant_pedidos: true },
		});

		let porcentajeDescuento = 0;
		if (usuario) {
			if (usuario.cant_pedidos > 7) {
				porcentajeDescuento = 50;
			} else if (usuario.cant_pedidos > 5) {
				porcentajeDescuento = 20;
			} else if (usuario.cant_pedidos > 3) {
				porcentajeDescuento = 10;
			}
		}

		const montoConDescuento = montoTotal * (1 - porcentajeDescuento / 100);

		return await bd.pedido.create({
			data: {
				id_usuario: pedido.id_usuario,
				estado: pedido.estado,
				title: pedido.title,
				monto_total: new Prisma.Decimal(montoConDescuento.toFixed(2)),
				porcentaje_descuento: porcentajeDescuento,
				contenido: {
					connect: pedido.contenido.map(plato => ({ id: plato.id }))
				}
			}
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
}
