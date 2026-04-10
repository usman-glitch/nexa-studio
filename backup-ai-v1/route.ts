// app/api/chat/route.ts - FINAL CORRECT VERSION
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    console.log('NEXA API called');
    
    const { messages } = await req.json();

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: `You are the NEXA Studio Digital Assistant. 
      Your tone is professional, technical, and forward-thinking. 
      You help clients understand NEXA's services: Branding, Web Dev (Next.js, React), and Digital Strategy.
      If asked about pricing, direct them to use the WhatsApp CTA for a custom quote.`,
      messages,
    });

    // ✅ CORRECT: Use toTextStreamResponse()
    return result.toTextStreamResponse();
    
  } catch (error: any) {
    console.error("NEXA API Error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Connection Failed", 
        details: error.message 
      }),
      { status: 500 }
    );
  }
}