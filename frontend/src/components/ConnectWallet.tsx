import { useState } from "react";
import { connect, disconnect } from "@stacks/connect";
import type { GetAddressesResult } from "@stacks/connect/dist/types/methods";

const WalletConnect = () => {
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

      setAddress(stxAddress);
      setIsConnected(true);

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
    <div className="row" style={{ justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {!isConnected ? (
          <button className="btn primary" onClick={connectWallet} disabled={loading}>
            {loading ? <span className="spinner" /> : 'Connect Wallet'}
          </button>
        ) : (
          <>
            <div className="status-badge status-connected small">{bns || shortenAddress(address)}</div>
            <button className="copy-btn small" onClick={copyAddress} title="Copy address">Copy</button>
            <button className="btn ghost" onClick={disconnectWallet}>Disconnect</button>
          </>
        )}
      </div>

      <div className="small">{isConnected ? <span className="small">Connected</span> : <span className="small">Not connected</span>}</div>
    </div>
  );
};

export default WalletConnect;

// Helper
function shortenAddress(addr: string) {
  if (!addr) return '';
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}
