import type { Usuario } from "@prisma/client";
import { bd } from "../bd/bd";

export class userService {
	async getUsuarios() {
		return await bd.usuario.findMany({});
	}

	async getUsuarioById(userID: string) {
		return await bd.usuario.findFirst({
			where: {
				id: userID,
			},
		});
	}

	async getUsuarioByEmail(email: string) {
		const user = await bd.usuario.findFirst({
			where: {
				email: email,
			},
		});
		if (!user) {
			throw new Error("No hay usuario con el email/nombre dado");
		}
		return user;
	}

	async createUsuario(
		nombre: string,
		telefono: string,
		email: string,
		contrasena: string,
		es_admin: boolean,
		direccion: string,
		cant_pedidos: number,
		Nivel: string
	) {
		try {
			const user = await bd.usuario.create({
				data: {
					nombre,
					telefono,
					email,
					contrasena,
					es_admin,
					direccion,
					cant_pedidos,
					Nivel,
				},
			});
			return user;
		} catch (error) {
			throw new Error("Error al crear el usuario");
		}
	}
}
