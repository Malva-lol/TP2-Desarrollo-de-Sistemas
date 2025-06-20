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
		res.status(500).json({ error: "Internal server error" });
	}
});

mesaRouter.get("/user/:id", async (req, res) => {
	try {
		const id_user = req.params.id;
		const mesas = await mesaService1.getMesasByUser(id_user);
		res.json({ mesas: mesas });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
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
		res.status(500).json({ error: "Internal server error" });
	}
});

mesaRouter.post("/", isAuth, async (req, res) => {
	try {
		const user = req.context?.user;
		if (user.es_admin == false) {
			res.status(403).json({ error: "No tienes permisos para crear una mesa" });
			return;
		}
		const mesa_body = req.body;
		const mesa = await mesaService1.createMesa({ id_user: user.id as string, ...mesa_body });
		res.status(200).json({ mesa: mesa });
		return;
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

// Con este patch, se puede reservar una mesa. Si no es admin, no se puede ocupar una mesa ya ocupada.
mesaRouter.patch("/:id", isAuth, async (req, res) => {
	try {
		const user = req.context?.user;
		const id = req.params.id;
		const { estado } = req.body;

		const mesa = await mesaService1.getMesaById(id);
		if (!mesa) {
			res.status(404).json({ error: "Mesa no encontrada" });
			return;
		}

		if (!user?.es_admin) {
			if (mesa.estado === "Ocupada") {
				res.status(400).json({ error: "La mesa ya está ocupada" });
				return;
			}
			const mesaActualizada = await mesaService1.updateEstadoMesa(id, user.id, "Ocupada");
			res.json({ mesa: mesaActualizada });
			return;
		}

		const nuevoEstado = estado || mesa.estado;
		const mesaActualizada = await mesaService1.updateEstadoMesa(id, user.id, nuevoEstado);
		res.json({ mesa: mesaActualizada });
		return;
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
		return;
	}
});


mesaRouter.delete("/:id", isAuth, async (req, res) => {
	try {
		const id = req.params.id;
		const user = req.context?.user;

		if (user.es_admin == false) {
			res.status(403).json({ error: "No tienes permisos para eliminar una mesa" });
			return;
		}

		const mesa = await mesaService1.deleteMesa(id);

		if (mesa) {
			res.json({ mensaje: "Mesa eliminada correctamente", mesa });
			return;
		} else {
			res.status(404).json({ error: "Mesa no encontrada" });
			return;
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
		return;
	}
});

