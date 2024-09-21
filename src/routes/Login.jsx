import { usePlaidLink } from 'react-plaid-link';
import PlaidLinkButton from '../components/plaid/Plaid_link_buton';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PulseAnimation from '../components/Pulse_Animation';

export default function Login() {
  const [linkToken, setLinkToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const response = await fetch('https://mayiaflask.azurewebsites.net/api/create_link_token', {
          method: 'POST',
        });
        const data = await response.json();
        setLinkToken(data.link_token);
        console.log('Link token creado:', data.link_token);
      } catch (error) {
        console.error('Error al crear el link token:', error);
      }
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback(async (public_token) => {
    try {
      const response = await fetch('https://mayiaflask.azurewebsites.net/api/set_access_token', {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: `public_token=${public_token}`,
      });
      const data = await response.json();
      console.log('Respuesta al intercambiar el public token:', data);
      navigate("/");
      if (data.success) {
        setAccessToken('Access token recibido'); 
        console.log('Access token intercambiado con éxito');
      }
    } catch (error) {
      console.error('Error al intercambiar el public token:', error);
    }
  }, [navigate]);

  const config = {
    token: linkToken,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <div className="overflow-hidden relative h-screen">
      <div className="w-full bg-gradient-to-r from-[#EB0029] to-[#B2001F] h-full p-8 relative z-10 flex flex-col justify-center items-center">
        <h1 className="text-7xl font-bold text-white transition-transform duration-1000 hover:scale-125 relative z-20">
          <span className="animate-colorShadow">May</span>
          <span className="animate-glow">ia</span>
        </h1>
        <h3 className='text-white mt-2 italic animate-glow' >Tu asistente financiero</h3>
        <button
          onClick={open}
          disabled={!ready || !linkToken}
          className="animate-glow border-2 rounded-lg py-2 px-5 transition-transform duration-200 hover:scale-110 absolute bottom-8 z-20"
        >
          <h3 className="text-3xl font-bold text-white">Conectar cuenta bancaria</h3>
        </button>
      </div>
    </div>
  );
}