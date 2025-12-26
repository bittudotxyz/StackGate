import { useState, useEffect } from 'react'
import { UniversalConnector } from '@reown/appkit-universal-connector'
import { getUniversalConnector } from './config'

import ConnectWallet from './components/ConnectWallet'
import CheckAccess from './components/CheckAccess'
import AdminPanel from './components/AdminPanel'
import { ActionButtonList } from './components/InfoList'

import './App.css'

const ADMIN_ADDRESSES: string[] = import.meta.env.VITE_ADMIN_ADDRESSES
  ? import.meta.env.VITE_ADMIN_ADDRESSES
      .split(',')
      .map((addr: string) => addr.trim())
  : []


function checkIsAdmin(address: string): boolean {
  return ADMIN_ADDRESSES.includes(address)
}


export default function App() {
  const [universalConnector, setUniversalConnector] =
    useState<UniversalConnector | null>(null)

  const [session, setSession] = useState<any>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  // ✅ INIT APPKIT CONNECTOR ONCE
  useEffect(() => {
    getUniversalConnector().then(setUniversalConnector)
  }, [])

  // ✅ READ SESSION FROM APPKIT
  useEffect(() => {
    if (!universalConnector?.provider?.session) return

    const s = universalConnector.provider.session
    setSession(s)

    const stacksAccount =
      s?.namespaces?.stacks?.accounts?.[0]?.split(':')[2]

    if (stacksAccount) {
      setAddress(stacksAccount)
      setIsAdmin(checkIsAdmin(stacksAccount))
    }
  }, [universalConnector?.provider?.session])

  // EXTENSION CONNECT
  const onExtensionConnect = (addr: string) => {
    setAddress(addr)
    setIsAdmin(checkIsAdmin(addr))
  }

  const onDisconnect = () => {
    setSession(null)
    setAddress(null)
    setIsAdmin(false)
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>StackGate</h1>
        <p className="subtitle">
          Manage allowlist access for your Stacks contract
        </p>

        {address && (
          <p className="wallet-info">
            Connected: {address} {isAdmin && '🛡️ Admin'}
          </p>
        )}
      </header>

      <main className="app-content">
        {/* EXTENSION */}
        <section className="card">
          <h3>Connect with Browser Extension</h3>
          <ConnectWallet
            onConnect={onExtensionConnect}
            onDisconnect={onDisconnect}
          />
        </section>

        {/* QR / APPKIT */}
        <section className="card">
          <h3>Connect with Mobile Wallet (QR)</h3>

          {/* ✅ THIS NOW WORKS */}

          {universalConnector && (
            <ActionButtonList
              session={session}
              universalConnector={universalConnector}
              setSession={setSession}
            />
          )}
        </section>

        {address && (
          <section className="card">
            <CheckAccess />
          </section>
        )}

        {isAdmin && (
          <section className="card admin">
            <AdminPanel />
          </section>
        )}
      </main>
    </div>
  )
}
