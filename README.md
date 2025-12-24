# 🚀 Portfolio Personal - Jhonatan Majin

Portfolio profesional desarrollado con Next.js 13, React, TypeScript, MongoDB y Tailwind CSS. Incluye panel de administración completo para gestionar proyectos, sección hero y mensajes de contacto.

## ✨ Características

### Frontend

- 🎨 **Diseño Moderno y Responsivo** - Optimizado para todos los dispositivos
- ⚡ **Animaciones Fluidas** - Framer Motion para transiciones suaves
- 🎯 **TypeScript** - Tipado estático para código más seguro
- 🖼️ **Optimización de Imágenes** - Next.js Image para carga rápida
- 🔍 **SEO Optimizado** - Metadata completa y Open Graph

### Backend

- 🔐 **Autenticación JWT** - Sistema seguro de autenticación
- 📊 **MongoDB** - Base de datos NoSQL
- 🛡️ **Validación de Datos** - Validación robusta en API routes
- ☁️ **Cloudinary** - Gestión de imágenes en la nube
- 🔒 **Middleware de Protección** - Rutas de admin protegidas

### Panel de Administración

- ✏️ **CRUD Completo** - Crear, leer, actualizar y eliminar
- 📝 **Gestión de Proyectos** - Administra tu portafolio
- 👤 **Gestión de Hero** - Personaliza tu sección principal
- 💬 **Mensajes de Contacto** - Visualiza mensajes recibidos
- 📊 **DataGrid Material-UI** - Tablas interactivas y funcionales

## 🛠️ Tecnologías

### Core

- **Next.js 13** - Framework de React
- **React 18** - Biblioteca de UI
- **TypeScript** - Superset de JavaScript
- **Tailwind CSS** - Framework de CSS utility-first

### Estado y Datos

- **MongoDB** - Base de datos
- **Mongoose** - ODM para MongoDB
- **SWR** - Fetching y caché de datos

### UI/UX

- **Framer Motion** - Animaciones
- **Material-UI** - Componentes de UI
- **Heroicons** - Iconos
- **React Type Animation** - Animación de texto

### Autenticación y Seguridad

- **JWT (jsonwebtoken)** - Tokens de autenticación
- **Jose** - Verificación de JWT en middleware
- **bcryptjs** - Hash de contraseñas

### Formularios y Validación

- **React Hook Form** - Gestión de formularios
- **React Hot Toast** - Notificaciones

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 16+
- MongoDB (local o MongoDB Atlas)
- npm o yarn

### Instalación

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/jhonatan-majin/portfolio2.git
   cd portfolio2
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno**

   Crea un archivo `.env.local` basado en `.env.example`:

   ```bash
   cp .env.example .env.local
   ```

   Edita `.env.local` con tus credenciales:

   ```env
   MONGO_URL=mongodb://localhost:27017/portfolio
   TOKEN_SECRET=tu_secret_key_muy_seguro
   CLOUDINARY_CLOUD_NAME=tu_cloud_name
   CLOUDINARY_API_KEY=tu_api_key
   CLOUDINARY_API_SECRET=tu_api_secret
   NODE_ENV=development
   ```

4. **Inicia el servidor de desarrollo**

   ```bash
   npm run dev
   ```

5. **Abre tu navegador**

   Visita [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
portfolio/
├── public/                  # Archivos estáticos
│   ├── images/             # Imágenes del portfolio
│   └── *.svg               # Iconos SVG
├── src/
│   └── app/
│       ├── admin/          # Panel de administración
│       │   ├── about/      # Gestión de About
│       │   ├── hero/       # Gestión de Hero
│       │   ├── projects/   # Gestión de Proyectos
│       │   └── messages/   # Gestión de Mensajes
│       ├── api/            # API Routes
│       │   ├── admin/      # APIs de administración
│       │   ├── auth/       # APIs de autenticación
│       │   └── *.ts        # Endpoints públicos
│       ├── auth/           # Páginas de autenticación
│       │   ├── login/      # Login
│       │   └── register/   # Registro
│       ├── components/     # Componentes React
│       │   ├── admin/      # Componentes de admin
│       │   └── *.jsx       # Componentes públicos
│       ├── database/       # Conexión a MongoDB
│       ├── interfaces/     # Interfaces TypeScript
│       ├── models/         # Modelos de Mongoose
│       ├── utils/          # Utilidades (JWT, etc.)
│       ├── globals.css     # Estilos globales
│       ├── layout.js       # Layout principal
│       └── page.js         # Página de inicio
├── .env.example            # Template de variables de entorno
├── .eslintrc.json          # Configuración de ESLint
├── next.config.js          # Configuración de Next.js
├── tailwind.config.js      # Configuración de Tailwind
├── tsconfig.json           # Configuración de TypeScript
└── package.json            # Dependencias del proyecto
```

## 🔐 Autenticación

El proyecto utiliza JWT para autenticación:

1. **Registro/Login** - `/auth/login` y `/auth/register`
2. **Token Storage** - Cookies HTTP-only seguras
3. **Protección de Rutas** - Middleware que verifica tokens
4. **Expiración** - Tokens con duración de 1 día

## 📝 API Endpoints

### Públicos

- `GET /api/admin/hero` - Obtener datos del hero
- `GET /api/admin/project` - Obtener todos los proyectos
- `GET /api/about` - Obtener información About

### Admin (Requieren autenticación)

- `POST /api/admin/hero` - Crear hero
- `PUT /api/admin/hero/[id]` - Actualizar hero
- `DELETE /api/admin/hero/[id]` - Eliminar hero
- `POST /api/admin/project` - Crear proyecto
- `PUT /api/admin/project/[id]` - Actualizar proyecto
- `DELETE /api/admin/project/[id]` - Eliminar proyecto

## 🎨 Personalización

### Colores

Edita `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {...},
      secondary: {...}
    }
  }
}
```

### Metadata y SEO

Edita `src/app/layout.js`:

```javascript
export const metadata = {
  title: "Tu Nombre - Portfolio",
  description: "Tu descripción",
  // ...
};
```

## 📦 Build y Deployment

### Build Local

```bash
npm run build
npm start
```

### Deployment en Vercel

1. Conecta tu repositorio de GitHub
2. Configura las variables de entorno en Vercel
3. Deploy automático en cada push

### Variables de Entorno en Producción

Asegúrate de configurar en Vercel:

- `MONGO_URL`
- `TOKEN_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NODE_ENV=production`

## 🧪 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Crea build de producción
npm start        # Inicia el servidor de producción
npm run lint     # Ejecuta ESLint
```

## 🐛 Troubleshooting

### Error de conexión a MongoDB

- Verifica que MongoDB esté ejecutándose
- Verifica la URL de conexión en `.env.local`
- Verifica permisos de acceso a la base de datos

### Error de TypeScript

- Ejecuta `npm run build` para ver errores de tipo
- Revisa el archivo con errores y corrige los tipos

### Errores de ESLint

- Ejecuta `npm run lint` para ver todos los warnings
- Usa `npm run lint -- --fix` para corregir automáticamente

## 📚 Documentación Adicional

- [MEJORAS_IMPLEMENTADAS.md](./MEJORAS_IMPLEMENTADAS.md) - Lista detallada de mejoras aplicadas
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Jhonatan Majin**

- GitHub: [@jhonatan-majin](https://github.com/jhonatan-majin)
- Portfolio: [Tu Portfolio URL]

## 🙏 Agradecimientos

- Next.js team por el increíble framework
- Vercel por el hosting gratuito
- Comunidad de código abierto

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!
