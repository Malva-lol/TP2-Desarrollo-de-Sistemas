import express from "express";
import { pedidoService } from "../services/pedido-service";
import { isAuth } from "../utils/auth";

export const pedidoRouter = express.Router();
const pedidoService1 = new pedidoService()

pedidoRouter.get("/", isAuth, async (req, res) => {
	try {
		const user = req.context?.user;

		if (user?.es_admin) {
			const pedidos = await pedidoService1.getPedidos();
			res.json({ pedidos });
			return;
		}

		const pedidos = await pedidoService1.getPedidoByUser(user.id);
		res.json({ pedidos });
		return;

	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error skibidi" });
		return;
	}
});


pedidoRouter.get("/user/:id", async (req, res) => {
	try {
		const id_user = req.params.id;
		const pedidos = await pedidoService1.getPedidoByUser(id_user);
		res.json({ pedidos: pedidos });
	} catch (error) {
		res.status(500).json({ error: "Internal server error skibidi" });
	}
});

pedidoRouter.post("/plato", isAuth, async (req, res) => {
	try {

		const user = req.context?.user;
		if (user.es_admin == false) {
			res.status(403).json({ error: "No tienes permisos para crear un plato" });
			return;
		}
		const plato_body = req.body;
		const plato = await pedidoService1.createPlatoMenu(plato_body);
		res.json({ plato: plato });
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

pedidoRouter.get("/plato", isAuth, async (req, res) => {
	try {
		const platoMenu = await pedidoService1.getPlatosMenu();
		res.json({ platoMenu: platoMenu });
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

pedidoRouter.delete("/plato/:id", isAuth, async (req, res) => {
	try {
		const id = req.params.id;
		const user = req.context?.user;

		if (user.es_admin == false) {
			res.status(403).json({ error: "No tienes permisos para eliminar un plato" });
			return;
		}

		const plato = await pedidoService1.deletePlato(id);

		if (plato) {
			res.json({ mensaje: "Plato eliminado correctamente", plato });
			return;
		} else {
			res.status(404).json({ error: "Plato no encontrado" });
			return;
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
		return;
	}
});

pedidoRouter.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const pedido = await pedidoService1.getPedidoById(id);
		if (pedido) {
			res.json(pedido);
		} else {
			res.status(404).json({ error: "Pedido not found" });
		}
	} catch (error) {
		res.status(500).json({ error: "Internal server error sigma" });
	}
});

pedidoRouter.post("/", isAuth, async (req, res) => {
	try {
		const pedido_body = req.body;
		const user = req.context?.user;
		const pedido = await pedidoService1.createPedido({ id_usuario: user.id as string, ...pedido_body });
		res.json({ pedido: pedido });
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: (error as Error).message });
	}
});

pedidoRouter.patch("/:id/estado", isAuth, async (req, res) => {
	try {
		const user = req.context?.user;
		if (!user?.es_admin) {
			res.status(403).json({ error: "No tienes permisos para modificar el estado del pedido" });
			return;
		}

		const id = req.params.id;
		const { estado } = req.body;

		if (!estado) {
			res.status(400).json({ error: "El campo 'estado' es requerido" });
			return;
		}

		const pedidoActualizado = await pedidoService1.updateEstadoPedido(id, estado);

		if (pedidoActualizado) {
			res.json({ pedido: pedidoActualizado });
		} else {
			res.status(404).json({ error: "Pedido no encontrado" });
		}
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

pedidoRouter.delete("/:id", isAuth, async (req, res) => {
	try {
		const id = req.params.id;
		const user = req.context?.user;

		if (user.es_admin == false) {
			res.status(403).json({ error: "No tienes permisos para eliminar un pedido" });
			return;
		}

		const pedido = await pedidoService1.deletePedido(id);

		if (pedido) {
			res.json({ mensaje: "Pedido eliminado correctamente", pedido });
			return;
		} else {
			res.status(404).json({ error: "Pedido no encontrado" });
			return;
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
		return;
	}
});