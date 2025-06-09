import express from "express";
import { userVerificationService } from "../services/auth-service";
import { userService } from "../services/user-service";

export const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
	try {
		const { body } = req;
		const { name, email, password } = body;
		const password_hash = password; // it doesn't hash at all :v
		const user = await userService.createUser(email, name, password_hash);
		if (!user) throw new Error("No se creo el usuario :3");
		res.status(201).json({ data: user.id });
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

authRouter.post("/login", async (req, res) => {
	try {
		const { body } = req;
		const { email, password } = body;
		const user = await userVerificationService.verifyUser(email, password);
		const session_token = userVerificationService.generateUserSession(user.id);
		res.status(200).json({ data: session_token });
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});
