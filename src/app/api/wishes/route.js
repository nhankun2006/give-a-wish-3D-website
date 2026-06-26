import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// ─── Supabase admin client (uses service role key — server-side only) ──────────
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ─── Mistral AI contextual check (smart, catches subtle toxicity) ─────────────
async function mistralModerationCheck(text) {
  const apiKey = process.env.MISTRAL_API_KEY;

  // If API key not yet added, skip AI check and approve by default
  if (!apiKey || apiKey === 'your_mistral_api_key_here') {
    console.warn('[Moderation] MISTRAL_API_KEY not set — skipping AI check, auto-approving.');
    return true;
  }

  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'open-mixtral-8x7b',
        messages: [
          {
            role: 'system',
            content:
              'You are a content moderation assistant for a birthday fan website. ' +
              'Evaluate whether the following message is an appropriate, friendly, or neutral birthday wish. ' +
              'It may be written in English or Vietnamese. ' +
              'If the message contains hate speech, extreme toxicity, insults, threats, spam, advertisements, ' +
              'phone numbers, emails, URLs, or sexual content — reply with exactly: BLOCKED. ' +
              'Otherwise reply with exactly: APPROVED. Output ONLY one word.',
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0,
        max_tokens: 5,
      }),
    });

    if (!response.ok) {
      console.error('[Moderation] Mistral API returned status:', response.status);
      return false; // Fail safe — keep as unapproved if AI is unreachable
    }

    const data = await response.json();
    const verdict = data.choices?.[0]?.message?.content?.trim().toUpperCase();
    console.log(`[Moderation] Mistral verdict: "${verdict}" for message: "${text}"`);
    return verdict === 'APPROVED';
  } catch (error) {
    console.error('[Moderation] Mistral API error:', error.message);
    return false; // Fail safe
  }
}

// ─── Main POST Handler ─────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const { name, message } = await request.json();

    // 1. Basic server-side validation (redundant with client but necessary for security)
    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }
    if (message.length > 250) {
      return NextResponse.json({ error: 'Message cannot exceed 250 characters.' }, { status: 400 });
    }
    const longWord = message.split(/\s+/).find((word) => word.length > 16);
    if (longWord) {
      return NextResponse.json(
        { error: `Word too long: "${longWord.slice(0, 16)}..." — max 16 characters per word.` },
        { status: 400 }
      );
    }

    // 2. Moderation via Mistral AI
    console.log(`[Moderation] Sending to Mistral AI: "${message}"`);
    const isApproved = await mistralModerationCheck(message);
    console.log(`[Moderation] Mistral result — isApproved: ${isApproved}`);

    if (!isApproved) {
      return NextResponse.json(
        { error: 'Your wish contains inappropriate or toxic content and cannot be submitted.' },
        { status: 400 }
      );
    }

    // 3. Insert into Supabase using admin client (bypasses RLS safely)
    const { data, error } = await supabaseAdmin
      .from('wishes')
      .insert([
        {
          name: (name || '').trim() || 'Fan ẩn danh',
          message: message.trim(),
          is_approved: true, // Now always true since it passed the check
          image_url: null,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('[API /wishes] Unexpected error:', err.message);
    return NextResponse.json({ error: 'Failed to submit wish. Please try again.' }, { status: 500 });
  }
}
