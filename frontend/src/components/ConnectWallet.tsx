import { useState } from "react";
import { connect, disconnect } from "@stacks/connect";
import type { GetAddressesResult } from "@stacks/connect/dist/types/methods";

/* ✅ ADD PROPS (needed by App.tsx) */
interface ConnectWalletProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

const WalletConnect = ({ onConnect, onDisconnect }: ConnectWalletProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>("");
  const [bns, setBns] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      setLoading(true);

      const res: GetAddressesResult = await connect();
      const stxAddress =
        res.addresses.find((a) => a.symbol === "STX")?.address || "";

      if (!stxAddress) return;

      setAddress(stxAddress);
      setIsConnected(true);

      // 🔔 notify App.tsx
      onConnect?.(stxAddress);

      try {
        const bnsName = await getBnsName(stxAddress);
        setBns(bnsName);
      } catch {
        setBns("");
      }
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    disconnect();
    setIsConnected(false);
    setAddress("");
    setBns("");

    // 🔔 notify App.tsx
    onDisconnect?.();
  };

  const copyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
    } catch {}
  };

  const getBnsName = async (stxAddress: string) => {
    const res = await fetch(
      `https://api.bnsv2.com/testnet/names/address/${stxAddress}/valid`
    );
    const data = await res.json();
    return data?.names?.[0]?.full_name ?? "";
  };

  return (
    <div>
      <p className="small" style={{ marginBottom: 16 }}>
        Connect using a Stacks browser extension like Leather or Xverse.
      </p>
      <div className="row" style={{ justifyContent: "space-between", flexWrap: 'wrap' }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: 'wrap' }}>
          {!isConnected ? (
            <button
              className="btn primary"
              onClick={connectWallet}
              disabled={loading}
            >
              {loading ? <span className="spinner" /> : "Connect Extension"}
            </button>
          ) : (
            <>
              <div className="status-badge status-connected small">
                {bns || shortenAddress(address)}
              </div>
              <button
                className="copy-btn"
                onClick={copyAddress}
                title="Copy address"
              >
                📋 Copy
              </button>
              <button className="btn ghost" onClick={disconnectWallet}>
                Disconnect
              </button>
            </>
          )}
        </div>

        <div className="small">
          Status: {isConnected ? "Connected" : "Not connected"}
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;

/* ---------- Helper ---------- */
function shortenAddress(addr: string) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}
