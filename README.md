# Reservaa

Aplicación web CRUD para gestionar recursos y reservas, creada con Next.js, Prisma y PostgreSQL (Neon).

## Objetivo
Proyecto sencillo para aprender desarrollo full-stack con operaciones CRUD, persistencia en base de datos en línea y despliegue en la nube.

## Tecnologías
- Next.js
- React
- TypeScript
- Prisma
- PostgreSQL / Neon
- Vercel

## Modelo de datos
- Usuarios
- Recursos
- Reservas

## Instrucciones de instalación
1. Clona el repositorio.
2. Copia `.env.example` a `.env`.
3. Configura `DATABASE_URL` con tu conexión Neon.
4. Instala dependencias:

```bash
npm install
```

5. Crea la base de datos con Prisma:

```bash
npx prisma db push
```

6. Ejecuta la app:

```bash
npm run dev
```

7. Abre `http://localhost:3000`.

## Despliegue en Vercel
1. Crea un repositorio en GitHub y sube el código.
2. Conecta el repositorio en Vercel.
3. Define la variable de entorno `DATABASE_URL` en Vercel.
4. Despliega.

## Funcionalidades incluidas
- CRUD de recursos
- CRUD de usuarios
- Gestión de reservas con validación de conflictos
- Búsqueda de recursos
- Relaciones entre entidades
- Mensajes de éxito / error

## Capturas
Incluye capturas de pantalla en tu README o documento final cuando tengas la aplicación en ejecución.
