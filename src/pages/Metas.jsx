import React, { useState } from "react";
import Flecha from "../components/Flecha";

export default function Metas() {
  const [historialVisible, setHistorialVisible] = useState([]);

  const toggleHistorial = (index) => {
    setHistorialVisible((prev) => {
      const newVisibility = [...prev];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  const Metas = [
    {
      nombre: "Laptop Nueva",
      monto: 18000,
      acumulado: 824,
      icon: "💻",
      historial_ahorro: [
        {
          fecha: "11/09/24",
          monto: 800,
          descripcion: "Tarjeta de debito",
        },
        {
          fecha: "09/09/24",
          monto: 24,
          descripcion: "Ahorro de cancelación de suscripción",
        },
      ],
    },
    {
      nombre: "Viaje a Cancún",
      monto: 10000,
      acumulado: 2000,
      icon: "🌴",
      historial_ahorro: [
        {
          fecha: "11/09/24",
          monto: 2000,
          descripcion: "Tarjeta de debito",
        },
      ],
    },
    {
      nombre: "Casa en la playa",
      monto: 200000,
      acumulado: 0,
      icon: "🏖",
      historial_ahorro: [],
    },
  ];

  return (
    <>
      <main className="h-[100vh] flex flex-col w-screen max-w-screen bg-gradient-to-r from-[#EB0029] to-[#B2001F] pt-3">
        {/* Header */}
        <div className="flex justify-between px-[41px] my-5">
          <a href="/" className="font-bold text-[16px] text-white text-center">
            <span className="flex flex-row items-center">
              <Flecha />
              <span className="font-semibold text-lg">atrás</span>
            </span>
          </a>

          <p className="tracking-tight font-extrabold text-white">
            <button className="font-bold text-2xl">Metas</button>
          </p>
        </div>

        {/* Eliminar y agreagar metas */}
        <section className="bg-white pt-5 rounded-t-3xl px-[41px] shadow-sm">
          <div className="flex items-center justify-center gap-5 mb-5">
            <div className="text-[#EB0029] font-bold text-[16px]">
              Eliminar.
            </div>
            <div className="font-bold text-[16px] px-5 rounded-md py-1 bg-[#085FE1] text-white">
              Agregar
            </div>
          </div>
        </section>
        {/* Content */}
        <section className="flex-grow bg-white pt-5 px-[41px] border-t-2 border-[#ffffff] overflow-y-auto pb-16">
          {/* each meta */}
          {Metas.map((meta, index) => (
            <article key={index}>
              {/* Ahorro por cada uno */}
              <div className="w-full h flex gap-[5px] items-center">
                <div className="w-10 h-10 rounded-lg shadow-xl flex items-center">
                  <div className="w-full  text-center">{meta.icon}</div>
                </div>
                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-center">
                    <p className="text-black font-medium text-[16px]">
                      {meta.nombre}
                    </p>
                    <p className="text-[#085FE1] font-semibold text-[16px]">
                      ${meta.monto}.00
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <div className="flex-grow h-[7px] bg-[#D9D9D9] rounded-md">
                      <div
                        className="h-full bg-[#085FE1] rounded-md"
                        style={{
                          width: `${(meta.acumulado / meta.monto) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <a onClick={() => toggleHistorial(index)}>
                      {historialVisible[index] ? (
                        <svg
                          className="size-[24px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          transform="rotate(180)"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M7 10L12 15L17 10"
                              stroke="#085FE1"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
                      ) : (
                        <svg
                          className="size-[24px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#085FE1"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M7 10L12 15L17 10"
                              stroke="#085FE1"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
                      )}
                    </a>
                  </div>
                </div>
              </div>
              {historialVisible[index] && (
                <>
                  <p className="text-black my-[18px] font-semibold text-[12px]">
                    Historial de ahorro.
                  </p>
                  {meta.historial_ahorro.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {meta.historial_ahorro.map((ahorro, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-4 items-center"
                        >
                          <p className="text-black  text-[12px]">
                            {ahorro.fecha}
                          </p>
                          <p className="text-black col-span-2  text-[12px]">
                            {ahorro.descripcion}
                          </p>
                          <p className="text-[#085FE1] text-right text-[12px]">
                            ${ahorro.monto}.00
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-black mt-4 text-center text-[12px]">
                      Comienza a ahorrar para esta meta!
                    </p>
                  )}
                  <div className="flex justify-center mt-[18px]">
                    <a
                      href=""
                      className="inline-flex items-center  gap-2 text-black text-[12px] px-5 py-[2px] border border-black rounded-md font-semibold"
                    >
                      Consejos
                      <svg
                        className="size-[12px]"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"></path>{" "}
                        </g>
                      </svg>
                    </a>
                  </div>
                </>
              )}
              <div className=" my-[28px] h-[0.5px] bg-black/25 mx-3" />
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
