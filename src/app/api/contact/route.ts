import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const RECIPIENTS = [
  'kreativecatalyst@gmail.com',
  'Advertisementkc@gmail.com',
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, message, source } = body as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
      source?: string;
    };

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const sourceLabel =
      source === 'book-call'
        ? 'Book A Free Call'
        : source === 'popup'
          ? 'Popup Consultation'
          : 'Contact Page';

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Kreative Catalyst" <${process.env.SMTP_USER}>`,
      to: RECIPIENTS.join(', '),
      replyTo: email,
      subject: `New Enquiry from ${name} — ${sourceLabel}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F8CFF;">New ${sourceLabel} Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            ${phone ? `<tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${phone}</td>
            </tr>` : ''}
            ${message ? `<tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Message</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${message}</td>
            </tr>` : ''}
          </table>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            Source: ${sourceLabel} | Sent from kreativecatalyst.com
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
