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
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          placeholder="Enter STX address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <button className="btn primary" onClick={handleCheck} disabled={loading || !address}>
          {loading ? <span className="spinner" /> : 'Check Access'}
        </button>
      </div>

      {error && <div className="message error">Error: {error}</div>}

      {result !== null && (
        <div style={{ marginTop: 10 }}>
          <span className={String(result) === 'true' ? 'result-true' : 'result-false'}>
            {String(result)}
          </span>
          <div className="small" style={{ marginTop: 6 }}>Read-only call returned the boolean allowlist result.</div>
        </div>
      )}
    </div>
  );
};

export default CheckAccess;
