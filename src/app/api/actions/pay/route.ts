import { NextRequest, NextResponse } from "next/server";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type,Authorization,Accept-Encoding,Accept,X-Accept-Action-Version,X-Accept-Blockchain-Ids",
  "X-Action-Version": "2.1.3",
  "X-Blockchain-Ids": "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

// GET — returns the Blink metadata card shown on X / dial.to
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // 1. Force the use of your Netlify URL to avoid Vercel ghosting
  // Ensure this matches your Netlify Site Settings exactly!
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://blinkinv.netlify.app";

  const name = searchParams.get("name") || "Payment";
  const sol = searchParams.get("sol") || "0";
  const desc = searchParams.get("desc") || "Payment via BlinkInvoice";

  const payload = {
    // 2. Use appUrl for the icon to ensure the image is fetched from Netlify
    icon: `${appUrl}/blink-icon.svg`, 
    title: name,
    description: desc,
    label: `Pay ${sol} SOL`,
    links: {
      actions: [
        {
          label: `Pay ${sol} SOL`,
          // 3. Keep req.url here as it contains the specific query params for the transaction
          href: req.url,
        },
      ],
    },
  };

  return NextResponse.json(payload, { headers: CORS });
}

// POST — remains the same as your current logic
export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sol = searchParams.get("sol");
    const to = searchParams.get("to");

    if (!sol || !to) {
      return NextResponse.json(
        { message: "Missing required params: sol and to" },
        { status: 400, headers: CORS }
      );
    }

    const body = await req.json();
    const account: string | undefined = body?.account;

    if (!account) {
      return NextResponse.json(
        { message: "Missing payer account in request body" },
        { status: 400, headers: CORS }
      );
    }

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const payer = new PublicKey(account);
    const merchant = new PublicKey(to);
    const lamports = Math.round(parseFloat(sol) * LAMPORTS_PER_SOL);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: payer,
        toPubkey: merchant,
        lamports,
      })
    );

    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.lastValidBlockHeight = lastValidBlockHeight;
    transaction.feePayer = payer;

    const serialized = transaction.serialize({ requireAllSignatures: false });
    const base64Tx = Buffer.from(serialized).toString("base64");

    return NextResponse.json(
      { transaction: base64Tx, message: `Pay ${sol} SOL — powered by BlinkInvoice` },
      { headers: CORS }
    );
  } catch (err) {
    console.error("[actions/pay] POST error:", err);
    return NextResponse.json(
      { message: "Failed to build transaction" },
      { status: 500, headers: CORS }
    );
  }
}