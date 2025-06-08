import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function Graphics({ products }) {
  // Barras, cantidad de productos por categoría
  const categories = Array.from(new Set(products.map(p => p.category)));
  const qtyByCategory = categories.map(cat => products.filter(p => p.category === cat).length);
  const barData = {
    labels: categories,
    datasets: [
      {
        label: 'Cantidad de productos',
        data: qtyByCategory,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
    ],
  };

  // Linea, evolución de precios simulada
  // En la línea a continuación, acomodamos los productos por su id para simular evolución de precios
  const sortedById = [...products].sort((a, b) => a.id - b.id);
  const lineData = {
    labels: sortedById.map((p, i) => `P${p.id}`),
    datasets: [
      {
        label: 'Evolución de precios simulada',
        data: sortedById.map(p => p.price),
        fill: false,
        borderColor: 'rgba(12, 247, 247, 0.7)',
        backgroundColor: 'rgba(14, 234, 241, 0.77)',
        tension: 0.4,
      },
    ],
  };

  // Torta, proporción de productos por stock
  const stockRanges = ['Bajo (<20)', 'Medio (20-50)', 'Alto (>50)'];
  const stockCounts = [
    products.filter(p => p.stock < 20).length,
    products.filter(p => p.stock >= 20 && p.stock <= 50).length,
    products.filter(p => p.stock > 50).length,
  ];
  const pieData = {
    labels: stockRanges,
    datasets: [
      {
        label: 'Proporción por stock',
        data: stockCounts,
        backgroundColor: [
          'rgba(236, 70, 120, 0.96)',
          'rgba(238, 250, 71, 0.88)',
          'rgba(155, 241, 73, 0.9)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid md:grid-cols-3 gap-8 my-8">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="font-bold mb-2">Cantidad de productos por categoría</h3>
        <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="font-bold mb-2">Evolución de precios simulada</h3>
        <Line data={lineData} options={{ responsive: true }} />
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="font-bold mb-2">Productos por stock</h3>
        <Pie data={pieData} options={{ responsive: true }} />
      </div>
    </div>
  );
}

export default Graphics;
