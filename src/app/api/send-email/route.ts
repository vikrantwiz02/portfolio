import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  // These variables are pulled from your Vercel project's environment variables.
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM_EMAIL, SMTP_FROM_NAME, CONTACT_RECIPIENT_EMAIL } =
    process.env

  const requiredEnvVars = [
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    SMTP_FROM_EMAIL,
    SMTP_FROM_NAME,
    CONTACT_RECIPIENT_EMAIL,
  ]

  // Check if all required environment variables are set
  if (requiredEnvVars.some((envVar) => !envVar)) {
    console.error("Missing one or more required SMTP environment variables")
    return NextResponse.json(
      { success: false, error: "Server configuration error. Could not send email due to missing settings." },
      { status: 500 },
    )
  }

  try {
    const { name, email, message } = await request.json()

    // Basic validation for the request body
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing name, email, or message in request body." },
        { status: 400 },
      )
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // `secure` is true for port 465, false for others
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD, // Use the app-specific password here
      },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 10000,
    })

    // Verify the connection to the SMTP server
    try {
      await transporter.verify()
    } catch (verifyError) {
      console.error("SMTP Connection/Verification Error:", verifyError)
      return NextResponse.json(
        { success: false, error: "Failed to connect to email server. Please check SMTP credentials and settings." },
        { status: 500 },
      )
    }

    const mailOptions = {
      from: `"${SMTP_FROM_NAME}" <${SMTP_FROM_EMAIL}>`,
      to: CONTACT_RECIPIENT_EMAIL,
      replyTo: email, // Set the sender's email as the reply-to address
      subject: `New message from ${name} via Portfolio Contact Form`,
      text: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p style="padding: 10px; border-left: 3px solid #eee;">${message.replace(/\n/g, "<br>")}</p>
          <hr>
          <p style="font-size: 0.9em; color: #777;">This message was sent from your portfolio contact form.</p>
        </div>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ success: true, message: "Email sent successfully!" })
  } catch (error) {
    console.error("Error in POST /api/send-email:", error)
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
    return NextResponse.json({ success: false, error: `Failed to send email. ${errorMessage}` }, { status: 500 })
  }
}
