import type { User } from "../models/User";

declare global {
	namespace Express {
		interface Request {
			context?: {
				user: User;
			};
		}
	}
}
