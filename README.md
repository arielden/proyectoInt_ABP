# Proyecto Integrador - ABP.
Autor: Ariel Denaro

## Configuración e Instrucciones

Este repositorio contiene el proyecto ABP correspondiente a la materia Proyecto Integrador de la Tecnicatura Superior en Ciencia de Datos en Inteligencia Artificial
Es una aplicación Vite + React que implementa una grilla de productos con filtrado, ordenamiento, paginación, exportación de datos, estadísticas y visualización gráfica.

## Requisitos

Tener instalado Node.js y npm:

- [Node.js](https://nodejs.org/) (versión 14 o superior)

## Instalación

1. Clonar este repositorio en local.
2. Navegar hasta el directorio del proyecto:

   ```bash
   cd proyectoABP
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

## Ejecución del servidor

1. Lanzar el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

2. Abrir el navegador y acceder al enlace que aparece en la terminal (`http://localhost:5173`).

## Notas

- Se utiliza **Tailwind CSS** para los estilos.
- Se utilizó **Axios** para manejar las solicitudes HTTP a la API.
- PAra los gráficos se utiliza, **react-chartjs-2** y **Chart.js**
- Se incluye paginación, filtrado por categoría, búsqueda, ordenamiento por precio y rating, y función de exportación de datos a JSON o CSV.
- Tamibién se incluyó un diálogo de notificación mostrando la cantidad de resultados encontrados con éxito.

## Funciones principales

- **Búsqueda y filtrado:** Filtra productos por nombre y categoría.
- **Ordenamiento:** Ordena los productos por precio o rating, ascendente o descendente.
- **Paginación:** Visualiza los productos paginadosm 10 por página.
- **Exportación:** Exporta los productos filtrados a archivos JSON o CSV.
- **Estadísticas:** Muestra estadísticas dinámicas sobre los productos filtrados, incluyendo:
  - Precio promedio, máximo y mínimo
  - Cantidad de productos por categoría seleccionada
  - Cantidad de productos con stock > 50 y rating > 4.5
  - Precio promedio, producto más barato/caro y rating promedio por categoría
- **Gráficos:**
  - Barras: cantidad de productos por categoría
  - Línea: evolución simulada de precios
  - Torta: proporción de productos por stock
- **Notificaciones:** Muestra notificaciones cuando se encuentran resultados en la búsqueda.
- **Modo oscuro:** Permite cambiar entre tema claro y oscuro.

## Componentes

- **FirstComponent:** Componente principal que gestiona la lógica de búsqueda, filtrado, ordenamiento, paginación, exportación y notificaciones.
- **StatsPanel:** Muestra estadísticas dinámicas calculadas sobre los productos filtrados.
- **ProductList:** Muestra los productos filtrados en una grilla.
- **ProductItem:** Muestra la información de un producto individual.
- **SearchBar:** Barra de búsqueda.
- **Graphics:** Visualización de gráficos con react-chartjs-2.

## Referencias

- API utilizada: [DummyJSON](https://dummyjson.com/)
- Gráficos: [react-chartjs-2](https://react-chartjs-2.js.org/)
- Estilos: [Tailwind CSS](https://tailwindcss.com/)