import { NextResponse } from 'next/server';

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePayload(payload: ContactPayload): string | null {
  if (!payload.name.trim()) return 'Please enter your name.';
  if (!payload.email.trim()) return 'Please enter your email address.';
  if (!isValidEmail(payload.email.trim())) return 'Please enter a valid email address.';
  if (!payload.subject.trim()) return 'Please add a subject.';
  if (!payload.message.trim()) return 'Please write your message.';
  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;

    const payload: ContactPayload = {
      name: body.name ?? '',
      email: body.email ?? '',
      subject: body.subject ?? '',
      message: body.message ?? '',
    };

    const validationError = validatePayload(payload);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpSecure = (process.env.SMTP_SECURE || 'true').toLowerCase() === 'true';
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;

    if (!smtpUser || !smtpPass || !toEmail || !fromEmail) {
      return NextResponse.json(
        {
          error: 'Server email is not configured. Set SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL.',
        },
        { status: 500 }
      );
    }

    const nodemailerModule = await import('nodemailer');
    const createTransport =
      nodemailerModule.default?.createTransport ?? nodemailerModule.createTransport;

    const transporter = createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: payload.email.trim(),
      subject: `[Portfolio] ${payload.subject.trim()}`,
      text: [
        `Name: ${payload.name.trim()}`,
        `Email: ${payload.email.trim()}`,
        '',
        'Message:',
        payload.message.trim(),
      ].join('\n'),
      html: `
        <p><strong>Name:</strong> ${payload.name.trim()}</p>
        <p><strong>Email:</strong> ${payload.email.trim()}</p>
        <p><strong>Subject:</strong> ${payload.subject.trim()}</p>
        <p><strong>Message:</strong></p>
        <p>${payload.message.trim().replace(/\n/g, '<br/>')}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error) {
      const code = String((error as { code?: string }).code || '');

      if (code === 'EAUTH') {
        return NextResponse.json(
          { error: 'SMTP authentication failed. Check SMTP_USER and SMTP_PASS (Google App Password).' },
          { status: 500 }
        );
      }

      if (code === 'ETIMEDOUT' || code === 'ECONNECTION' || code === 'ESOCKET') {
        return NextResponse.json(
          { error: 'SMTP connection timed out. Check SMTP_HOST/SMTP_PORT/SMTP_SECURE or your network firewall.' },
          { status: 500 }
        );
      }
    }

    const message =
      error instanceof Error
        ? process.env.NODE_ENV === 'production'
          ? 'Unable to send your message right now. Please try again soon.'
          : `Unable to send message: ${error.message}`
        : 'Unable to send your message right now. Please try again soon.';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}