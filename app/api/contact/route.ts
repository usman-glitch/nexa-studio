import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("CRITICAL: RESEND_API_KEY is missing from environment variables.");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const { name, email, message } = await request.json();

    const data = await resend.emails.send({
      // Use the verified "official" domain
      from: 'Nexa Studio <contact@nexastudioofficial.com>', 
      
      // Sends the notification to your Namecheap workspace
      to: ['contact@nexastudioofficial.com'], 
      
      // Fixed: TypeScript/Resend uses camelCase 'replyTo' instead of 'reply_to'
      replyTo: email, 
      
      subject: `New Nexa Inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #000;">New Website Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}