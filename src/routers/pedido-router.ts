import express from "express";
import { pedidoService } from "../services/pedido-service";
import { isAuth } from "../utils/auth";

export const pedidoRouter = express.Router();
const pedidoService1 = new pedidoService()

pedidoRouter.get("/", async (req, res) => {
	try {
		const pedidos = await pedidoService1.getPedidos();
		res.json({ pedidos: pedidos });
	} catch (error) {
		res.status(500).json({ error: "Internal server error skibidi" });
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
		const pedido = await pedidoService1.createPedido({ id_user: user.id as string, ...pedido_body });
		res.json({ pedido: pedido });
	} catch (error) {}
});