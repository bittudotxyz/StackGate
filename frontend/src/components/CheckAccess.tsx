// src/components/CheckAccess.tsx
import React, { useState } from 'react';
import {
  fetchCallReadOnlyFunction,
  cvToValue,
  standardPrincipalCV,
} from '@stacks/transactions';
import { STACKS_MAINNET } from '@stacks/network';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS as string;          // your contract address
const contractName = import.meta.env.VITE_CONTRACT_NAME as string;
const functionName = 'is-allowed';       // your read-only function
export const network = STACKS_MAINNET;

const CheckAccess: React.FC = () => {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!address) {
      setError('Enter an STX address first');
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const response = await fetchCallReadOnlyFunction({
        contractAddress,
        contractName,
        functionName,
        functionArgs: [standardPrincipalCV(address)], // adjust to your param types
        senderAddress: address,
        network,
      });

      const value = cvToValue(response);
      console.log('read-only result:', value);
      setResult(value);
    } catch (e) {
      console.error('checkAccess error', e);
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="small" style={{ marginBottom: 16 }}>
        Enter a Stacks address to check if it's on the allowlist.
      </p>
      <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
        <input
          placeholder="Enter STX address (e.g., SP123...)"
          value={address}
          onChange={e => setAddress(e.target.value)}
          style={{ flex: 1 }}
        />
        <button className="btn primary" onClick={handleCheck} disabled={loading || !address}>
          {loading ? <span className="spinner" /> : 'Check Access'}
        </button>
      </div>

      {error && <div className="message error">Error: {error}</div>}

      {result !== null && (
        <div className="message" style={{ marginTop: 16, textAlign: 'center' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>
            Access Status: <span className={String(result) === 'true' ? 'result-true' : 'result-false'}>
              {String(result) === 'true' ? 'Allowed' : 'Not Allowed'}
            </span>
          </div>
          <div className="small">
            This address {String(result) === 'true' ? 'is' : 'is not'} on the allowlist.
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckAccess;
