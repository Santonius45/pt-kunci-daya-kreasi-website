/**
 * Vercel Serverless Function: receives the public contact form and sends it
 * through Resend. Keep RESEND_API_KEY on the server (Vercel Environment Variables).
 */

declare const process: {
  env: Record<string, string | undefined>;
};

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(payload: Record<string, unknown>): void;
};

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

const clean = (value: unknown, maxLength: number): string =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ success: false, message: 'Metode permintaan tidak diizinkan.' });
    return;
  }

  const payload = (typeof req.body === 'string' ? safeParse(req.body) : req.body) as ContactPayload | null;
  if (!payload || typeof payload !== 'object') {
    res.status(400).json({ success: false, message: 'Data formulir tidak valid.' });
    return;
  }

  // Honeypot: bots often fill hidden fields; silently accept without sending.
  if (clean(payload.website, 200)) {
    res.status(200).json({ success: true, message: 'Pesan berhasil diterima.' });
    return;
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 254);
  const subject = clean(payload.subject, 180);
  const message = clean(payload.message, 5000);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !subject || !message || !emailPattern.test(email)) {
    res.status(400).json({ success: false, message: 'Mohon lengkapi semua kolom dengan data yang valid.' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || 'admin@penerbitkunci.id';

  if (!apiKey || !from) {
    res.status(503).json({
      success: false,
      message: 'Layanan email belum dikonfigurasi. Silakan hubungi administrator website.'
    });
    return;
  }

  const emailText = [
    'Pesan baru dari formulir Kontak website PT Kunci Daya Kreasi',
    '',
    `Nama: ${name}`,
    `Email pengirim: ${email}`,
    `Subjek: ${subject}`,
    '',
    'Isi pesan:',
    message,
    '',
    '---',
    'Email ini dikirim otomatis dari formulir kontak https://penerbitkunci.id.'
  ].join('\n');

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Website KDK] ${subject}`,
        text: emailText
      })
    });

    if (!resendResponse.ok) {
      // Do not expose provider response or credentials to the public browser.
      console.error('Resend email delivery failed with status:', resendResponse.status);
      res.status(502).json({
        success: false,
        message: 'Pesan belum berhasil dikirim. Silakan coba kembali beberapa saat lagi.'
      });
      return;
    }

    res.status(200).json({ success: true, message: 'Pesan berhasil dikirim.' });
  } catch (error) {
    console.error('Contact email request failed:', error);
    res.status(502).json({
      success: false,
      message: 'Terjadi gangguan saat mengirim pesan. Silakan coba kembali.'
    });
  }
}

function safeParse(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
