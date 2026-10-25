import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { email, applicationNo } = await req.json();

    const recipientEmail = email || 'applicant@mparivahan.gov.in';

    // Configure your Nodemailer SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password',
      },
    });

    const mailOptions = {
      from: '"mParivahan Sewa" <no-reply@mparivahan.gov.in>',
      to: recipientEmail,
      subject: `Approved Learner's Licence Certificate - Ref: ${applicationNo || 'LL-98421033'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background-color: #ffffff;">
          <div style="background-color: #0f172a; color: #ffffff; padding: 16px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #f97316;">mParivahan Government Portal</h2>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8;">Ministry of Road Transport and Highways (MoRTH)</p>
          </div>
          
          <h3 style="color: #0f172a;">Congratulations! Learner's Licence Approved</h3>
          <p style="font-size: 14px; color: #334155; line-height: 1.6;">
            Your online RTO test has been successfully verified, and your digital Learner's Licence document (Ref: <strong>${applicationNo || 'LL-98421033'}</strong>) is ready.
          </p>

          <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 13px;">
            <p style="margin: 4px 0;"><strong>Status:</strong> Approved & Verified (Score 10/10)</p>
            <p style="margin: 4px 0;"><strong>Validity:</strong> 6 Months</p>
            <p style="margin: 4px 0;"><strong>DigiLocker Integration:</strong> Active</p>
          </div>

          <p style="font-size: 12px; color: #64748b;">
            You can access and download your card anytime directly from your citizen dashboard on the mParivahan portal.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Licence email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}