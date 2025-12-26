import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { STACKS_MAINNET } from "@stacks/network";
import { principalCV } from "@stacks/transactions";

const network = STACKS_MAINNET;

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
    <div>
      <p className="small" style={{ marginBottom: 16 }}>
        As an admin, you can add or remove wallets from the allowlist.
      </p>

      <input
        placeholder="Enter STX wallet address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <div style={{ display: "flex", gap: 12 }}>
        <button
          className="btn primary"
          onClick={addWallet}
          disabled={loading || !wallet}
          style={{ flex: 1 }}
        >
          {loading ? <span className="spinner" /> : '➕ Add Wallet'}
        </button>

        <button
          className="btn ghost"
          onClick={removeWallet}
          disabled={loading || !wallet}
          style={{ flex: 1 }}
        >
          {loading ? <span className="spinner" /> : '➖ Remove Wallet'}
        </button>
      </div>

      {message && (
        <div className={`message ${message.type === 'success' ? 'success' : 'error'}`} style={{ marginTop: 16 }}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
