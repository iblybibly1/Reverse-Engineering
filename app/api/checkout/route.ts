import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { classes, competitionId, competitionName } = await req.json() as {
      classes: { id: string; name: string }[];
      competitionId: string;
      competitionName: string;
    };

    if (!classes || classes.length === 0) {
      return NextResponse.json({ error: "No classes selected" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      currency: "eur",
      line_items: classes.map((cls) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: `${competitionName} — ${cls.name}`,
            description: "Kilpailumaksu / Entry fee",
          },
          unit_amount: 500, // €5.00 in cents
        },
        quantity: 1,
      })),
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/competitions/${competitionId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
