import React, { useCallback, useContext, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const PlaidLinkComponent = () => {
  const [linkToken, setLinkToken] = useState(null); // Almacena el token
  const [accessToken, setAccessToken] = useState(null); // Almacena el access token una vez que se obtiene
  // Crear el link token al montar el componente
  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const response = await fetch('https://mayiaflask.azurewebsites.net/api/create_link_token', {
          method: 'POST',
        });
        const data = await response.json();

        // Asegúrate de obtener solo el link token y no el objeto completo
        setLinkToken(data.link_token);
        console.log('Link token creado:', data.link_token);
      } catch (error) {
        console.error('Error al crear el link token:', error);
      }
    };

    createLinkToken();
  }, []);


  // const onSuccess = React.useCallback(
  //   (public_token) => {
  //     // If the access_token is needed, send public_token to server
  //     const exchangePublicTokenForAccessToken = async () => {
  //       const response = await fetch("http://127.0.0.1:8000/api/set_access_token", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  //         },
  //         body: `public_token=${public_token}`,
  //       });
  //       if (!response.ok) {
          
  //       }
  //       const data = await response.json();
  //       console.log(data);
        
  //     };

  //     // 'payment_initiation' products do not require the public_token to be exchanged for an access_token.
  //     // if (isPaymentInitiation) {
  //     //   dispatch({ type: "SET_STATE", state: { isItemAccess: false } });
  //     // } else if (isCraProductsExclusively) {
  //     //   // When only CRA products are enabled, only user_token is needed. access_token/public_token exchange is not needed.
  //     //   dispatch({ type: "SET_STATE", state: { isItemAccess: false } });
  //     // } else {
  //     //   exchangePublicTokenForAccessToken();
  //     // }

  //     // dispatch({ type: "SET_STATE", state: { linkSuccess: true } });
  //     window.history.pushState("", "", "/");
  //   },
  //   []
  // );

  

  // Función que se llama cuando se obtiene el public token
  const onSuccess = useCallback(async (public_token) => {
    try {
      const response = await fetch('https://mayiaflask.azurewebsites.net/api/set_access_token', {
        method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: `public_token=${public_token}`,
      });
  
      const data = await response.json(); // Expecting JSON response
      console.log('Respuesta al intercambiar el public token:', data);
  
      if (data.success) {
        setAccessToken('Access token recibido'); 
        console.log('Access token intercambiado con éxito');
      }
    } catch (error) {
      console.error('Error al intercambiar el public token:', error);
    }
  }, []);
  

  const config = {
    token: linkToken, // Asigna el token al config
    onSuccess, // Maneja el success
  };

  // Obtiene las funciones de `usePlaidLink`
  const { open, ready } = usePlaidLink(config);

  return (
    <div>
      <button onClick={open} disabled={!ready || !linkToken}>
        Conectar cuenta bancaria
      </button>
      {accessToken && <p>¡Cuenta conectada exitosamente!</p>}
    </div>
  );
};

export default PlaidLinkComponent;
