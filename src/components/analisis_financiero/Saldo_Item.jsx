import React, { useEffect, useState } from 'react';

export const Saldo_Item = () => {
  const [saldo, setSaldo] = useState(0);

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

    fetchSaldo();
  }, []);

  return (
    <span>${saldo}</span>
  );
};
