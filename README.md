# Sistema de Gestión de Pedidos y Mesas - Backend

Este proyecto es un **backend desarrollado en Node.js, Express y TypeScript** que gestiona usuarios, mesas y pedidos para un restaurante. Utiliza **Prisma ORM** con una base de datos **SQLite** por defecto.

## Tecnologías utilizadas
- **Node.js**
- **Express**
- **TypeScript**
- **Prisma ORM**
- **SQLite**

---

## Integrantes del proyecto
- Santino Adriano García Corsaro
- Bruno Malvasio

---

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/Malva-lol/TP2-Desarrollo-de-Sistemas
cd nombre-repo
```

2. Instalar las dependencias:
```bash
npm install
```

3. Generar el cliente Prisma:
```bash
npm run generate
```

4. Migrar la base de datos:
```bash
npm run migrate
```

5. Iniciar el servidor:
```bash
npm run dev
```

## Scripts disponibles

#### `npm run dev`
Inicia el servidor en modo desarrollo.

#### `npm run build`
Compila el código en una carpeta `dist`.

#### `npm run generate`
Genera el cliente Prisma.

#### `npm run migrate`
Migra la base de datos.

## Estructura del proyecto

```bash
.
├── README.md
├── package.json
├── tsconfig.json
├── src
│   ├── bd
│   │   ├── bd.ts
│   │   └── schema
│   │       ├── migrations
│   │       ├── src
│   │       │   └── bd
│   │       │       └── bd.db
│   │       ├── auth.prisma
│   │       ├── menu.prisma
│   │       ├── mesa.prisma
│   │       ├── pedido.prisma
│   │       ├── schema.prisma
│   │       └── usuario.prisma
│   │       └── sesion.prisma
│   ├── index.ts
│   ├── routers
│   │   ├── auth-router.ts
│   │   ├── mesa-router.ts
│   │   ├── pedido-router.ts
│   │   └── user-router.ts
│   ├── utils
│   │   └── auth.ts
│   ├── services
│   │   ├── auth-service.ts
│   │   ├── mesa-service.ts
│   │   ├── pedido-service.ts
│   │   └── user-service.ts
│   └── types.d.ts
├── biome.json
└── node_modules
└── package-lock.json
```

## Decisiones de diseño

**Modularidad**: Separación de rutas (routers/) y lógica (services/) para facilitar mantenimiento.

**Prisma ORM**: Elegido por su integración con TypeScript, facilidad de migraciones y consultas tipadas.

**Autenticación**: Implementada con middleware isAuth (token por header de Authorization).

**Tabla de sesiones**: Se utiliza una tabla para almacenar los tokens de sesión de los usuarios.

**Arquitectura monolítica**: El sistema está dividido en una única base de datos, con una estructura de tablas que se encarga de mantener la información de los usuarios, platos, pedidos y mesas.

## Notas adicionales
Por defecto la base de datos es **SQLite**, pero el sistema puede adaptarse a PostgreSQL o MySQL modificando el archivo `schema.prisma`.