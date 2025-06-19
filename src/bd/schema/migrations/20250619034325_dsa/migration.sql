-- CreateTable
CREATE TABLE "platos_del_menu" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DECIMAL NOT NULL,
    "categoria" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "mesas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_usuario" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    CONSTRAINT "mesas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_usuario" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "monto_total" DECIMAL NOT NULL,
    "porcentaje_descuento" INTEGER NOT NULL,
    CONSTRAINT "pedidos_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sesiones" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_usuario" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    CONSTRAINT "sesiones_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "es_admin" BOOLEAN NOT NULL,
    "direccion" TEXT NOT NULL,
    "cant_pedidos" INTEGER NOT NULL,
    "Nivel" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PedidoToPlatoMenu" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PedidoToPlatoMenu_A_fkey" FOREIGN KEY ("A") REFERENCES "pedidos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PedidoToPlatoMenu_B_fkey" FOREIGN KEY ("B") REFERENCES "platos_del_menu" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "sesiones_id_usuario_session_token_key" ON "sesiones"("id_usuario", "session_token");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PedidoToPlatoMenu_AB_unique" ON "_PedidoToPlatoMenu"("A", "B");

-- CreateIndex
CREATE INDEX "_PedidoToPlatoMenu_B_index" ON "_PedidoToPlatoMenu"("B");
