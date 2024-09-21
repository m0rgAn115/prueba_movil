import React, { useEffect, useState, useRef } from 'react';

const PulseAnimation = () => {
  const [pulses, setPulses] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const createPulse = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const newPulse = {
          id: Date.now(),
          x: Math.random() * (width - 16),
          y: Math.random() * (height - 16),
          opacity: 0.0, // Reducimos la opacidad inicial
        };
        setPulses(prevPulses => [...prevPulses, newPulse]);

        // Iniciar la desaparición gradual después de 2 segundos
        setTimeout(() => {
          const fadeInterval = setInterval(() => {
            setPulses(prevPulses =>
              prevPulses.map(pulse =>
                pulse.id === newPulse.id
                  ? { ...pulse, opacity: Math.max(0, pulse.opacity - 0.03) } // Reducimos la velocidad de desaparición
                  : pulse
              )
            );
          }, 100);

          // Eliminar el pulso después de 3 segundos adicionales
          setTimeout(() => {
            clearInterval(fadeInterval);
            setPulses(prevPulses => prevPulses.filter(pulse => pulse.id !== newPulse.id));
          }, 4000);
        }, 4000);
      }
    };

    const interval = setInterval(createPulse, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {pulses.map(pulse => (
        <div
          key={pulse.id}
          className="absolute w-96 h-96 bg-white rounded-full animate-pulse"
          style={{
            left: `${pulse.x}px`,
            top: `${pulse.y}px`,
            opacity: pulse.opacity,
            transition: 'opacity 0.1s ease-out',
          }}
        />
      ))}
    </div>
  );
};

export default PulseAnimation;