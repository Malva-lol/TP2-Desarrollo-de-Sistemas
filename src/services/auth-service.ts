import { randomUUID } from "node:crypto";
import { db } from "../db/db";
import { userService } from "./user-service";
const userSvc = new userService();

export class userVerificationService {

	async verifyUser(email: string, password: string) {	
		const user = await userSvc.getUserByEmail(email);
		const is_match = (password == user.password);
		if (!is_match) {
			throw new Error("La contraseña no coincide aprende a escribir :v");
		}
		return user;
	}

	async generateUserSession(id_user: string) {
		const session_token = randomUUID();
		try {
			await db.session.create({
				data: { id_user, session_token },
			});
			return session_token;
		} catch (error) {
			throw new Error("Error al crear la sesion :c");
		}
	}
}

export const getUserBySessionToken = async (session_token: string) => {
	const user = db.user.findFirst({
		where: {
			sessions: {
				some: { session_token },
			},
		},
	});
	if (!user) {
		throw new Error(`No hay un usuario con el token ${session_token}`);
	}
	return user;
};
