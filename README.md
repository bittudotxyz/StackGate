# StackGate

**StackGate** is a simple, production ready on chain access control system built on the **Stacks blockchain**.  
It enables developers, DAOs, and product teams to gate access to features, content, or applications using a **wallet-based allowlist** — fully enforced on-chain.

StackGate demonstrates how real-world Web3 access control can be implemented with minimal smart contract logic and a clean frontend, while keeping all critical permissions verifiable on the blockchain.

---

## Why StackGate?

Many Web3 products need:

- Early access for selected users  
- Private beta gating  
- Token launch allowlists  
- Admin-controlled feature access  

**StackGate solves this by:**

- Storing access permissions **on-chain**  
- Allowing **transparent verification** of access  
- Enabling **real transactions** for granting/revoking access  
- Keeping the contract **simple, auditable, and secure**

---

## Core Concept

At its core, StackGate uses:

- A single **on-chain allowlist map**
- An **admin-controlled permission model**
- **Read-only** access checks for anyone
- On-chain transactions for **access changes**

No complex roles.  
No unnecessary logic.  
Just clear, verifiable access control.

---

## Architecture Overview

### Smart Contract (Clarity)

The allowlist smart contract:

- Stores a mapping of `wallet → allowed`
- Allows the **admin** to:
  - Add a wallet  
  - Remove a wallet  
- Allows **anyone** to:
  - Check if a wallet is allowed  

**Key design decisions:**

- Minimal surface area  
- No timestamps or loops  
- Admin set once  
- Easy to audit and extend  

### Frontend (React + TypeScript)

The frontend provides:

- Wallet connection  
- Read-only access checks  
- Admin-only control panel  
- Real on-chain transactions for state changes  

The UI acts as the **control layer**, while the contract remains the **source of truth**.

---

## Access Flow

### User
1. Connects wallet  
2. Checks access using on-chain **read-only call**  
3. Gains or loses access based on allowlist state  

### 🛠 Admin  
1. Connects wallet  
2. Adds or removes wallets via **on-chain transactions**  
3. Changes are immediately reflected on-chain  

---

## On Chain Interactions

StackGate performs **real blockchain transactions**, including:

- Admin granting access  
- Admin revoking access  
- Public read-only access checks  

All permission changes are:

- Signed by wallets  
- Recorded on-chain  
- Verifiable by anyone  

---

## 🧪 Local Development

### Prerequisites
- Node.js  
- npm  
- Clarinet  
- A Stacks wallet (Hiro / Xverse)

### Set up Frontend

cd frontend
npm install
npm run dev

### Run Smart Contract Checks

clarinet check

---

## Deployment

The smart contract is deployed using **Clarinet deployment plans**.  
Frontend configuration points to:

- Contract address  
- Contract name  
- Target network (Testnet / Mainnet)

---

## Use Cases

StackGate can be used for:

- Token launch allowlists  
- DAO membership gating  
- Early-access product releases  
- Private dashboards  
- Feature flags in Web3 apps  

---

## Future Enhancements

Without modifying the core contract, StackGate can evolve into:

- Access request flows  
- Subscription-based access  
- NFT-gated access  
- Multi-admin governance  
- Activity dashboards  

---

## Builder Challenge Context

StackGate was built as part of the **Stacks Builder Challenge**, demonstrating:

- Real smart contract deployment  
- On-chain state changes  
- Frontend integration  
- Production-grade access control patterns  

---

## License

**MIT License**

---

## Final Notes

StackGate focuses on **clarity over complexity**.  
Every interaction is intentional.  
Every permission is **on-chain**.  

This project reflects how **small, well-designed contracts** can power real Web3 products.
