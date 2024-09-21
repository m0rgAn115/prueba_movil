import React, { useEffect, useState, useRef } from "react";
import cardVisa from "./images/cardVisa.webp";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requestMicrophoneAccess = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setStream(mediaStream);
        console.log("Acceso al micrófono concedido");
      } catch (err) {
        setError('No se pudo acceder al micrófono');
        console.error("Error al acceder al micrófono:", err);
      }
    };

    requestMicrophoneAccess();
  }, []); // Se ejecu

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Tu navegador no soporta la grabación de audio.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      setRecording(true);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        sendAudio(audioBlob);
      };
    } catch (error) {
      console.error("Error al acceder al micrófono:", error);
      alert("No se pudo acceder al micrófono.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const sendAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "grabacion.wav");

    try {
      const response = await fetch(
        "https://mayiaflask.azurewebsites.net/transcribe",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error en la transcripción");
      }

      const data = await response.json();
      // alert(`Transcripción: ${data.text}`);
      // console.log(data);
      // console.log(data.text.action);

      // Guardamos la respuesta en localStorage
      localStorage.setItem("transcriptionData", JSON.stringify(data));
      navigate("/asistente-inteligente");
    } catch (error) {
      console.error("Error al transcribir el audio:", error);
      alert("Hubo un error al transcribir el audio.");
    }
  };

  const [escuchandoState, setescuchandoState] = useState(false);

  const navigate = useNavigate();

  const handleBotonEscuchar = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }

    // if (escuchandoState) navigate("/asistente-inteligente");

    setescuchandoState(!escuchandoState);
  };

  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="max-w-screen bg-gradient-to-b from-primary to-red-900">
      {/* Navbar */}
      {/* <nav className="flex justify-center pt-6">
        <div className="w-10/12 bg-transparent border-2 rounded-full px-4 py-3 border-gray-50/[0.8] flex items-center justify-between">
          <p className="text-white font-semibold">HackNorte</p>

          <div className="flex items-center space-x-4">
            <svg
              className="text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="32px"
              height="32px"
              viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5 19q-.425 0-.712-.288T4 18t.288-.712T5 17h1v-7q0-2.075 1.25-3.687T10.5 4.2v-.7q0-.625.438-1.062T12 2t1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v7h1q.425 0 .713.288T20 18t-.288.713T19 19zm7 3q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22"
              />
            </svg>
            <button className="w-10 h-10 rounded-full bg-blue-200 flex justify-center items-center">
              <p>🙋‍♂️</p>
            </button>
          </div>
        </div>
      </nav> */}

      <section className="flex justify-center pt-12">
        <div className="w-10/12">
          <h2 className="text-6xl text-white font-semibold">
            ¿Le puedo ayudar en algo? ...
          </h2>
        </div>
      </section>

      {/* <-- Boton para activar el control por voz --> */}
      <div className="relative flex items-center justify-center w-full h-72 flex-col">
        {!escuchandoState && (
          <>
            <span className="absolute w-40 h-40 bg-white/[0.1] rounded-full animate-ping opacity-15"></span>
            <span className="absolute w-32 h-32 bg-white/[0.2] rounded-full animate-ping opacity-50"></span>
            <span className="absolute w-24 h-24 bg-white/[0.3]  rounded-full animate-ping opacity-75"></span>
          </>
        )}

        <button
          className="relative z-10 p-6 bg-white/[0.2] rounded-full"
          onClick={handleBotonEscuchar}>
          {!escuchandoState ? (
            <svg
              className="text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="48px"
              height="48px"
              viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 14q-1.25 0-2.125-.875T9 11V5q0-1.25.875-2.125T12 2t2.125.875T15 5v6q0 1.25-.875 2.125T12 14m-1 6v-2.075q-2.3-.325-3.937-1.95t-1.988-3.95q-.05-.425.225-.725T6 11t.713.288T7.1 12q.35 1.75 1.738 2.875T12 16q1.8 0 3.175-1.137T16.9 12q.1-.425.388-.712T18 11t.7.3t.225.725q-.35 2.275-1.975 3.925T13 17.925V20q0 .425-.288.713T12 21t-.712-.288T11 20"
              />
            </svg>
          ) : (
            <svg
              className="text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 16 16">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.5 1.5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        {escuchandoState && (
          <h2 className="mt-5 text-xl font-bold text-white">
            Escuchando<span className="animate-pulse">{dots}</span>
          </h2>
        )}
      </div>

      {/* Tarjeta */}
      <section className="bg-white relative h-[450px] mt-20 rounded-t-3xl">
        <div className="flex justify-center absolute -top-20 w-full">
          <div className="">
            <a
              href="/analisis-financiero"
              className="text-center">
              <img
                src={cardVisa}
                alt="tarjeta de credito"
                className="h-48"
              />
            </a>
          </div>
        </div>

        <div className="absolute flex justify-center mt-48 w-full">
          <div className="w-10/12 flex justify-between">
            <a
              href="/"
              className="bg-gray-50 shadow-md rounded-xl shadow-gray-400 p-6">
              <div className="flex items-center justify-center">
                <svg
                  className="text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M5 16v-5q0-.425.288-.712T6 10t.713.288T7 11v5q0 .425-.288.713T6 17t-.712-.288T5 16m6 0v-5q0-.425.288-.712T12 10t.713.288T13 11v5q0 .425-.288.713T12 17t-.712-.288T11 16m10-8H2.9q-.375 0-.638-.262T2 7.1v-.55q0-.275.138-.475T2.5 5.75l8.6-4.3q.425-.2.9-.2t.9.2l8.55 4.275q.275.125.413.375t.137.525V7q0 .425-.287.713T21 8M3 21q-.425 0-.712-.288T2 20t.288-.712T3 19h10.05q.425 0 .713.288t.287.712t-.288.713t-.712.287zm15-8.25q-.425 0-.712-.288T17 11.75V11q0-.425.288-.712T18 10t.713.288T19 11v.75q0 .425-.288.713T18 12.75m-2 5.8v-1.925q0-.275.138-.525t.412-.375l3-1.5q.2-.125.45-.125t.45.125l3 1.5q.275.125.413.375t.137.525v1.925q0 1.875-.975 3.238t-2.65 2.062q-.05.025-.375.075q-.05 0-.375-.075q-1.675-.7-2.65-2.062T16 18.55m3.275.325l-.45-.45q-.225-.225-.525-.213t-.525.238t-.225.525t.225.525l.8.8q.3.3.7.3t.7-.3l2.25-2.225q.225-.225.225-.525t-.225-.525t-.525-.212t-.525.212z"
                  />
                </svg>
              </div>
              <p className="text-center font-semibold text-md">Operaciones</p>
            </a>
            <a
              href="/metas"
              className="   bg-gray-50 shadow-md rounded-xl shadow-gray-400 w-[144px] p-6">
              <div className="flex items-center justify-center">
                <svg
                  className="text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M16 11q.425 0 .713-.288T17 10t-.288-.712T16 9t-.712.288T15 10t.288.713T16 11M8 9h5V7H8zM4.5 21q-.85-2.85-1.675-5.687T2 9.5q0-2.3 1.6-3.9T7.5 4h5q.725-.95 1.763-1.475T16.5 2q.625 0 1.063.438T18 3.5q0 .125-.125.575q-.1.275-.187.563t-.138.587L19.825 7.5H22v6.975l-2.825.925L17.5 21H12v-2h-2v2z"
                  />
                </svg>
              </div>
              <p className="text-center font-semibold text-md">Metas</p>
            </a>
          </div>
        </div>
      </section>
      {/* Navbar para dispositivos móviles */}

      <nav
        className="md:hidden fixed bottom-5 left-3 right-3 text-white flex justify-around items-center h-16 rounded-t-3xl rounded-b-3xl shadow-md shadow-gray-400"
        style={{ backgroundColor: "#E40128" }}>
        <a
          href="#"
          className="flex flex-col items-center">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              fill="#C9C9C9"
              fillRule="evenodd"
              d="M2.52 7.823C2 8.77 2 9.915 2 12.203v1.522c0 3.9 0 5.851 1.172 7.063S6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.212S22 17.626 22 13.725v-1.521c0-2.289 0-3.433-.52-4.381c-.518-.949-1.467-1.537-3.364-2.715l-2-1.241C14.111 2.622 13.108 2 12 2s-2.11.622-4.116 1.867l-2 1.241C3.987 6.286 3.038 6.874 2.519 7.823M11.25 18a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        <a
          href="/analisis-financiero"
          className="flex flex-col items-center">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path
              fill="#C9C9C9"
              d="M47.5 104H432V51.52a16 16 0 0 0-19.14-15.69l-368 60.48a16 16 0 0 0-12 10.47A39.7 39.7 0 0 1 47.5 104m416 24h-416a16 16 0 0 0-16 16v288a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V144a16 16 0 0 0-16-16M368 320a32 32 0 1 1 32-32a32 32 0 0 1-32 32"
            />
            <path
              fill="#C9C9C9"
              d="M31.33 259.5V116c0-12.33 5.72-18.48 15.42-20c35.2-5.53 108.58-8.5 108.58-8.5s-8.33 16-27.33 16V128c18.5 0 31.33 23.5 31.33 23.5L84.83 236Z"
            />
          </svg>
        </a>
        <a
          href="/metas"
          className="flex flex-col items-center">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512">
            <path
              fill="#C9C9C9"
              d="M400 96v.7c-5.3-.4-10.6-.7-16-.7H256c-16.5 0-32.5 2.1-47.8 6c-.1-2-.2-4-.2-6c0-53 43-96 96-96s96 43 96 96m-16 32c3.5 0 7 .1 10.4.3c4.2.3 8.4.7 12.6 1.3c17.6-20.5 43.8-33.6 73-33.6h11.5c10.4 0 18 9.8 15.5 19.9l-13.8 55.2c15.8 14.8 28.7 32.8 37.5 52.9H544c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32h-32c-9.1 12.1-19.9 22.9-32 32v64c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32v-32H256v32c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32v-64c-34.9-26.2-58.7-66.3-63.2-112H68c-37.6 0-68-30.4-68-68s30.4-68 68-68h4c13.3 0 24 10.7 24 24s-10.7 24-24 24h-4c-11 0-20 9-20 20s9 20 20 20h31.2c12.1-59.8 57.7-107.5 116.3-122.8c12.9-3.4 26.5-5.2 40.5-5.2zm64 136a24 24 0 1 0-48 0a24 24 0 1 0 48 0"
            />
          </svg>
        </a>

        <a
          href="/operaciones"
          className="flex flex-col items-center">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              fill="#C9C9C9"
              d="M21.66 10.37a.6.6 0 0 0 .07-.19l.75-4a1 1 0 0 0-2-.36l-.37 2a9.22 9.22 0 0 0-16.58.84a1 1 0 0 0 .55 1.3a1 1 0 0 0 1.31-.55A7.08 7.08 0 0 1 12.07 5a7.17 7.17 0 0 1 6.24 3.58l-1.65-.27a1 1 0 1 0-.32 2l4.25.71h.16a.9.9 0 0 0 .34-.06a.3.3 0 0 0 .1-.06a.8.8 0 0 0 .2-.11l.08-.1a1 1 0 0 0 .14-.16a.6.6 0 0 0 .05-.16m-1.78 3.7a1 1 0 0 0-1.31.56A7.08 7.08 0 0 1 11.93 19a7.17 7.17 0 0 1-6.24-3.58l1.65.27h.16a1 1 0 0 0 .16-2L3.41 13a.9.9 0 0 0-.33 0H3a1.2 1.2 0 0 0-.32.14a1 1 0 0 0-.18.18l-.09.1a1 1 0 0 0-.07.19a.4.4 0 0 0-.07.17l-.75 4a1 1 0 0 0 .8 1.22h.18a1 1 0 0 0 1-.82l.37-2a9.22 9.22 0 0 0 16.58-.83a1 1 0 0 0-.57-1.28"
            />
          </svg>
        </a>
      </nav>
    </main>
  );
};

export default Home;
