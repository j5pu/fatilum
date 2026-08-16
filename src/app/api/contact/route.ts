import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For development, just log the message
    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form submission:', { name, email, message });
      return NextResponse.json(
        { success: true, message: 'Message logged (dev mode)' },
        { status: 200 }
      );
    }

    // For production, send email via configured SMTP
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      } : undefined,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@fatilum.com',
      to: process.env.CONTACT_EMAIL || 'jose@mnopi.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process form' },
      { status: 500 }
    );
  }
}
