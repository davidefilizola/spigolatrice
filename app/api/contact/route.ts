import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // In development: log to console
  // In production: add Resend or SMTP
  // npm install resend
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'noreply@tuodominio.it',
  //   to: site.contact.email,
  //   subject: `Nuovo messaggio da ${name}`,
  //   html: `<p>${message}</p><p>Email: ${email}</p>`,
  // })

  console.log('📬 Contact form:', { name, email, message })

  return NextResponse.json({ success: true })
}
