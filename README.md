# Client Track

Una aplicación web moderna para la gestión y seguimiento de clientes, construida con React y Vite.

## 📋 Descripción del Proyecto

**Client Track** es un sistema de gestión de clientes que permite a los usuarios administrar información de clientes de manera eficiente. La aplicación ofrece una interfaz intuitiva y moderna para registrar, actualizar y visualizar perfiles de clientes, con autenticación segura y un dashboard personalizado.

## 🎯 Para Qué Sirve

Esta aplicación es ideal para:
- **Pequeños negocios y emprendimientos** que necesiten organizar información de sus clientes
- **Equipos de ventas** que requieran un seguimiento centralizado de clientes
- **Profesionales independientes** que quieran mantener un registro de sus contactos
- **Empresas de servicios** que necesiten acceder rápidamente a datos de clientes

## ✨ Características Principales

- 🔐 **Autenticación segura** - Sistema de login para acceso protegido
- 📊 **Dashboard personalizado** - Vista general del estado de clientes
- 👥 **Gestión de clientes** - Crear, editar y visualizar información de clientes
- 👤 **Perfiles de usuario** - Gestión de perfil personal del usuario
- 🎨 **Interfaz moderna** - Diseño responsivo con Tailwind CSS
- ⚡ **Rendimiento optimizado** - Construcción rápida con Vite

## 🏗️ Estructura del Proyecto

```
client-track/
├── public/              # Archivos estáticos públicos
├── src/                 # Código fuente principal
│   ├── api/
│   │   └── client.js   # Cliente HTTP para llamadas API
│   ├── assets/         # Imágenes y otros assets
│   ├── components/     # Componentes reutilizables
│   │   ├── ClientForm.jsx      # Formulario para gestionar clientes
│   │   ├── Clients.jsx         # Listado de clientes
│   │   ├── Profile.jsx         # Componente de perfil
│   │   └── Sidebar.jsx         # Barra lateral de navegación
│   ├── context/        # Context API para estado global
│   │   └── AuthContext.jsx     # Contexto de autenticación
│   ├── pages/          # Páginas principales
│   │   ├── Dashboard.jsx       # Dashboard principal
│   │   └── Login.jsx           # Página de login
│   ├── App.jsx         # Componente principal
│   ├── App.css         # Estilos principales
│   ├── main.jsx        # Punto de entrada
│   └── index.css       # Estilos globales
├── index.html          # Archivo HTML principal
├── package.json        # Dependencias y configuración
├── vite.config.js      # Configuración de Vite
├── tailwind.config.mjs # Configuración de Tailwind CSS
├── postcss.config.mjs  # Configuración de PostCSS
├── eslint.config.js    # Configuración de ESLint
└── README.md           # Este archivo
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Librería UI moderna
- **React Router DOM** - Enrutamiento de aplicación
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Framework CSS utility-first
- **PostCSS** - Procesador de CSS

### Herramientas de Desarrollo
- **ESLint** - Linter para mantener la calidad del código
- **Node.js** - Entorno de ejecución

## 📦 Instalación

### Requisitos Previos
- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar o descargar el repositorio**
   ```bash
   git clone <URL-del-repositorio>
   cd client-track
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Acceder a la aplicación**
   - Abre tu navegador y ve a `http://localhost:5173`

## 🚀 Comandos Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con hot reload
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Visualiza la aplicación compilada
- `npm run lint` - Ejecuta ESLint para verificar la calidad del código

## 🔄 Flujo de la Aplicación

1. El usuario accede a la aplicación en la página de **Login**
2. Realiza la autenticación (credenciales de usuario)
3. Es redirigido al **Dashboard** principal
4. Puede navegar a través de la **Sidebar** para:
   - Ver el listado de **Clientes**
   - Acceder a su **Perfil** personal
   - Gestionar clientes (crear, editar, eliminar)

## 📝 Notas de Desarrollo

- El contexto de autenticación (`AuthContext`) maneja el estado global de la sesión del usuario
- El cliente API (`client.js`) centraliza todas las llamadas HTTP
- Los componentes están organizados de manera modular para facilitar el mantenimiento
- Tailwind CSS proporciona un estilo consistente y responsivo

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:
1. Crea un branch para tu feature
2. Realiza tus cambios
3. Envía un pull request con una descripción clara

## 📄 Licencia

Este proyecto está disponible bajo una licencia abierta. Consulta los detalles de la licencia para más información.

## 📞 Soporte

Si encuentras problemas o tienes preguntas sobre la aplicación, por favor abre un issue en el repositorio.

---

**Última actualización:** Enero 2026
