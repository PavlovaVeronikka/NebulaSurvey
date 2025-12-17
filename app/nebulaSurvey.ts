// app/nebulaSurvey.ts
import React, { useMemo, useState } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { Wallet } from "@coinbase/onchainkit/wallet";
import { Connected } from "@coinbase/onchainkit/connected";
import { createPublicClient, http, formatEther, type Address } from "viem";
import { base, baseSepolia } from "viem/chains";

type NetworkKey = "base" | "baseSepolia";

const RPC = {
  base: "https://mainnet.base.org",
  baseSepolia: "https://sepolia.base.org",
};

const EXPLORER = {
  base: "https://basescan.org",
  baseSepolia: "https://sepolia.basescan.org",
};

const CHAIN_ID = {
  base: 8453,
  baseSepolia: 84532,
};

function isAddress(v: string): v is Address {
  return /^0x[a-fA-F0-9]{40}$/.test(v.trim());
}

export default function NebulaSurvey() {
  const [network, setNetwork] = useState<NetworkKey>("baseSepolia");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Idle");
  const [rpcChainId, setRpcChainId] = useState<number | null>(null);
  const [block, setBlock] = useState<bigint | null>(null);
  const [balance, setBalance] = useState<bigint | null>(null);

  const chain = network === "base" ? base : baseSepolia;

  const client = useMemo(
    () =>
      createPublicClient({
        chain,
        transport: http(RPC[network]),
      }),
    [chain, network]
  );

  async function runSurvey() {
    setStatus("Surveying Base network…");

    const [cid, bn] = await Promise.all([
      client.getChainId(),
      client.getBlockNumber(),
    ]);

    setRpcChainId(cid);
    setBlock(bn);

    if (isAddress(address)) {
      const bal = await client.getBalance({ address });
      setBalance(bal);
    } else {
      setBalance(null);
    }

    setStatus("Complete");
  }

  return (
    <OnchainKitProvider chain={chain}>
      <div style={{ maxWidth: 940, margin: "56px auto", fontFamily: "system-ui" }}>
        <h1>NebulaSurvey — Built for Base</h1>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <label>
            Network:&nbsp;
            <select value={network} onChange={(e) => setNetwork(e.target.value as NetworkKey)}>
              <option value="baseSepolia">Base Sepolia (84532)</option>
              <option value="base">Base Mainnet (8453)</option>
            </select>
          </label>

          <button onClick={runSurvey} style={{ padding: "6px 12px" }}>
            Run Survey
          </button>

          <span>
            Status:&nbsp;<strong>{status}</strong>
          </span>
        </div>

        <div style={{ marginTop: 12 }}>
          <Wallet />
          <Connected>
            <div style={{ marginTop: 10 }}>
              <div style={{ marginBottom: 6 }}>Address for balance read:</div>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x…"
                style={{ width: "100%", padding: 8 }}
              />
            </div>
          </Connected>
        </div>

        <div style={{ marginTop: 18, lineHeight: 1.7 }}>
          <div>Expected chainId: {CHAIN_ID[network]}</div>
          <div>RPC chainId: {rpcChainId ?? "—"}</div>
          <div>Latest block: {block?.toString() ?? "—"}</div>
          <div>Native balance: {balance !== null ? `${formatEther(balance)} ETH` : "—"}</div>
          <div>Explorer: {EXPLORER[network]}</div>
        </div>
      </div>
    </OnchainKitProvider>
  );
}
