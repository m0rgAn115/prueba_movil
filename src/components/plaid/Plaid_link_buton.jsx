import React from 'react';
import { usePlaidLink } from 'react-plaid-link';

function PlaidLinkButton({ linkToken, onSuccess }) {
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      onSuccess(public_token, metadata);
    },
  });

  return (
    <button onClick={() => open()} disabled={!ready}>
      Conectar cuenta bancaria
    </button>
  );
}

export default PlaidLinkButton;