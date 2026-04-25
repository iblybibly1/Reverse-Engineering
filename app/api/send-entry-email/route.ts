import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EntryRow {
  competition: string;
  class: string;
  rider: string;
  horse: string;
  age: string;
  phone: string;
  address: string;
}

export async function POST(req: Request) {
  try {
    const { entries, totalEur, sessionId } = await req.json() as {
      entries: EntryRow[];
      totalEur: number;
      sessionId: string;
    };

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      return NextResponse.json({ error: "ADMIN_EMAIL not configured" }, { status: 500 });
    }

    const rows = entries
      .map(
        (e, i) => `
        <tr style="border-bottom:1px solid #e2e8f0;">
          <td style="padding:10px 12px;font-weight:600;">${i + 1}</td>
          <td style="padding:10px 12px;">${e.competition}</td>
          <td style="padding:10px 12px;">${e.class}</td>
          <td style="padding:10px 12px;">${e.rider}</td>
          <td style="padding:10px 12px;">${e.horse} (${e.age} yrs)</td>
          <td style="padding:10px 12px;">${e.phone}</td>
          <td style="padding:10px 12px;">${e.address}</td>
        </tr>`
      )
      .join("");

    await resend.emails.send({
      from: "Nättely Suomi <noreply@nattelysuomi.fi>",
      to: adminEmail,
      subject: `New entries — €${totalEur.toFixed(2)} — ${entries.length} class${entries.length !== 1 ? "es" : ""}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:800px;margin:0 auto;padding:32px 24px;color:#0f172a;">
          <h1 style="font-size:24px;margin-bottom:8px;">New entries received 🐴</h1>
          <p style="color:#64748b;margin-bottom:24px;">
            Stripe session: <code>${sessionId}</code> &nbsp;·&nbsp; Total: <strong>€${totalEur.toFixed(2)}</strong>
          </p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
            <thead>
              <tr style="background:#f8fafc;">
                <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;">#</th>
                <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;">Show</th>
                <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;">Class</th>
                <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;">Rider</th>
                <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;">Horse</th>
                <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;">Phone</th>
                <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;">Address</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <p style="margin-top:24px;font-size:12px;color:#94a3b8;">Sent automatically by Nättely Suomi</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
