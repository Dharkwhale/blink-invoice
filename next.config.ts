import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/api/actions/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Content-Type,Authorization,Accept-Encoding,Accept,X-Accept-Action-Version,X-Accept-Blockchain-Ids",
          },
          { key: "X-Action-Version", value: "2.1.3" },
          // Solana Devnet chain ID
          { key: "X-Blockchain-Ids", value: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1" },
        ],
      },
      {
        source: "/actions.json",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
};

export default nextConfig;
