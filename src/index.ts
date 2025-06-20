import express from "express";
import { authRouter } from "./routers/auth-router";
import { pedidoRouter } from "./routers/pedido-router";
import { mesaRouter } from "./routers/mesa-router";
import { userRouter } from "./routers/user-router";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/usuarios", userRouter);
app.use("/api/pedidos", pedidoRouter);
app.use("/api/mesas", mesaRouter);
app.use("/api/auth", authRouter);

app.get("/health", (req, res) => {
	try {
		res.json({ status: "healthy" });
	} catch (error) {
		console.log(error);
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
