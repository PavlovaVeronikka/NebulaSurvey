# NebulaSurvey

Built for Base

NebulaSurvey is a Base-first repository that combines OnchainKit wallet UX with Viem-based JSON-RPC reads to quickly validate Base connectivity and basic account state.

The goal is to keep the workflow simple: select a Base network, connect a wallet, run reads, and cross-check results with Basescan.

## Supported Networks

Base Mainnet  
chainId (decimal): 8453  
Explorer: https://basescan.org  
RPC: https://mainnet.base.org  

Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  
RPC: https://sepolia.base.org  

## App Behavior

Primary file: app/nebulaSurvey.ts

The application:
- Initializes OnchainKitProvider for the selected Base chain
- Renders wallet connection UI via OnchainKit Wallet
- Uses Viem to query Base RPC endpoints for:
  - chainId
  - latest block number
  - native ETH balance for a supplied address
- Keeps Basescan explorer references visible for verification

## Repository Structure

app/  
- nebulaSurvey.ts  
  React entry component wiring wallet UX + Base reads.

Common supporting files:
- package.json
- tsconfig.json
- index.html / main.tsx
- .env (optional)

## Libraries

OnchainKit  
https://github.com/coinbase/onchainkit  

Viem  
EVM client for Base JSON-RPC reads

## Installation and Running

Requirements:
- Node.js 18+
- Browser environment with wallet support

Install dependencies and run using a standard React/Vite or Next.js dev server.

Optional environment variables:
- VITE_BASE_RPC_URL
- VITE_BASE_SEPOLIA_RPC_URL

## License

MIT License

## Author

GitHub: https://github.com/PavlovaVeronikka
Public contact (email): toss.chubs.08@icloud.com
X: https://x.com/@sayelazizul

## Testnet Deployment (Base Sepolia)

As part of pre-production validation, one or more contracts may be deployed to the Base Sepolia test network to confirm correct behavior and tooling compatibility.

Network: Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

Contract #1 address:  
0xfd8f1304a05e4d8f4735ddfb9df73f3125866cc1  

Deployment and verification:
- https://sepolia.basescan.org/address/0xfd8f1304a05e4d8f4735ddfb9df73f3125866cc1  
- https://sepolia.basescan.org/0xfd8f1304a05e4d8f4735ddfb9df73f3125866cc1 /0#code  

Contract #2 address:  
0x3ef3da0f36a406b4e8a58ad17e1372f9775d381b

Deployment and verification:
- https://sepolia.basescan.org/address/0x3ef3da0f36a406b4e8a58ad17e1372f9775d381b
- https://sepolia.basescan.org/0x3ef3da0f36a406b4e8a58ad17e1372f9775d381b/0#code  
