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

  if (!apiKey || apiKey === 'your_mistral_api_key_here') {
    console.warn('[Moderation] MISTRAL_API_KEY not set — skipping AI check, auto-approving.');
    return true;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          {
            role: 'system',
            content:
              `You are a Vietnamese and English birthday wish moderator.
              APPROVE messages that are:
              - Birthday wishes, congratulations, blessings
              - Kind, friendly, supportive words
              - Simple positive words like "Đẹp", "Xinh", "Chúc mừng", "Hạnh phúc", "Tuyệt vời"
              - Any short positive Vietnamese or English phrase

              BLOCK messages that contain:
              - Obvious insults or profanity
              - Sexual content
              - Spam or advertisements with URLs/phone numbers
              - Threats or harassment
              - Neutral, random, or non-sense words that have no meaning (e.g. keyboard mashing)
              - Messages without any clear positive or birthday-related context

              Reply with exactly one word — APPROVED or BLOCKED`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0,
        max_tokens: 5,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      console.error('[Moderation] Mistral API returned status:', response.status);
      return false; 
    }

    const data = await response.json();
    const verdict = data.choices?.[0]?.message?.content?.trim().toUpperCase();
    console.log(`[Moderation] Mistral verdict: "${verdict}" for message: "${text}"`);
    return verdict === 'APPROVED';
  } catch (error) {
    console.error('[Moderation] Mistral API error:', error.message);
    return true; 
  }
}

// ─── Main POST Handler ─────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const { name, message } = await request.json();

    // 1. Basic server-side validation
    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: 'Úi, bọt biển không thấy chữ nào cả! Bạn viết gì đó vào thư nha ' }, { status: 400 });
    }
    const wordCount = message.trim() === '' ? 0 : message.trim().split(/\s+/).length;
    if (wordCount > 1000) {
      return NextResponse.json({ error: 'Đại dương bao la nhưng chai thủy tinh chỉ chứa được 1000 từ thôi nè, bạn tóm tắt lại chút xíu nha ' }, { status: 400 });
    }
    const longWord = message.split(/\s+/).find((word) => word.length > 16);
    if (longWord) {
      return NextResponse.json(
        { error: 'Ây da, có từ dài hơn cả bé cá voi kìa (tối đa 16 ký tự). Bạn thêm khoảng trắng vào nha ' },
        { status: 400 }
      );
    }

    // 2. Moderation via Mistral AI
    console.log(`[Moderation] Sending to Mistral AI: "${message}"`);
    const isApproved = await mistralModerationCheck(message);
    console.log(`[Moderation] Mistral result — isApproved: ${isApproved}`);

    if (!isApproved) {
      return NextResponse.json(
        { error: 'Bạch tuộc gác cổng báo ríu rít: Lời chúc này nước hơi đục á! Bạn chỉnh lại cho trong veo nha ' },
        { status: 400 }
      );
    }

    // 3. Insert into Supabase using admin client
    const { data, error } = await supabaseAdmin
      .from('wishes')
      .insert([
        {
          name: (name || '').trim() || 'Fan Ẩn Danh', // Đổi chút tên mặc định cho cute
          message: message.trim(),
          is_approved: true,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('[API /wishes] Unexpected error:', err.message);
    return NextResponse.json({ error: 'Sóng đánh mạnh quá làm trôi mất thư rồi! Bạn đợi biển êm rồi gửi lại nha ' }, { status: 500 });
  }
}

// ─── Main PUT Handler (Sửa lời chúc) ──────────────────────────────────────────
export async function PUT(request) {
  try {
    const { id, name, message, edit_token } = await request.json();

    if (!id || !edit_token) {
      return NextResponse.json({ error: 'Bạn không có quyền sửa lời chúc này!' }, { status: 403 });
    }

    // 1. Basic server-side validation
    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: 'Úi, bọt biển không thấy chữ nào cả! Bạn viết gì đó vào thư nha ' }, { status: 400 });
    }
    const wordCount = message.trim() === '' ? 0 : message.trim().split(/\s+/).length;
    if (wordCount > 1000) {
      return NextResponse.json({ error: 'Đại dương bao la nhưng chai thủy tinh chỉ chứa được 1000 từ thôi nè, bạn tóm tắt lại chút xíu nha ' }, { status: 400 });
    }
    const longWord = message.split(/\s+/).find((word) => word.length > 16);
    if (longWord) {
      return NextResponse.json(
        { error: 'Ây da, có từ dài hơn cả bé cá voi kìa (tối đa 16 ký tự). Bạn thêm khoảng trắng vào nha ' },
        { status: 400 }
      );
    }

    // 2. Check if the token matches
    const { data: existingWish, error: fetchError } = await supabaseAdmin
      .from('wishes')
      .select('edit_token')
      .eq('id', id)
      .single();

    if (fetchError || !existingWish || existingWish.edit_token !== edit_token) {
      return NextResponse.json({ error: 'Token không hợp lệ hoặc bạn không có quyền sửa thư này!' }, { status: 403 });
    }

    // 3. Moderation via Mistral AI
    console.log(`[Moderation SỬA] Sending to Mistral AI: "${message}"`);
    const isApproved = await mistralModerationCheck(message);
    
    if (!isApproved) {
      return NextResponse.json(
        { error: 'Bạch tuộc gác cổng báo ríu rít: Lời chúc này nước hơi đục á! Bạn chỉnh lại cho trong veo nha ' },
        { status: 400 }
      );
    }

    // 4. Update into Supabase using admin client
    const { data, error } = await supabaseAdmin
      .from('wishes')
      .update({
        name: (name || '').trim() || 'Fan Ẩn Danh',
        message: message.trim(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('[API /wishes PUT] Unexpected error:', err.message);
    return NextResponse.json({ error: 'Sóng đánh mạnh quá làm trôi mất thư rồi! Bạn đợi biển êm rồi gửi lại nha ' }, { status: 500 });
  }
}

// ─── Main DELETE Handler (Xóa lời chúc) ───────────────────────────────────────
export async function DELETE(request) {
  try {
    const { id, edit_token } = await request.json();

    if (!id || !edit_token) {
      return NextResponse.json({ error: 'Bạn không có quyền xóa lời chúc này!' }, { status: 403 });
    }

    // Check if the token matches
    const { data: existingWish, error: fetchError } = await supabaseAdmin
      .from('wishes')
      .select('edit_token')
      .eq('id', id)
      .single();

    if (fetchError || !existingWish || existingWish.edit_token !== edit_token) {
      return NextResponse.json({ error: 'Token không hợp lệ hoặc bạn không có quyền xóa thư này!' }, { status: 403 });
    }

    // Delete from Supabase
    const { error } = await supabaseAdmin
      .from('wishes')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[API /wishes DELETE] Unexpected error:', err.message);
    return NextResponse.json({ error: 'Sóng đánh mạnh quá, không thể thu hồi bọt biển lúc này!' }, { status: 500 });
  }
}