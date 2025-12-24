import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { STACKS_TESTNET } from "@stacks/network";
import { principalCV } from "@stacks/transactions";

const network = STACKS_TESTNET;

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as string;
const CONTRACT_NAME = import.meta.env.VITE_CONTRACT_NAME as string;

const AdminPanel = () => {
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const addWallet = async () => {
    if (!wallet) return setMessage({ type: 'error', text: 'Enter a wallet address' });

    setLoading(true);
    setMessage(null);
    await openContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "add-wallet",
functionArgs: [
  principalCV(wallet),
],

      network,
      onFinish: () => {
        setMessage({ type: 'success', text: 'Wallet added to allowlist' });
        setLoading(false);
      },
      onCancel: () => setLoading(false),
    });
  };

  const removeWallet = async () => {
    if (!wallet) return setMessage({ type: 'error', text: 'Enter a wallet address' });

    setLoading(true);
    setMessage(null);
    await openContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "remove-wallet",
functionArgs: [
  principalCV(wallet),
],

      network,
      onFinish: () => {
        setMessage({ type: 'success', text: 'Wallet removed from allowlist' });
        setLoading(false);
      },
      onCancel: () => setLoading(false),
    });
  };

  return (
    <div
      style={{
        marginTop: 20,
        padding: 16,
        borderRadius: 12,
        background: "#0b1220",
        color: "#e5e7eb",
      }}
    >
      <h3 style={{ marginBottom: 10 }}>🔐 Admin Panel</h3>

      <input
        placeholder="STX wallet address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 8,
          marginBottom: 12,
          border: "1px solid #1f2937",
          background: "#020617",
          color: "#fff",
        }}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <button
          className="btn primary"
          onClick={addWallet}
          disabled={loading}
        >
          {loading ? <span className="spinner" /> : '➕ Add Wallet'}
        </button>

        <button
          className="btn ghost"
          onClick={removeWallet}
          disabled={loading}
        >
          {loading ? '...' : '➖ Remove Wallet'}
        </button>
      </div>

      {message && (
        <div className={`message ${message.type === 'success' ? 'success' : 'error'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
