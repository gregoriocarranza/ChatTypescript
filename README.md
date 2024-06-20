# TourFinder Chat Backend

Este repositorio contiene el backend del servicio de chat para la aplicación TourFinder, implementado como un microservicio separado del backend principal. Este servicio está desarrollado en TypeScript y utiliza Node.js y WebSockets para gestionar comunicaciones en tiempo real entre usuarios.

## Comenzando

### Prerrequisitos

Antes de comenzar, es necesario tener Node.js instalado, ya que es esencial para ejecutar un entorno de desarrollo TypeScript. Puedes instalar Node.js desde el [sitio oficial de Node.js](https://nodejs.org/).

### Instalación

Clona el repositorio y navega al directorio del proyecto:

```bash
git clone https://github.com/gregoriocarranza/findYourGuide-ChatTypescript.git
cd find-your-guide-react
```

Instala las dependencias necesarias:

```bash
npm install
```

### Compilación de TypeScript

Antes de ejecutar el servidor, debes compilar los archivos TypeScript a JavaScript. Esto se puede hacer ejecutando:

```bash
npm run build
```

Este comando compilará el código TypeScript en el directorio `dist`, listo para ser ejecutado.

### Ejecutando el Servidor

Para iniciar el servidor de chat en modo de desarrollo:

```bash
npm run start:dev
```

Esto lanzará el servidor de WebSocket y permitirá la comunicación en tiempo real entre los clientes conectados.

## Características

El servidor de chat TourFinder soporta:

- Conexiones en tiempo real entre clientes utilizando WebSockets.
- Gestión de múltiples usuarios y sesiones simultáneas.
- Envío y recepción de mensajes de forma instantánea.
- Integración con el sistema principal de TourFinder para autenticación y manejo de usuarios.

## Recursos Adicionales

- [Repositorio Frontend](https://github.com/CBMaio/find-your-guide-react)
- [Backend de Chat Typescript.js](https://github.com/gregoriocarranza/findYourGuide-ChatTypescript)
- [Repositorio Backend Java](https://github.com/FacuMartinezVidal/findyourguide)

## Contribuyendo

Si estás interesado en contribuir al desarrollo del backend del chat para TourFinder, por favor revisa las directrices de contribución y envía tus pull requests al repositorio.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.
