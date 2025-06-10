import express from "express";
import { userVerificationService } from "../services/auth-service";
import { userService } from "../services/user-service";

export const authRouter = express.Router();
const userService1 = new userService()
const userVerificationService1 = new userVerificationService()

authRouter.post("/register", async (req, res) => {
	try {
		const { body } = req;
		const { nombre, telefono,email, contrasena, direccion } = body;
		const password_hash = contrasena; // it doesn't hash at all :v
		const user = await userService1.createUsuario( nombre, telefono, email, password_hash, false, direccion, 0);
		if (!user) throw new Error("No se creo el usuario :3");
		res.status(201).json({ data: user.id });
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

authRouter.post("/login", async (req, res) => {
	try {
		const { body } = req;
		const { email, contrasena	} = body;
		const user = await userVerificationService1.verifyUser(email, contrasena);
		const session_token = userVerificationService1.generateUserSession(user.id);
		res.status(200).json({ data: session_token });
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});
