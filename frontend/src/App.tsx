import ConnectWallet from './components/ConnectWallet';
import CheckAccess from './components/CheckAccess';
import AdminPanel from './components/AdminPanel';
import './App.css';
import AppKitBadge from './components/AppKitBadge'

const App = () => {
  return (
    <div className="app-root">
      <header className="app-header">
        <div>
          <h1>StackGate</h1>
          <p className="subtitle">Manage allowlist access for your Stacks contract</p>
        </div>
      </header>

      <main className="app-content">
        <section className="card">
          <ConnectWallet />
        </section>

        <section className="card">
          <CheckAccess />
        </section>

        <section className="card">
          <AdminPanel />
        </section>
              <AppKitBadge />

      </main>
    </div>
  );
};

export default App;
