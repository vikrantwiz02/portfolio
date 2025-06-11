"use server"

import nodemailer from "nodemailer"
import { ContactFormSchema } from "@/lib/schemas/contact"

export async function submitContactForm(formData: FormData) {
  try {
    // Validate form data
    const validatedFields = ContactFormSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      userAgent: formData.get("userAgent"),
    })

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid form data. Please check your inputs.",
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { name, email, subject, message, userAgent } = validatedFields.data

    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Email to site owner
    const ownerMail = {
      from: `"Contact Form" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.CONTACT_RECIPIENT_EMAIL,
      subject: `New Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>User Agent: ${userAgent}</small></p>
        <p><small>Received at: ${new Date().toLocaleString()}</small></p>
      `,
    }

    // Email to sender (confirmation)
    const senderMail = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: `Confirmation: ${subject}`,
      html: `
        <h2>Thank you for contacting me!</h2>
        <p>Dear ${name},</p>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <hr>
        <h3>Your Message:</h3>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p>Best regards,</p>
        <p>${process.env.SMTP_FROM_NAME}</p>
      `,
    }

    // Send both emails
    await transporter.sendMail(ownerMail)
    await transporter.sendMail(senderMail)

    return {
      success: true,
      message: "Your message has been sent successfully! You should receive a confirmation email shortly.",
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      message: "Failed to send message. Please try again later or contact me directly.",
    }
  }
}

export async function testEmailConfiguration() {
  try {
    // Test nodemailer configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Verify connection configuration
    await transporter.verify()

    // Send test email
    await transporter.sendMail({
      from: `"Test Email" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.CONTACT_RECIPIENT_EMAIL,
      subject: "Email Configuration Test",
      text: "This is a test email to verify your email configuration is working correctly.",
    })

    return {
      success: true,
      message: "Email configuration is valid. Test email sent successfully.",
    }
  } catch (error) {
    console.error("Email configuration test failed:", error)
    return {
      success: false,
      message: `Email configuration test failed: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}