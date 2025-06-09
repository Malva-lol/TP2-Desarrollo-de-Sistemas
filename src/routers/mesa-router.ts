import express from "express";
import { mesaService } from "../services/mesa-service";
import { isAuth } from "../utils/auth";
const mesaService1 = new mesaService()

export const mesaRouter = express.Router();

mesaRouter.get("/", async (req, res) => {
	try {
		const mesas = await mesaService1.getMesas();
		res.json({ mesas: mesas });
	} catch (error) {
		res.status(500).json({ error: "Internal server error skibidi" });
	}
});

mesaRouter.get("/user/:id", async (req, res) => {
	try {
		const id_user = req.params.id;
		const mesas = await mesaService1.getMesasByUser(id_user);
		res.json({ mesas: mesas });
	} catch (error) {
		res.status(500).json({ error: "Internal server error skibidi" });
	}
});

mesaRouter.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const mesa = await mesaService1.getMesaById(id);
		if (mesa) {
			res.json(mesa);
		} else {
			res.status(404).json({ error: "Mesa not found" });
		}
	} catch (error) {
		res.status(500).json({ error: "Internal server error sigma" });
	}
});

mesaRouter.post("/", isAuth, async (req, res) => {
	try {
		const mesa_body = req.body;
		const user = req.context?.user;
		const mesa = await mesaService1.createMesa({ id_user: user.id as string, ...mesa_body });
		res.json({ mesa: mesa });
	} catch (error) {}
});
