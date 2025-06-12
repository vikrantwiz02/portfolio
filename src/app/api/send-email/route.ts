import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

// Define validation schema matching the frontend
const emailSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(request: Request) {
  try {
    const requestData = await request.json()

    // Validate the request data
    const validationResult = emailSchema.safeParse(requestData)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          message: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      )
    }

    const { name, email, message } = validationResult.data

    // Create transporter with more robust configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // Verify connection configuration
    await transporter.verify()

    // Email options with improved HTML template
    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'vikrantkrd@gmail.com',
      replyTo: email,
      subject: `Message from ${name}`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 8px; border: 1px solid #ddd; white-space: pre-line;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; color: #666;">
            This message was sent from your website contact form.
          </p>
        </div>
      `,
    }

    // Send email with timeout
    const sendPromise = transporter.sendMail(mailOptions)
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Email sending timeout')), 10000)
    )

    await Promise.race([sendPromise, timeoutPromise])

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Email sending error:', error)
    
    let errorMessage = 'Failed to send email'
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json(
      { 
        message: 'Error sending email',
        error: errorMessage 
      },
      { status: 500 }
    )
  }
}