import type { Usuario } from "@prisma/client";
import { db } from "../db/db";
	
export class userService {
	async getUsuarios() {
		return await db.usuario.findMany();
	}

	async getUsuarioById(userID: string) {
		return await db.usuario.findFirst({
			where: {
				id: userID,
			},
		});
	}

	async getUsuarioByEmail(email: string) {
		const user = await db.usuario.findFirst({
			where: {
				email: email,
			},
		});
		if (!user) {
			throw new Error("No hay usuario con el email/nombre dado :3");
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
		cant_pedidos: number
		) {
		try {
			const user = await db.usuario.create({
			data: {
				nombre,
				telefono,
				email,
				contrasena,
				es_admin,
				direccion,
				cant_pedidos,
			},
			});
			return user;
		} catch (error) {
			throw new Error("Error al crear el usuario :c");
		}
	}
}
