import React from 'react'
import Flecha from '../Flecha'

export const Alerta_cuidado = () => {
  return (
    <div className='w-full p-1 flex flex-row  transition-transform duration-300 transform hover:scale-105 hover:shadow-lg rounded-md' >
      <div className='w-32 ' >
        <div className='bg-black w-10 h-10 m-auto mt-2 rounded-lg ' >
        
        </div>
      </div>
      <div className='flex-auto ' >
        <span className='flex flex-row justify-between ' >
          <p className='font-medium  ' >Starbucks</p>
          <p className='text-red-600 font-bold ' >{'- $752'}</p>
        </span>
        <p className='text-slate-700 text-sm' > 
          Has gastado $752.0 en Starbucks el  ultimo mes, con un promedio de $153 por transacción. 
        </p>
        <div className=' flex items-center justify-end text-[#0066FF] text-sm '  >
          <button className='flex flex-row items-center ' >
            <p  >Conocer más</p>
              <Flecha width={"0.8em"} height={"1em"} invertirFlecha={true} />
          </button>
        </div>
      </div>


    </div>
  )
}
