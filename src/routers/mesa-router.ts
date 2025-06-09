import express from "express";
import {
	createMesa,
	getMesaById,
	getMesas,
	getMesasByUser,
} from "../services/mesa-service";
import { isAuth } from "../utils/auth";

export const mesaRouter = express.Router();

mesaRouter.get("/", async (req, res) => {
	try {
		const mesas = await getMesas();
		res.json({ mesas: mesas });
	} catch (error) {
		res.status(500).json({ error: "Internal server error skibidi" });
	}
});

mesaRouter.get("/user/:id", async (req, res) => {
	try {
		const id_user = req.params.id;
		const mesas = await getMesasByUser(id_user);
		res.json({ mesas: mesas });
	} catch (error) {
		res.status(500).json({ error: "Internal server error skibidi" });
	}
});

mesaRouter.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const mesa = await getMesaById(id);
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
		const mesa = await createMesa({ id_user: user.id as string, ...mesa_body });
		res.json({ mesa: mesa });
	} catch (error) {}
});
