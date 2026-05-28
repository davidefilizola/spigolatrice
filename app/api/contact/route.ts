import { NextRequest, NextResponse } from 'next/server'

/**
 * Form contatti — invio tramite Web3Forms (https://web3forms.com).
 *
 * Configurazione:
 *   1. Registrati su https://web3forms.com con l'email a cui vuoi ricevere le richieste
 *   2. Copia la "Access Key" che ricevi
 *   3. Aggiungila in `.env.local` come `WEB3FORMS_ACCESS_KEY=la-tua-key`
 *   4. Riavvia il server (`npm run build && npm start ...`)
 *
 * Se la key non è impostata, il form risponde 200 ma logga solo in console
 * (utile in sviluppo / quando l'integrazione non è ancora pronta).
 */

const RECIPIENT = 'pamelapinna79@gmail.com'
const FROM_LABEL = 'Spigolatrice di Lambrate · sito'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY

  if (!accessKey) {
    // Nessuna chiave configurata: scaffold mode. Logga e ritorna ok.
    console.log('📬 Contact form (no WEB3FORMS_ACCESS_KEY set, not sent):', { name, email, message })
    return NextResponse.json({ success: true, sent: false })
  }

  // Invio tramite Web3Forms
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Nuova richiesta dal sito — ${name}`,
        from_name: FROM_LABEL,
        to: RECIPIENT,
        name,
        email,
        message,
        // Reply-To così rispondendo all'email vai direttamente all'utente
        replyto: email,
      }),
    })

    const data = await res.json()
    if (!res.ok || !data.success) {
      console.error('Web3Forms error:', data)
      return NextResponse.json({ error: 'Send failed', details: data }, { status: 502 })
    }
    return NextResponse.json({ success: true, sent: true })
  } catch (err) {
    console.error('Contact form fetch error:', err)
    return NextResponse.json({ error: 'Network error' }, { status: 500 })
  }
}
