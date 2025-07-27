
# Control de Horas de Empleados - Frontend React Vite

Este proyecto es el frontend para el sistema de control de horas de empleados. Utiliza React y Vite para una experiencia rápida y moderna.

## Características
- Login para Admin, TL y Empleado
- Paneles para gestión de usuarios, proyectos y registro de horas
- Comunicación con el backend mediante fetch para todas las operaciones CRUD
- Visualización y modificación de horas por usuario, proyecto y rol

## Instalación y uso
```bash
npm install
npm run dev
```

## Estructura recomendada
- `/src/pages` para las páginas principales (Login, PanelAdmin, PanelTL, PanelEmpleado)
- `/src/components` para componentes reutilizables (Formulario, Listados, etc.)

## Comunicación con el backend
Configura la URL del backend en un archivo `.env` o directamente en los servicios de fetch.

## Personalización
Adapta los componentes y estilos según los roles y necesidades de tu empresa.
