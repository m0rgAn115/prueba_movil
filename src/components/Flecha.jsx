import React from "react";

const Flecha = ({ invertirFlecha, width, height }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ? width : "1.2em"}
    height={height ? height : "1.2em"}
    viewBox="0 0 12 24"
    style={{ transform: invertirFlecha ? "" : "scaleX(-1)" }}
  >
    <path
      stroke="currentColor" // Usamos 'stroke' en lugar de 'fill'
      fill="currentColor"
      strokeWidth="1" // Ajustamos el grosor del trazo, puedes aumentar este valor para hacer la flecha más gruesa
      fillRule="evenodd"
      d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"
    />
  </svg>
);

export default Flecha;
