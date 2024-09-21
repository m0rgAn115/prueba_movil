import React, { useEffect, useState } from "react";
import Flecha from "../components/Flecha";
import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { toPadding } from "chart.js/helpers";
import { Alerta_cuidado } from "../components/analisis_financiero/Alerta_cuidado";
import { Ultimos_Movimientos } from "../components/analisis_financiero/Ultimos_Movimientos";
import { Saldo_Item } from "../components/analisis_financiero/Saldo_Item";

// Registra los componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Months_data = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const data = {
  labels: [
    "Suscripciones",
    "Renta",
    "Transporte",
    "Comida",
    "Automovil",
    "Mascotas",
  ],
  datasets: [
    {
      label: "My First Dataset",
      data: [12, 19, 3, 5, 2, 3], // Datos del gráfico
      backgroundColor: [
        "rgba(255, 99, 132, 1)", // Color de fondo para cada segmento
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderColor: [
        "rgba(255, 255, 255, 1)", // Color del borde para cada segmento
        "rgba(255, 255, 255, 1)",
        "rgba(255, 255, 255, 1)",
        "rgba(255, 255, 255, 1)",
        "rgba(255, 255, 255, 1)",
        "rgba(255, 255, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw}`;
        },
      },
    },
  },
};

export const Analisis_Financiero_Screen = () => {
  const [mes_seleccionado, setmes_seleccionado] = useState(8);

  const [chart_Labels, setchart_Labels] = useState([{}])
  const [chart_Data, setchart_Data] = useState(data)

  const [Color_Categoria, setColor_Categoria] = useState(new Map())

  const [isChecked, setIsChecked] = useState(false);
  const Transacciones_Categoria = new Map();

  const [transacciones_Filtradas, settransacciones_Filtradas] = useState([{}])
  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleCambiarMes = (numero) => {
    const nuevo_mes = numero + mes_seleccionado;
    if (nuevo_mes > Months_data.length - 1) setmes_seleccionado(0);
    else if (nuevo_mes < 0) setmes_seleccionado(Months_data.length - 1);
    else setmes_seleccionado(nuevo_mes);
  };

  const [saldo, setSaldo] = useState(0);
  const [transacciones, setTransacciones] = useState([
    {
      id: 0,
      tipo: "ingreso",
      descripcion: "salario mensual",
      monto: 5000,
      categoria: "Servicios",
      fecha: "2024-08-05"
    },
    {
      id: 0,
      tipo: "ingreso",
      descripcion: "salario mensual",
      monto: 5000,
      categoria: "Viveres",
      fecha: "2024-08-05"
    },
    {
      id: 0,
      tipo: "ingreso",
      descripcion: "salario mensual",
      monto: 5000,
      categoria: "Comida",
      fecha: "2024-08-05"
    },
    {
      id: 0,
      tipo: "ingreso",
      descripcion: "salario mensual",
      monto: 5000,
      categoria: "Transporte",
      fecha: "2024-08-05"
    },
    {
      id: 0,
      tipo: "ingreso",
      descripcion: "salario mensual",
      monto: 5000,
      categoria: "Transporte",
      fecha: "2024-08-05"
    },
    {
      id: 0,
      tipo: "ingreso",
      descripcion: "salario mensual",
      monto: 5000,
      categoria: "Otro",
      fecha: "2024-08-05"
    }
])

useEffect(() => {
  const filteredTransacciones = transacciones.filter((transaccion) => {
    const fecha = new Date(transaccion.fecha);
    return fecha.getMonth() === mes_seleccionado; // Filtra por mes
  });

  settransacciones_Filtradas(filteredTransacciones)

  console.log("filtradas: ", filteredTransacciones);

  

  const uniqueLabels = []; // Array temporal para las claves únicas
  const newData = []; // Array temporal para los datos

  filteredTransacciones.forEach((element) => {
    const clave = element.categoria;
    if (!Transacciones_Categoria.has(clave)) {
      Transacciones_Categoria.set(clave, []);
    }
    Transacciones_Categoria.get(clave).push(element);
  });

  Transacciones_Categoria.forEach((value, key) => {
    if (!uniqueLabels.includes(key)) {
      uniqueLabels.push(key);  // Añade la clave si no está en el array
    }
  });

  uniqueLabels.forEach((e) => {
    let suma = 0;
    Transacciones_Categoria.get(e).forEach((element) => {
      suma += element.monto;  // Acumula el monto
    });
    newData.push(suma);  // Agrega la suma al array de datos
  });

  
  
  // Genera colores para cada label
  const backgroundColors = uniqueLabels.map(() => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  });

  for (let i = 0; i < uniqueLabels.length; i++) {
    Color_Categoria.set(uniqueLabels[i],backgroundColors[i])
  }

  // Actualiza el estado con las claves únicas
  setchart_Labels(uniqueLabels);

  

  setchart_Data((prevData) => ({
    ...prevData,
    labels: uniqueLabels, // Actualiza los labels
    datasets: [
      {
        label: "My First Dataset",
        data: newData, // Datos del gráfico
        backgroundColor: backgroundColors, // Colores generados
        borderColor: backgroundColors.map(color => color.replace('1)', '0.5)')), // Colores de borde
        borderWidth: 1,
      },
    ],
  }));

  console.log("map: ", Color_Categoria);
}, [transacciones, mes_seleccionado]);




  




  const [categorias, setCategorias] = useState([{
    nombre: "Servicios",
    transacciones: [{
      id: 0,
      tipo: "ingreso",
      descripcion: "salario mensual",
      monto: 5000,
      categoria: "Servicios",
      fecha: "2024-08-05"
    }]
  }])

  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        const response = await fetch('https://mayiaflask.azurewebsites.net/api/saldo');
        const data = await response.json();
        setSaldo(data.saldo_disponible);
      } catch (error) {
        console.log('Error al obtener el saldo', error);
      }
    };

    const fetchTransacciones = async () => {
      try {
        const response = await fetch('https://mayiaflask.azurewebsites.net/api/transacciones');
        const data = await response.json();
    
        // Asegúrate de que 'data' sea un array
        const transaccionesConCategorias = data.map(e => ({
          ...e,  // Usar el operador de expansión dentro de un objeto
          categoria: e.descripcion.split(" ")[0]
        }));
    
        setTransacciones(transaccionesConCategorias);
    
        transaccionesConCategorias.forEach(element => {
          if (!Transacciones_Categoria.has(element.categoria)) {
            Transacciones_Categoria.set(element.categoria, []);
          }
          Transacciones_Categoria.get(element.categoria).push(element);
        });
      } catch (error) {
        console.log('Error al obtener el saldo', error);
      }
    };
    

    fetchSaldo();
    fetchTransacciones();
  }, []);

  return (
    <div className="overflow-x-hidden relative">
      <div className="w-full bg-gradient-to-r from-[#EB0029] to-[#B2001F] h-screen p-8 relative z-10">
        <div className="text-white flex flex-row justify-between">
          <button>
            <span className="flex flex-row items-center">
              <Flecha />
              <a className="font-semibold text-lg" href="/">
                atrás
              </a>
            </span>
          </button>
          <button className="font-bold text-2xl">Análisis financiero</button>
        </div>
        <div className="bg-slate-100 w-full mx-auto h-auto rounded-3xl p-5 mt-5 relative z-20">
          <div className="flex flex-row justify-end transition-transform duration-300 hover:scale-105 mr-2 "></div>

          <div>
            <p className="font-semibold text-slate-700">Disponible</p>
            <span className="flex flex-row">
              <p className="font-medium text-[#3629B7] text-4xl">
                {saldo}
              </p>
              <p className="self-end text-slate-500 font-medium ml-1">mxn</p>
            </span>
          </div>
          <p className="font-medium mt-5">Gastos por categoría.</p>
          <div className="justify-between flex flex-row mt-5 ">
            <button
              className="text-[#3629B7] "
              onClick={() => handleCambiarMes(-1)}>
              <Flecha />
            </button>
            <p className="text-[#3629B7] font-medium self-center text-2xl transition-transform duration-300 hover:scale-110">
              {Months_data[mes_seleccionado]}
            </p>
            <button
              className="text-[#3629B7]"
              onClick={() => handleCambiarMes(1)}>
              <Flecha invertirFlecha={true} />
            </button>
          </div>

          <div className="justify-center mt-5 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg rounded-lg">
            <span className="flex flex-row mx-auto justify-center">
              <p className="font-medium text-2xl">
                {saldo}
              </p>
              <p className="self-end text-slate-500 font-medium ml-1">mxn</p>
            </span>
            <div className="sm:w-5/6 h-full justify-center mx-auto mt-2 ">
              <Doughnut data={chart_Data} options={options} />
            </div>
          </div>
        </div>
        <div className=" relative w-full z-20 mt-5">
          <p className="text-sm font-bold text-[#F25700]">¡Cuidado!</p>
          <Alerta_cuidado />
          <hr className="border-t-1 border-gray-300 mt-1" />

          <Ultimos_Movimientos movimientos={transacciones_Filtradas} colores_categoria={Color_Categoria} />
        </div>

        {/* Este div debe tener un z-index menor para que quede detrás */}
        <div className="absolute top-1/3 w-full h-2/3 bg-white z-0 left-0 rounded-t-3xl "></div>
      </div>
    </div>
  );
};
