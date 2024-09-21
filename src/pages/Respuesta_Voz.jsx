import React, { useEffect, useState } from "react";
import Flecha from "../components/Flecha";
import "./WaveAnimation.css";
import { useNavigate } from "react-router-dom";

export const Respuesta_Voz = () => {
  const [hablandoState, sethablandoState] = useState(true);
  const [dots, setDots] = useState("");
  const [displayText, setDisplayText] = useState("");
  const fullText = "Tus gastos más comunes son:";
  const [escuchandoState, setescuchandoState] = useState(false);

  const [transcriptionData, setTranscriptionData] = useState(null);

  const tipoTransaccion = {
    agregar_nuevo_gasto: "Nuevo Gasto",
    agregar_nuevo_ingreso: "Nuevo Ingreso",
    ultimos_gastos: "Últimos Gastos",
    ultimos_ingresos: "Últimos Ingresos",
    analisis_financiero: "Análisis Financiero",
  };

  useEffect(() => {
    console.log("Display:" ,displayText);
    
  }, [displayText])
  

  useEffect(() => {
    const storedData = localStorage.getItem("transcriptionData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if(!parsedData.text.action)
          if(parsedData.text!=="error")
            setDisplayText(parsedData.text.consejos)

        setTranscriptionData(parsedData);
        console.log(parsedData);
      } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
      }
    }
  }, []);

  // useEffect(() => {
  //   if (transcriptionData) {
  //     const utterance = new SpeechSynthesisUtterance();
  //     utterance.text = `Acción: ${transcriptionData.text.action}. Cuenta destino: ${transcriptionData.text.parametros?.cuenta_destino}. Monto: ${transcriptionData.text.parametros?.monto}`;
  //     speechSynthesis.speak(utterance);
  //   }
  // }, [transcriptionData]);

  const handleBotonEscuchar = () => {
    if (!escuchandoState) {
      sethablandoState(false);
      setDisplayText("");
    } else {
      setTimeout(() => {
        sethablandoState(true);
      }, 2000);
    }
    setescuchandoState(!escuchandoState);
  };

  useEffect(() => {
    const interval2 = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500);

    return () => {
      clearInterval(interval2);
    };
  }, []);

  useEffect(() => {
    if (hablandoState) {
      let index = 1;
      const typingInterval = setInterval(() => {
        setDisplayText((prev) => prev + fullText[index]);
        index++;
        if (index === fullText.length - 1) {
          clearInterval(typingInterval);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }
  }, [hablandoState]);

  const navigate = useNavigate();

  const handleConfirmar = () => {
    localStorage.removeItem("transcriptionData");
    navigate("/analisis-financiero");
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-[#EB0029] to-[#B2001F]">
      {/* Header */}
      <div className="text-white flex flex-row justify-between p-8">
        <button>
          <span className="flex flex-row items-center">
            <Flecha />
            <a className="pl-2 font-semibold text-xl" href="/">Atras</a>
          </span>
        </button>
        <button className="font-normal text-xl">Asistente Inteligente</button>
      </div>
  
      {/* Contenido desplazable */}
      <div className="flex-grow overflow-y-auto flex justify-center items-center">
        <div className="bg-gray-100 py-4 px-2 rounded-md w-10/12">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-green-600 flex justify-center items-center rounded-full">
              <svg className="w-20 h-20 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
              </svg>
            </div>
          </div>
          {transcriptionData && (
            <div className="text-center">
              {
                transcriptionData.text.action ? 
                  <h2 className="font-bold text-3xl mb-6">{tipoTransaccion[transcriptionData.text.action]}</h2>
                : transcriptionData.text === 'error' ?
                  <h2 className="font-bold text-3xl mb-6">Error de consulta</h2>
                :
                  <div className="mb-6">
                    <h2 className="font-bold text-md mb-6">{transcriptionData.text.month} - {transcriptionData.text.year}</h2>
                    <h2 className="font-normal px-5 text-xs mb-6 text-justify">
                      <span className="font-bold">Analisis: </span>{transcriptionData.text.analisis}
                    </h2>
                    <h2 className="font-normal px-5 text-xs mb-6 text-justify">
                      <span className="font-bold">Consejos: </span>{transcriptionData.text.consejos}
                    </h2>
                  </div>
              }
  
              {/* Información de los parámetros */}
              {
                transcriptionData.text.action &&
                <>
                <p className="text-xl font-semibold">{transcriptionData.text.parametros?.titulo}</p>
              <p>
                <span className="font-semibold">Monto</span>: {"$"}{transcriptionData.text.parametros?.monto}
              </p>
              <div className="flex justify-center">
                <p className="w-5/6">
                  <span className="font-semibold">Descripción</span>: {transcriptionData.text.parametros?.descripcion}
                </p>
              </div>
              <button className="bg-blue-600 text-white px-2 py-1 rounded-md mt-6" onClick={handleConfirmar}>Confirmar</button>
                </>
              }
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
};
