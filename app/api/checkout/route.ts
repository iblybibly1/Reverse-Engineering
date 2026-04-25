import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

interface CartEntry {
  participantName: string;
  horseName: string;
  horseAge: string;
  phone: string;
  address: string;
}

interface CartItem {
  cartId: string;
  competitionId: string;
  competitionName: string;
  classId: string;
  className: string;
  priceEur: number;
  entry: CartEntry;
}

export async function POST(req: Request) {
  try {
    const { items } = await req.json() as { items: CartItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No entries in cart" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      currency: "eur",
      line_items: items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: `${item.competitionName} — ${item.className}`,
            description: `${item.entry.participantName} / ${item.entry.horseName}`,
          },
          unit_amount: Math.round(item.priceEur * 100),
        },
        quantity: 1,
      })),
      metadata: {
        entries: JSON.stringify(
          items.map((item) => ({
            competition: item.competitionName,
            class: item.className,
            rider: item.entry.participantName,
            horse: item.entry.horseName,
            age: item.entry.horseAge,
            phone: item.entry.phone,
            address: item.entry.address,
          }))
        ),
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
