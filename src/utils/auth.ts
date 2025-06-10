import type { Usuario } from "@prisma/client";

import type { Request, Response, NextFunction } from "express";
import { getUserBySessionToken } from "../services/auth-service";

export const isAuth = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const session_token = req.headers.authorization; // header 'Authorization' de la request del cliente (te amo Sterling)
	if (!session_token) {
		res.status(401).json({ message: "No estas autenticado :c" });
		return;
	}
	try {
		const user = await getUserBySessionToken(session_token);
		req.context = { user: user };
	} catch (error) {
		res.status(401).json({ message: "Token invalido :c" });
		return;
	}

	next();
};
