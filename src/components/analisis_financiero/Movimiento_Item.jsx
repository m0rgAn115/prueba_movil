import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'; // Asegúrate de importar PropTypes
import Flecha from '../Flecha';

const Movimiento_Item = ({ tipo, titulo, subtitulo, valor, categoria, color }) => {


  console.log(valor);
  

  return (
    <div className='w-full flex flex-row transition-transform duration-300 transform hover:scale-105 hover:shadow-lg rounded-lg p-1 py-4'>
      <div className='w-16'>
      <div className='w-10 h-10 m-auto rounded-lg flex items-center justify-center' style={{ backgroundColor: color }}>
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} color="currentColor"><path d="M4.58 8.607L2 8.454C3.849 3.704 9.158 1 14.333 2.344c5.513 1.433 8.788 6.918 7.314 12.25c-1.219 4.411-5.304 7.337-9.8 7.406"></path><path d="M12 22C6.5 22 2 17 2 11m11.604-1.278c-.352-.37-1.213-1.237-2.575-.62c-1.361.615-1.577 2.596.482 2.807c.93.095 1.537-.11 2.093.47c.556.582.659 2.198-.761 2.634s-2.341-.284-2.588-.509m1.653-6.484v.79m0 6.337v.873"></path></g></svg>
      </div>

      </div>
      <div className='flex-auto'>
        <span className='flex flex-row justify-between'>
          <p className='font-bold text-slate-800'>{categoria}</p>
          <p className={`font-bold ${(valor >= 0) ? 'text-[#3629B7]' : 'text-[#E50129]'}`}>
            {valor < 0 ? `- $${Math.abs(valor)}` : `+ $${valor}`}
          </p>
        </span>
        <p className='text-slate-700 text-sm'>
          {subtitulo}
        </p>
        <div className='flex items-center justify-end text-[#0066FF] text-sm'>
        </div>
      </div>
    </div>
  )
}

Movimiento_Item.propTypes = {
  tipo: PropTypes.oneOf(["deposito", "servicios", "transferencia", "ingreso", "egreso"]).isRequired,
  titulo: PropTypes.string.isRequired,
  subtitulo: PropTypes.string,
  valor: PropTypes.number.isRequired,
  categoria: PropTypes.string
};

export default Movimiento_Item;
