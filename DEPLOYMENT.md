# Guía de Deployment a Vercel - ReservasApp

## Pasos para desplegar en Vercel

### 1. Conectar repositorio en Vercel
1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en "New Project"
3. Selecciona tu repositorio de GitHub: `MariaFerr-dev/reserva`
4. Vercel detectará automáticamente que es un proyecto Next.js

### 2. Configurar variables de entorno
En el panel de Vercel, ve a **Settings → Environment Variables** y agrega:

```
DATABASE_URL=postgresql://...  (tu URL de Neon)
```

### 3. Variables importantes
- **DATABASE_URL**: Copia tu URL de conexión de [Neon Console](https://console.neon.tech)
- No se necesita `JWT_SECRET` ya que la aplicación usa una sesión de cookie simple.

### 4. Build Settings
Vercel auto-detectará:
- **Framework**: Next.js
- **Build Command**: `npm run build` (que ejecuta `prisma generate && next build`)
- **Output Directory**: `.next`

### 5. Deploy
1. Haz clic en "Deploy"
2. Espera 2-5 minutos mientras se construye y despliega
3. Una vez completado, verás tu URL en vivo

## Variables de entorno requeridas

| Variable | Valor | Ejemplo |
|----------|-------|---------|
| `DATABASE_URL` | URL de conexión a PostgreSQL/Neon | `postgresql://user:pass@host/db?sslmode=require` |
| `JWT_SECRET` | Clave secreta para JWT (generada aleatoriamente) | `a1b2c3d4e5f6g7h8...` |

## Verificar deployment exitoso

Después del deployment, verifica:

1. **Home page**: La página principal debe cargar sin errores
2. **Login**: `/auth/login` debe ser accesible
3. **Registro**: `/auth/register` debe permitir crear cuentas
4. **Reservas**: `/my-reservations` debe mostrar reservas del usuario

## Solucionar problemas

### Error: "JWT_SECRET no definido"
→ Agrega `JWT_SECRET` en Environment Variables de Vercel

### Error: "Cannot find module 'jsonwebtoken'"
→ Verifica que `package.json` incluya las dependencias (ya incluidas)

### Error: Database connection
→ Verifica que `DATABASE_URL` sea correcta en Vercel
→ Asegúrate que Neon permite conexiones desde Vercel

## Redeploy
Para redeploy después de cambios:
1. Haz commit en GitHub: `git commit -m "mensaje"`
2. Push: `git push origin main`
3. Vercel se redespliega automáticamente

## Monitoreo
En Vercel puedes monitorear:
- **Logs**: Settings → Function Logs
- **Analytics**: Analytics tab
- **Deployments**: Deployments tab

---

**Nota**: Nunca commits `.env` a git. Las variables de entorno se configuran solo en Vercel.
