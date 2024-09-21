import React, { useState, useEffect } from 'react';
import PlaidLinkButton from './PlaidLinkButton';import { usePlaidLink } from 'react-plaid-link';

export const Main_Plaid = () => {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    // Obtener el link_token del backend
    fetch('/api/create_link_token', { method: 'POST' })
      .then(response => response.json())
      .then(data => setLinkToken(data));
  }, []);

  const handlePlaidSuccess = (public_token, metadata) => {
    // Enviar el public_token al backend para intercambio
    fetch('/api/exchange_public_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_token })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Conexión exitosa con Plaid');
      }
    });
  };

  return (
    <div>
      {linkToken && (
        <PlaidLinkButton
          linkToken={linkToken}
          onSuccess={handlePlaidSuccess}
        />
      )}
    </div>
  );
}
