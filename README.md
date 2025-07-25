# Sistema de Inventario Escolar
## Descripción

El **Sistema de Inventario Escolar** es una aplicación diseñada para gestionar y controlar los recursos materiales de una institución educativa. Permite registrar, actualizar, consultar y eliminar información sobre artículos, categorías, ubicaciones y movimientos de inventario.

## Características principales

- **Gestión de artículos:** Alta, baja, modificación y consulta de productos.
- **Control de stock:** Registro de entradas y salidas de inventario.
- **Categorías y ubicaciones:** Organización de artículos por tipo y localización física.
- **Interfaz amigable:** Navegación sencilla y accesible para usuarios administrativos.

## Tecnologías utilizadas

- **Backend:** Node.js, Express.js
- **Base de datos:** MongoDB
- **Frontend:** React.js (o especificar si es diferente)
- **Control de versiones:** Git y GitHub

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/usuario/proyecto-inventario.git
    ```
2. Instala las dependencias del backend:
    ```bash
    cd backend
    npm install
    ```
3. Instala las dependencias del frontend:
    ```bash
    cd ../frontend
    npm install
    ```
4. Configura las variables de entorno según el archivo `.env.example`.
5. Inicia el servidor backend:
    ```bash
    npm start
    ```
6. Inicia el frontend:
    ```bash
    npm start
    ```

## Uso

- Accede a la aplicación desde tu navegador en `http://localhost:5173`.
- Utiliza el menú principal para navegar entre las secciones de artículos, categorías, ubicaciones y movimientos.
- Registra nuevos artículos y actualiza el inventario según las necesidades.

## Estructura del proyecto

```
proyecto-inventario/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
└── README.md
```

## Contribución

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT.

## Contacto

Para dudas o sugerencias, contacta a [marioesteban.zepedasoto@gmail.com].