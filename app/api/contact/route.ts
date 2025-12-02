import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Get email configuration from environment variables
    const recipientEmail = process.env.CONTACT_EMAIL
    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'

    if (!recipientEmail || !resendApiKey) {
      console.error('Missing email configuration in environment variables', {
        hasRecipient: !!recipientEmail,
        hasApiKey: !!resendApiKey
      })
      return NextResponse.json(
        { 
          error: 'Email service not configured',
          details: process.env.NODE_ENV === 'development' 
            ? `Missing: ${!recipientEmail ? 'CONTACT_EMAIL ' : ''}${!resendApiKey ? 'RESEND_API_KEY' : ''}`
            : undefined
        },
        { status: 500 }
      )
    }

    // Initialize Resend
    const resend = new Resend(resendApiKey)

    // Send email
    await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This email was sent from the Nevada License Defense contact form.</em></p>
      `,
    })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { 
        error: 'Failed to send email. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}

